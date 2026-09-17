//Note: this is hardcoded for the purpose of this demo, in a real app this would be dynamic, and resolved based on user perferences or browser settings
export const LOCALE = "en-US" as const;

export const STORE = {
	DEFAULT: process.env.NEXT_PUBLIC_THOR_STORE_ID ?? "store_01kehmvt7wfyevqrta5fgp7849",
} as const;

export enum CURRENCY {
	USD = "USD",
	EUR = "EUR",
	DKK = "DKK",
}

type Country = {
	code: string;
	name: string;
	languages: string[];
	currencies: string[];
	store: string;
	region: "Europe" | "America" | "International";
};

const DEFAULT_CURRENCY = process.env.NEXT_PUBLIC_THOR_CURRENCY ?? CURRENCY.USD;
const ENABLED_MARKETS = (process.env.NEXT_PUBLIC_THOR_MARKETS ?? process.env.NEXT_PUBLIC_THOR_MARKET)
	?.toLowerCase()
	.split(",")
	.map((code) => code.trim())
	.filter(Boolean);

//In this example storefront, we use countries to represent different markets (multi-channel)
const markets: Country[] = [
	{
		code: "at",
		name: "Austria",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "be",
		name: "Belgium",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "bg",
		name: "Bulgaria",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "hr",
		name: "Croatia",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "cy",
		name: "Cyprus",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "cz",
		name: "Czech Republic",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "dk",
		name: "Denmark",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "ee",
		name: "Estonia",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "fi",
		name: "Finland",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "fr",
		name: "France",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "de",
		name: "Germany",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "gr",
		name: "Greece",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "hu",
		name: "Hungary",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},

	{
		code: "ie",
		name: "Ireland",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "it",
		name: "Italy",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "lv",
		name: "Latvia",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "lt",
		name: "Lithuania",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "lu",
		name: "Luxembourg",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "nl",
		name: "Netherlands",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "pl",
		name: "Poland",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "pt",
		name: "Portugal",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "ro",
		name: "Romania",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "sk",
		name: "Slovakia",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "si",
		name: "Slovenia",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "es",
		name: "Spain",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
	{
		code: "se",
		name: "Sweden",
		languages: ["en"],
		store: STORE.DEFAULT,
		region: "Europe",
		currencies: [DEFAULT_CURRENCY],
	},
];

// Explicit prices are seeded for these markets; other markets retain the configured fallback.
const MARKET_CURRENCIES: Record<string, string> = { dk: "DKK", se: "SEK", de: "EUR" };
export const COUNTRIES = markets
	.filter((country) => !ENABLED_MARKETS?.length || ENABLED_MARKETS.includes(country.code))
	.map((country) => ({ ...country, currencies: [MARKET_CURRENCIES[country.code] ?? DEFAULT_CURRENCY] }));
