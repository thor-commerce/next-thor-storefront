import { NextRequest, NextResponse } from "next/server";
import { resolveMarketRoute } from "./lib/market-routing";
import { COUNTRIES } from "./lib/thorcommerce/config";
import {
	DEFAULT_COUNTRY,
	THOR_COUNTRY_COOKIE_MAX_AGE,
	THOR_COUNTRY_HEADER,
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

export async function middleware(request: NextRequest) {
	const { origin, pathname, searchParams } = request.nextUrl;

	const requestHeaders = new Headers(request.headers);

	// Let static files pass through
	if (/\.(?:ico|png|jpe?g|webp|avif|svg|gif|css|js|map|woff2?|ttf|txt|xml)$/i.test(pathname)) {
		return NextResponse.next({ request: { headers: requestHeaders } });
	}

	const viewerCountry = request.headers.get("CF-IPCountry")?.toLowerCase() || undefined;

	const savedCountry = request.cookies.get(THOR_COUNTRY_COOKIE_NAME)?.value;
	const route = resolveMarketRoute(
		pathname,
		COUNTRIES.map((country) => country.code),
		[savedCountry, viewerCountry],
		DEFAULT_COUNTRY,
	);
	const countryCode = route.country;
	const country = COUNTRIES.find((c) => c.code.toLowerCase() === countryCode);

	if (!country) {
		//this can only happen if you set default country to something not in the list of countries, but we need to handle it anyway.
		throw new Error(`Invalid country code: ${countryCode}`);
	}

	// Set store/currency headers for every downstream request
	requestHeaders.set(THOR_COUNTRY_HEADER, countryCode);
	requestHeaders.set(THOR_STORE_HEADER, country.store);
	requestHeaders.set(THOR_CURRENCY_HEADER, country.currencies[0]);

	const countryCookieOptions = {
		name: THOR_COUNTRY_COOKIE_NAME,
		value: country.code.toLowerCase(),
		path: "/",
		maxAge: THOR_COUNTRY_COOKIE_MAX_AGE,
		THOR_COUNTRY_HEADER,
		sameSite: "lax" as const,
		secure: process.env.NODE_ENV === "production",
	};

	if (route.needsRedirect) {
		const newUrl = new URL(route.pathname, origin);
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
