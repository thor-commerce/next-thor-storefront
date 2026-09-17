/** Resolve a market prefix without discarding an unprefixed resource path. */
export function resolveMarketRoute(
	pathname: string,
	markets: readonly string[],
	preferences: (string | undefined)[],
	defaultCountry = "dk",
) {
	if (!markets.length)
		throw new Error("Configure at least one supported market in NEXT_PUBLIC_THOR_MARKETS.");
	const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
	const requestedCountry = match?.[1]?.toLowerCase();
	const country =
		[requestedCountry, ...preferences, defaultCountry]
			.map((code) => code?.toLowerCase())
			.find((code): code is string => Boolean(code && markets.includes(code))) ?? markets[0];
	const rest = match ? (match[2] ?? "") : pathname === "/" ? "" : pathname;
	return { country, pathname: `/${country}${rest}`, needsRedirect: match?.[1] !== country };
}
