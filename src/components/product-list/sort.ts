import { ProductCategorySortKeys, ProductCollectionSortKeys, ProductSortKeys, SortDirection } from "@/lib/thorcommerce/storefront/generated/types.generated";


export const PRODUCT_SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export const TAXONOMY_SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest first" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type ProductSortValue = (typeof PRODUCT_SORT_OPTIONS)[number]["value"];
type TaxonomySortValue = (typeof TAXONOMY_SORT_OPTIONS)[number]["value"];

const isProductSortValue = (value: string): value is ProductSortValue =>
  PRODUCT_SORT_OPTIONS.some((option) => option.value === value);

const isTaxonomySortValue = (value: string): value is TaxonomySortValue =>
  TAXONOMY_SORT_OPTIONS.some((option) => option.value === value);

export const getProductSort = (value?: string | string[]) => {
  const normalized = typeof value === "string" && isProductSortValue(value) ? value : "newest";

  switch (normalized) {
    case "name-asc":
      return { selected: normalized, sortKey: ProductSortKeys.Name, sortDirection: SortDirection.Asc };
    case "price-asc":
      return { selected: normalized, sortKey: ProductSortKeys.Price, sortDirection: SortDirection.Asc };
    case "price-desc":
      return { selected: normalized, sortKey: ProductSortKeys.Price, sortDirection: SortDirection.Desc };
    case "newest":
    default:
      return { selected: "newest" as const, sortKey: ProductSortKeys.Id, sortDirection: SortDirection.Desc };
  }
};

export const getCategorySort = (value?: string | string[]) => {
  const normalized = typeof value === "string" && isTaxonomySortValue(value) ? value : "featured";

  switch (normalized) {
    case "newest":
      return { selected: normalized, sortKey: ProductCategorySortKeys.Id, sortDirection: SortDirection.Desc };
    case "name-asc":
      return { selected: normalized, sortKey: ProductCategorySortKeys.Name, sortDirection: SortDirection.Asc };
    case "price-asc":
      return { selected: normalized, sortKey: ProductCategorySortKeys.Price, sortDirection: SortDirection.Asc };
    case "price-desc":
      return { selected: normalized, sortKey: ProductCategorySortKeys.Price, sortDirection: SortDirection.Desc };
    case "featured":
    default:
      return { selected: "featured" as const, sortKey: ProductCategorySortKeys.Manual, sortDirection: SortDirection.Asc };
  }
};

export const getCollectionSort = (value?: string | string[]) => {
  const normalized = typeof value === "string" && isTaxonomySortValue(value) ? value : "featured";

  switch (normalized) {
    case "newest":
      return { selected: normalized, sortKey: ProductCollectionSortKeys.Id, sortDirection: SortDirection.Desc };
    case "name-asc":
      return { selected: normalized, sortKey: ProductCollectionSortKeys.Name, sortDirection: SortDirection.Asc };
    case "price-asc":
      return { selected: normalized, sortKey: ProductCollectionSortKeys.Price, sortDirection: SortDirection.Asc };
    case "price-desc":
      return { selected: normalized, sortKey: ProductCollectionSortKeys.Price, sortDirection: SortDirection.Desc };
    case "featured":
    default:
      return { selected: "featured" as const, sortKey: ProductCollectionSortKeys.Manual, sortDirection: SortDirection.Asc };
  }
};

export const formatProductCount = (count: number) =>
  `${new Intl.NumberFormat("en-US").format(count)} ${count === 1 ? "product" : "products"}`;
