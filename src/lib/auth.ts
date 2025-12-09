import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { thorAuthPlugin } from "@thor-commerce/better-auth-thor";

export const auth = betterAuth({
  account: {
    storeAccountCookie: true,
    storeStateStrategy: "cookie",
  },

  session: {
    expiresIn: 60 * 60 * 8
  },

  plugins: [
    thorAuthPlugin({
      apiEndpoint: `https://api.thorcommerce.io/${process.env.NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION}/storefront/graphql`,
      refreshThresholdMinutes: 5
    }),
    nextCookies() // must be last, per docs
  ]
});

export type AuthSession = typeof auth.$Infer.Session;