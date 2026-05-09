import { AvailabilityFragment, StockPolicy } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { Connection, Edge } from "@/lib/thorcommerce/types";

export const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
    return array?.edges?.filter((edge): edge is Edge<T> => edge !== null && edge.node != null).map(({ node }) => node!) ?? [];
};

export enum Availability {
    InStock = "IN_STOCK",
    OutOfStock = "OUT_OF_STOCK",
    Unavailable = "UNAVAILABLE",
}

export const getAvailabilityStatus = ({ availability, quantityToAdd = 1 }: { availability?: AvailabilityFragment | null, quantityToAdd?: number }): Availability => {

    //If there is no quantity registered, we mark it as unavailable.
    if (!availability) {
        return Availability.Unavailable;
    }

    if (!availability.availableForPurchase) {
        return Availability.Unavailable;
    }

    //when the stock policy is not tracked, we assume the product is in stock as long as it's available for purchase, this is because the merchant has explicitly chosen to not track stock for this product, which likely means they have it in stock or they don't want to show it as out of stock when it's not, this is a common scenario for products that are made to order or drop shipped
    if (availability.stockPolicy == StockPolicy.NotTracked) {
        return Availability.InStock;
    }

    //otherwise, we determine the availability based on the available quantity, if it's greater than 0, we consider it in stock, otherwise it's out of stock
    return availability.availableQuantity - quantityToAdd >= 0 ? Availability.InStock : Availability.OutOfStock;
}