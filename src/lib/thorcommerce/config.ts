//Note: this is hardcoded for the purpose of this demo, in a real app this would be dynamic, and resolved based on user perferences or browser settings
export const LOCALE = "en-US" as const;

export const THOR_CART_COOKIE_NAME = "thor-cart";
export const THOR_CART_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;



export enum STORE {
  DEFAULT = "store_01kehmvt7wfyevqrta5fgp7849",
}

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
    currencies: [CURRENCY.USD],
  },
  {
    code: "be",
    name: "Belgium",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "bg",
    name: "Bulgaria",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "hr",
    name: "Croatia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "cy",
    name: "Cyprus",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "cz",
    name: "Czech Republic",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "dk",
    name: "Denmark",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "ee",
    name: "Estonia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "fi",
    name: "Finland",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "fr",
    name: "France",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "de",
    name: "Germany",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "gr",
    name: "Greece",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "hu",
    name: "Hungary",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },

  {
    code: "ie",
    name: "Ireland",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "it",
    name: "Italy",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "lv",
    name: "Latvia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "lt",
    name: "Lithuania",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "lu",
    name: "Luxembourg",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "nl",
    name: "Netherlands",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "pl",
    name: "Poland",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "pt",
    name: "Portugal",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "ro",
    name: "Romania",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "sk",
    name: "Slovakia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "si",
    name: "Slovenia",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "es",
    name: "Spain",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
  {
    code: "se",
    name: "Sweden",
    languages: ["en"],
    store: STORE.DEFAULT,
    region: "Europe",
    currencies: [CURRENCY.USD],
  },
];

