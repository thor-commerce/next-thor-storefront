import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES } from "./lib/thorcommerce/config";
import {
	DEFAULT_COUNTRY,
	THOR_COUNTRY_COOKIE_MAX_AGE,
	THOR_COUNTRY_COOKIE_NAME,
	THOR_CURRENCY_HEADER,
	THOR_STORE_HEADER,
} from "./lib/thorcommerce/const";

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

export async function proxy(request: NextRequest) {
	const { origin, pathname, searchParams, search } = request.nextUrl;

	const routeValue = pathname + search;
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-route", routeValue);

	// Let static files pass through
	if (pathname.includes(".")) {
		return NextResponse.next({ request: { headers: requestHeaders } });
	}

	const viewerCountry = request.headers.get("CF-IPCountry")?.toLowerCase() || undefined;

	// Extract a possible country code from the URL: e.g. /dk/products → "dk"
	const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
	const pathCountry = match?.[1]?.toLowerCase();
	const rest = match?.[2] ?? "";
	const countryCode = getCountryCode([pathCountry, viewerCountry]);
	const country = COUNTRIES.find((c) => c.code.toLowerCase() === countryCode);

	if (!country) {
		//this can only happen if you set default country to something not in the list of countries, but we need to handle it anyway.
		throw new Error(`Invalid country code: ${countryCode}`);
	}

	// Set store/currency headers for every downstream request
	requestHeaders.set(THOR_STORE_HEADER, country.store);
	requestHeaders.set(THOR_CURRENCY_HEADER, country.currencies[0]);

	const countryCookieOptions = {
		name: THOR_COUNTRY_COOKIE_NAME,
		value: country.code.toLowerCase(),
		path: "/",
		maxAge: THOR_COUNTRY_COOKIE_MAX_AGE,
		sameSite: "lax" as const,
		secure: process.env.NODE_ENV === "production",
	};

	// If pathCountry is missing or invalid, redirect to one with country prefix
	const isPathCountryValid = COUNTRIES.some((c) => c.code.toLowerCase() === pathCountry);

	if (!isPathCountryValid) {
		// Construct the new URL: e.g., /us/products → /dk/products
		const newUrl = new URL(`/${countryCode}${rest}`, origin);
		newUrl.search = searchParams.toString();

		// Use a 307 redirect so the HTTP method is preserved
		const redirect = NextResponse.redirect(newUrl);
		redirect.headers.set(THOR_STORE_HEADER, country.store);
		redirect.headers.set(THOR_CURRENCY_HEADER, country.currencies[0]);
		redirect.cookies.set(countryCookieOptions);
		return redirect;
	}

	const response = NextResponse.next({ request: { headers: requestHeaders } });
	response.cookies.set(countryCookieOptions);
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
		COUNTRIES.some((c) => c.code.toLowerCase() === code?.toLowerCase()),
	);

	return (countryCode ?? DEFAULT_COUNTRY).toLowerCase();
}
