//Note: this is hardcoded for the purpose of this demo, in a real app this would be dynamic, and resolved based on user perferences or browser settings
export const LOCALE = "en-US" as const;

export const THOR_CART_COOKIE_NAME = "thor-cart";
export const THOR_CART_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

//Default country code to use when none is specified, and we cannot determine user location.
export const DEFAULT_COUNTRY = "us";

export enum CHANNEL {
  EUROPE = "ch_01k8tn63mgf9baxksv6exmq2gm",
  UNITED_KINGDOM = "ch_01k8tp2d7z6q6p6f4q4z3n5y6e",
  NORTH_AMERICA = "ch_01k8tp2dft6b6p6f4q4z3n5y6e",
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
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "be",
    name: "Belgium",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "bg",
    name: "Bulgaria",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "hr",
    name: "Croatia",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "cy",
    name: "Cyprus",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "cz",
    name: "Czech Republic",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "dk",
    name: "Denmark",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["USD"],
  },
  {
    code: "ee",
    name: "Estonia",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "fi",
    name: "Finland",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "fr",
    name: "France",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "de",
    name: "Germany",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "gr",
    name: "Greece",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "hu",
    name: "Hungary",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },

  {
    code: "ie",
    name: "Ireland",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "it",
    name: "Italy",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lv",
    name: "Latvia",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lt",
    name: "Lithuania",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "lu",
    name: "Luxembourg",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "nl",
    name: "Netherlands",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "pl",
    name: "Poland",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "pt",
    name: "Portugal",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "ro",
    name: "Romania",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "sk",
    name: "Slovakia",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "si",
    name: "Slovenia",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "es",
    name: "Spain",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "se",
    name: "Sweden",
    languages: ["en"],
    channel: CHANNEL.EUROPE,
    region: "Europe",
    currencies: ["EUR"],
  },
  {
    code: "gb",
    name: "United Kingdom",
    languages: ["en"],
    channel: CHANNEL.UNITED_KINGDOM,
    region: "Europe",
    currencies: ["GBP"],
  },
  {
    code: "us",
    name: "United States",
    languages: ["en"],
    channel: CHANNEL.NORTH_AMERICA,
    region: "America",
    currencies: ["USD"],
  },
];

