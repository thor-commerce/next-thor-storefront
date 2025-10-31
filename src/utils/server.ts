/**
 * NOTE: THIS FILE IS ONLY USED FOR SERVER-SIDE CODE, DO NOT IMPORT ANYTHING FROM THIS FILE IN THE CLIENT.
 */

import { headers } from "next/headers";
import { match } from "path-to-regexp";
import { getCountryByCountryCode } from "./countries";

export async function getServerContext() {
  const heads = await headers();
  const route = heads.get("x-route");

  if (!route) {
    // Fallback: try to construct route from x-forwarded-* headers
    // This can happen when middleware is bypassed (e.g., .well-known requests)
    const host = heads.get("x-forwarded-host") || heads.get("host");
    const proto = heads.get("x-forwarded-proto") || "http";
    const forwardedFor = heads.get("x-forwarded-for");

    console.error("missing x-route header - request bypassed middleware");
    console.error("Host:", host);
    console.error("X-Forwarded-For:", forwardedFor);
    console.error("User-Agent:", heads.get("user-agent"));

    throw new Error("missing x-route - this request bypassed middleware");
  }

  const url = new URL("https://somthing.com" + route);

  const pathPattern = "/:countryCode{/*path}";
  const matchFn = match(pathPattern);
  const result = matchFn(url.pathname);
  const queryParams = new URLSearchParams(url.search);
  if (!result) {
    throw new Error("Invalid path");
  }

  const params = result.params as { [key: string]: string };
  const country = getCountryByCountryCode(params.countryCode);
  if (!country) {
    throw new Error(`Country not found for code: ${params.countryCode}`);
  }

  const pathname = url.pathname.replace(`/${params.country}`, "");

  return {
    channelId: country.channel,
    lang: params.lang,
    country: country,
    pathname,
    queryParams,
  };
}
