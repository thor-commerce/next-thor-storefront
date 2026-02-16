//Note: this is hardcoded for the purpose of this demo, in a real app this would be dynamic, and resolved based on user perferences or browser settings
export const LOCALE = "en-US" as const;

export const THOR_CART_COOKIE_NAME = "thor-cart";
export const THOR_CART_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

//Default country code to use when none is specified, and we cannot determine user location.
export const DEFAULT_COUNTRY = "us";

export enum CHANNEL {
  CHF="ch_01k5rv9a4hepbanbbncbq6q0rj",
  DKK="ch_01k5rv9b4jem4tz2wd9628bn6h",
  EUR="ch_01k5rv9bcze5tar19b22x564rt",
  GBP="ch_01k5rv9bjpe2srpqwchyzx7emb",
  NOK="ch_01k5rv9braee9rxb4jxdydbqys",
  SEK="ch_01k5rv9bz5ej7vysp8jk9cjpem",
  USD="ch_01k5rv9c4ne9aaf0nk54n7at7t"
}

export enum STORE {
  DEFAULT = "store_01kehnsv2wf408mnshfb4c2gnj"
}

type Country = {
  code: string;
  name: string;
  languages: string[];
  currencies: string[];
  channel: CHANNEL;
  region: "Europe" | "America" | "International";
};

//In this example storefront, we use countries to represent different markets (multi-channel)
export const COUNTRIES: Country[] = [
  {
    code: "at",
    name: "Austria",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "be",
    name: "Belgium",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "bg",
    name: "Bulgaria",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "hr",
    name: "Croatia",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "cy",
    name: "Cyprus",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "cz",
    name: "Czech Republic",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "dk",
    name: "Denmark",
    languages: ["en"],
    channel: CHANNEL.DKK,
    region: "Europe",
    currencies: ["DKK"],
  },
  {
    code: "ee",
    name: "Estonia",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "fi",
    name: "Finland",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "fr",
    name: "France",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "de",
    name: "Germany",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "gr",
    name: "Greece",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "hu",
    name: "Hungary",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },

  {
    code: "ie",
    name: "Ireland",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "it",
    name: "Italy",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lv",
    name: "Latvia",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lt",
    name: "Lithuania",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lu",
    name: "Luxembourg",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "nl",
    name: "Netherlands",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "pl",
    name: "Poland",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "pt",
    name: "Portugal",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "ro",
    name: "Romania",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "sk",
    name: "Slovakia",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "si",
    name: "Slovenia",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "es",
    name: "Spain",
    languages: ["en"],
    channel: CHANNEL.EUR,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "se",
    name: "Sweden",
    languages: ["en"],
    channel: CHANNEL.SEK,
    region: "Europe",
    currencies: ["SEK"],
  },
  {
    code: "gb",
    name: "United Kingdom",
    languages: ["en"],
    channel: CHANNEL.GBP,
    region: "Europe",
    currencies: ["GBP"],
  },
  {
    code: "us",
    name: "United States",
    languages: ["en"],
    channel: CHANNEL.USD,
    region: "America",
    currencies: ["USD"],
  },
];
