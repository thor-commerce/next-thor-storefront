import { COUNTRIES } from "@/lib/thor/config";

export const getCountryByCountryCode = (countryCode: string) => {
  const country = COUNTRIES.find(
    (c) => c.code.toLowerCase() === countryCode.toLowerCase()
  );
  if (!country) {
    throw new Error(`Country not found for country code: ${countryCode}`);
  }
  return country;
};

export const getCurrencyByCountryCode = (countryCode: string) => {
  const country = getCountryByCountryCode(countryCode);
  if (!country) {
    throw new Error(`Country not found for country code: ${countryCode}`);
  }

  const currency = country.currencies[0];

  if (!currency) {
    throw new Error(`No currency found for country code: ${countryCode}`);
  }

  return currency;
};

export const getRegion = (countryCode: string) => {
  const country = getCountryByCountryCode(countryCode);
  if (!country) {
    return "Europe";
  }

  return country.region;
};
