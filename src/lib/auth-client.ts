import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    plugins: [customSessionClient<typeof auth>()],
})