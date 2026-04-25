import { PriceFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { formatMoney } from "@/utils/money";

export function getPriceDetails(price: PriceFragment) {

    const intialPrice = price.value;
    const currentPrice = price.discountedPrice?.value ?? price.value;
    const isDiscounted = intialPrice.centAmount !== currentPrice.centAmount;

    let discountLabel: string | null = null;
    if (price.discountedPrice && price?.value) {
        switch (price.discountedPrice.discount?.value?.__typename) {
            case "ProductDiscountAbsoluteValue": {
                const formattedDiscount = formatMoney({
                    money: {
                        centAmount: price.value.centAmount - price.discountedPrice.value.centAmount,
                        currencyCode: price.value.currencyCode,
                        fractionDigits: price.value.fractionDigits,
                    },
                });
                if (formattedDiscount) {
                    discountLabel = `${formattedDiscount} off`;
                }
                break;
            }
            case "ProductDiscountRelativeValue": {
                const factor = Number(price.discountedPrice.discount?.value?.factor);
                if (Number.isFinite(factor) && factor > 0) {
                    const percentOff = Math.round(factor * 100);
                    if (percentOff > 0) {
                        discountLabel = `${percentOff}% off`;
                    }
                }
                break;
            }
        }
    }

    return {
        initialPrice: price.value,
        currentPrice: price.discountedPrice?.value ?? price.value,
        isDiscounted,
        discountLabel
    }
}