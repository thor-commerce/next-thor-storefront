import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createAuthEndpoint, createAuthMiddleware, getSessionFromCtx as getSessionAccountContextFromCookieCtx } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { z } from "zod";

async function callIdpLogin(input: { email: string; password: string }) {
  const res = await fetch(`https://api.thorcommerce.io/${process.env.NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION}/storefront/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              refreshToken
              expiresIn
            }
          }
        }
      `,
      variables: {
        input: {
          email: input.email,
          password: input.password,
        },
      },
    }),
  });

  if (!res.ok) {
    throw new Error("IDP login failed");
  }

  const json = await res.json();

  const tokenNode = json?.data?.customerAccessTokenCreate?.customerAccessToken;
  if (!tokenNode?.accessToken || !tokenNode?.refreshToken) {
    throw new Error("Invalid credentials");
  }

  return {
    // TODO: fetch user details from Thor API?
    user: {
      id: `customer:${input.email}`,
      email: input.email,
      name: input.email,
    },
    accessToken: tokenNode.accessToken as string,
    refreshToken: tokenNode.refreshToken as string,
    expiresIn: tokenNode.expiresIn as number,
  };
}

async function callIdpRefresh(refreshToken: string) {
  const res = await fetch(`https://api.thorcommerce.io/${process.env.NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION}/storefront/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation CustomerAccessTokenRefresh($input: CustomerAccessTokenRefreshInput!) {
          customerAccessTokenRefresh(input: $input) {
            customerAccessToken {
              accessToken
              refreshToken
              expiresIn
            }
          }
        }
      `,
      variables: {
        input: {
          refreshToken,
        },
      },
    }),
  });

  if (!res.ok) {
    throw new Error("Token refresh failed");
  }

  const json = await res.json();

  const tokenNode = json?.data?.customerAccessTokenRefresh?.customerAccessToken;
  if (!tokenNode?.accessToken || !tokenNode?.refreshToken) {
    throw new Error("Invalid refresh token");
  }

  return {
    accessToken: tokenNode.accessToken as string,
    refreshToken: tokenNode.refreshToken as string,
    expiresIn: tokenNode.expiresIn as number,
  };
}

const customerStatelessPlugin = () => ({
  id: "customer-idp",
  hooks: {
    before: [
      {
        matcher: (context) => context.path === "/get-session",
        handler: createAuthMiddleware(async (ctx) => {
          const context = await getSessionAccountContextFromCookieCtx(ctx);

          const session = context?.session;
          const accountData = session?.account;
          
          if (!accountData?.refreshToken || !accountData?.accessTokenExpiresAt) {
            return { context: ctx };
          }

          const expiresAt = new Date(accountData.accessTokenExpiresAt).getTime();
          const now = Date.now();
          const fiveMinutes = 5 * 60 * 1000;

          // Refresh if token expires in less than 5 minutes
          if (expiresAt - now < fiveMinutes) {
            try {
              const { accessToken, refreshToken, expiresIn } = await callIdpRefresh(
                accountData.refreshToken
              );

              // Update session with new tokens
              if (context && session) {
                const updatedContext = {
                  ...context,
                  session: {
                    ...session,
                    token: accessToken,
                    account: {
                      ...accountData,
                      accessToken,
                      refreshToken,
                      accessTokenExpiresAt: new Date(now + expiresIn * 1000).toISOString(),
                    },
                  },
                };
                await setSessionCookie(ctx, updatedContext);
              }
            } catch (error) {
              // If refresh fails, let the session continue (will fail on next API call)
              console.error("Failed to refresh token:", error);
            }
          }

          return { context: ctx };
        }),
      },
    ],
  },
  endpoints: {
    customerSignIn: createAuthEndpoint(
      "/customer/sign-in",
      {
        method: "POST",
        body: z.object({
          email: z.string().email(),
          password: z.string().min(1),
        }),
      },
      async (c) => {
        const { email, password } = c.body;

        const { user, accessToken, refreshToken, expiresIn } = await callIdpLogin({
          email,
          password,
        });

        const now = Date.now();
        const sessionTtlSeconds = 60 * 60 * 8;

        const sessionData: any = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: new Date(now).toISOString(),
            updatedAt: new Date(now).toISOString(),
          },
          session: {
            token: accessToken,
            expiresAt: new Date(
              now + sessionTtlSeconds * 1000
            ).toISOString(),
            // Store account data in session for token management (will be persisted in cookie cache)
            account: {
              providerId: "customer-idp",
              accountId: user.id,
              userId: user.id,
              accessToken,
              refreshToken,
              accessTokenExpiresAt: new Date(now + expiresIn * 1000).toISOString(),
            },
          },
        };

        await setSessionCookie(c, sessionData);

        return c.json({
          user: sessionData.user,
          expiresAt: sessionData.session.expiresAt,
        });
      }
    ),
    customerRefresh: createAuthEndpoint(
      "/customer/refresh",
      {
        method: "POST",
      },
      async (c) => {
        const session = await getSessionAccountContextFromCookieCtx(c);
        const accountData = (session as any)?.session?.account;

        if (!accountData?.refreshToken) {
          return c.json(
            { error: "No refresh token available" },
            { status: 401 }
          );
        }

        try {
          const { accessToken, refreshToken, expiresIn } = await callIdpRefresh(
            accountData.refreshToken
          );

          const now = Date.now();
          
          // Update session with new tokens
          if (session) {
            const updatedSession = {
              ...session,
              session: {
                ...session.session,
                token: accessToken,
                account: {
                  ...accountData,
                  accessToken,
                  refreshToken,
                  accessTokenExpiresAt: new Date(now + expiresIn * 1000).toISOString(),
                },
              },
            };
            await setSessionCookie(c, updatedSession);

            return c.json({
              user: updatedSession.user,
              expiresAt: updatedSession.session.expiresAt,
            });
          }

          return c.json(
            { error: "No session available" },
            { status: 401 }
          );
        } catch (error) {
          return c.json(
            { error: "Failed to refresh token" },
            { status: 401 }
          );
        }
      }
    ),
  },
} satisfies BetterAuthPlugin);

export const auth = betterAuth({
  account: {
    storeAccountCookie: true,
    storeStateStrategy: "cookie",
  },

  session: {
    expiresIn: 60 * 60 * 8
  },

  plugins: [
    customerStatelessPlugin(),
    nextCookies() // must be last, per docs
  ]
});

export type AuthSession = typeof auth.$Infer.Session;