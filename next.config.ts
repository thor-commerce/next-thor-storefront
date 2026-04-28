import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // cacheComponents: true,
};

export default nextConfig;


import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
