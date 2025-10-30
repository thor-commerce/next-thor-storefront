import { Money } from "@/__generated__/thor/graphql";
import { LOCALE } from "@/lib/thor/config";
export const centToAmount = (money: Money) =>
  money.centAmount / 10 ** money.fractionDigits;

export const formatMoney = ({
  locale = LOCALE,
  money,
  maximumFractionDigits,
  minimumFractionDigits,
}: {
  money: Money;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: money.currencyCode,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits,
      signDisplay: "auto",
    }).format(centToAmount(money));
  } catch (e) {
    console.error(e);
  }
};
