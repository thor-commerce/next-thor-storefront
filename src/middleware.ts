import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES, DEFAULT_COUNTRY } from "./lib/thor/config";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (well-known URIs)
     * - Files with extensions (.js, .css, .png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const { origin, pathname, searchParams, search } = request.nextUrl;

  const routeValue = pathname + search;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-route", routeValue);

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Let static files pass through
  if (pathname.includes(".")) return response;

  const viewerCountry = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase();

  // Extract a possible country code from the URL: e.g. /dk/products → "dk"
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
  const pathCountry = match?.[1]?.toLowerCase();
  const rest = match?.[2] ?? "";
  const countryCode = getCountryCode([pathCountry, viewerCountry]);

  // If pathCountry is missing or invalid, redirect to one with country prefix
  const isPathCountryValid = COUNTRIES.some(
    (c) => c.code.toLowerCase() === pathCountry
  );

  if (!isPathCountryValid) {
    // Construct the new URL: e.g., /us/products → /dk/products
    const newUrl = new URL(`/${countryCode}${rest}`, origin);
    newUrl.search = searchParams.toString();

    // Use a 307 redirect so the HTTP method is preserved
    response = NextResponse.redirect(newUrl);
    response.headers.set("x-route", routeValue);
    return response;
  }

  return response;
}

/**
 * Determines which country code to use based on the viewer's location and a prioritized list of country codes.
 *
 * The `countryCodes` array represents countries in order of preference (e.g., ["us", "dk"]).
 * The function selects the first valid code that exists in the predefined `COUNTRIES` list.
 * If none of the provided codes are valid, it falls back to the `DEFAULT_COUNTRY`.
 *
 * @param countryCodes - A prioritized list of possible country codes (e.g., ["us", "dk"]).
 * @returns The first valid country code in lowercase, or the default country if none are valid.
 */
function getCountryCode(countryCodes: (string | undefined)[]): string {
  if (!countryCodes.length) {
    return DEFAULT_COUNTRY;
  }

  const countryCode = countryCodes.find((code) =>
    COUNTRIES.some((c) => c.code.toLowerCase() === code?.toLowerCase())
  );

  return (countryCode ?? DEFAULT_COUNTRY).toLowerCase();
}
