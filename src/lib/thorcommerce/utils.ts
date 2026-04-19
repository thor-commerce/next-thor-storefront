import { Connection, Edge } from "@/lib/thorcommerce/types";

export const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
    return array?.edges?.filter((edge): edge is Edge<T> => edge !== null && edge.node != null).map(({ node }) => node!) ?? [];
};
