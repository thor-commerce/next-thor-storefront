import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createAuthEndpoint } from "better-auth/api";
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
  };
}

const customerStatelessPlugin = () => ({
  id: "customer-idp",
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

        const { user, accessToken, refreshToken } = await callIdpLogin({
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
          },
          account: {
            providerId: "customer-idp",
            accountId: user.id,
            userId: user.id,
            accessToken,
            refreshToken,
          },
        };

        await setSessionCookie(c, sessionData);

        return c.json({
          user: sessionData.user,
          expiresAt: sessionData.session.expiresAt,
        });
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