//Note: this is hardcoded for the purpose of this demo, in a real app this would be dynamic, and resolved based on user perferences or browser settings
export const LOCALE = "en-US" as const;

export const THOR_CART_COOKIE_NAME = "thor-cart";
export const THOR_CART_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

//Default country code to use when none is specified, and we cannot determine user location.
export const DEFAULT_COUNTRY = "us";

export enum STORE {
  DEFAULT = "store_01kehmvt7wfyevqrta5fgp7849",
}

type Country = {
  code: string;
  name: string;
  languages: string[];
  currencies: string[];
  store: STORE;
  region: "Europe" | "America" | "International";
};

//In this example storefront, we use countries to represent different markets (multi-channel)
export const COUNTRIES: Country[] = [
  {
    code: "at",
    name: "Austria",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "be",
    name: "Belgium",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "bg",
    name: "Bulgaria",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "hr",
    name: "Croatia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "cy",
    name: "Cyprus",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "cz",
    name: "Czech Republic",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "dk",
    name: "Denmark",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["USD"],
  },
  {
    code: "ee",
    name: "Estonia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "fi",
    name: "Finland",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "fr",
    name: "France",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "de",
    name: "Germany",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "gr",
    name: "Greece",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "hu",
    name: "Hungary",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },

  {
    code: "ie",
    name: "Ireland",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "it",
    name: "Italy",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lv",
    name: "Latvia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lt",
    name: "Lithuania",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lu",
    name: "Luxembourg",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "nl",
    name: "Netherlands",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "pl",
    name: "Poland",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "pt",
    name: "Portugal",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "ro",
    name: "Romania",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "sk",
    name: "Slovakia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "si",
    name: "Slovenia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "es",
    name: "Spain",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "se",
    name: "Sweden",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: ["EUR"],
  },
];

