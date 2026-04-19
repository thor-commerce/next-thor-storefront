import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
