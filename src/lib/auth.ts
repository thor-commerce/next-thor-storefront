import { betterAuth } from "better-auth";
import { thorAuthPlugin } from "@thor-commerce/better-auth-thor";
import { createAuthMiddleware, customSession } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  account: {
    storeAccountCookie: true,
    storeStateStrategy: "cookie",
  },

  session: {
    expiresIn: 60 * 60 * 8, // 8 hours
    updateAge: 60 * 60 * 24, // Update session every 24 hours (refresh token)
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7 // Cookie persists for 7 days
    }
  },
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    thorAuthPlugin({
      apiEndpoint: `https://api.thorcommerce.io/${process.env.NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION}/storefront/graphql`,
      refreshThresholdMinutes: 5
    }),
    customSession(async ({ user, session }) => {
      // The thorAuthPlugin attaches groups to the user object
      // This customSession plugin ensures TypeScript knows about it
      return {
        user: {
          ...user,
          groups: (user as any).groups as Array<{ id: string; name: string }> || []
        },
        session
      };
    }),
    nextCookies() // must be last, per docs
  ],
});

export type AuthSession = typeof auth.$Infer.Session;