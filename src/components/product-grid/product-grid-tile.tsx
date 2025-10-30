import { gql } from "@/__generated__/thor";
import { ProductGridTileFragment } from "@/__generated__/thor/graphql";
import { FragmentType } from "@apollo/client";
import { useSuspenseFragment } from "@apollo/client/react";
import s from "./product-grid.module.css";
import Link from "next/link";
import ThorImage from "../thor-image/thor-image";
import { formatMoney } from "@/utils/money";
import Navigation from "../navigation/navigation";

const PRODUCT_GRID_TILE_FRAGMENT = gql(/* GraphQL */ `
  fragment ProductGridTile on Product {
    id
    name
    heroVariant {
      image {
        src
      }
    }
    priceRange {
      minPrice {
        value {
          centAmount
          currencyCode
          fractionDigits
        }
      }
    }
  }
`);

type Props = {
  productFragment: FragmentType<ProductGridTileFragment>;
};

export default function ProductGridTile({ productFragment }: Props) {
  const { data } = useSuspenseFragment({
    fragment: PRODUCT_GRID_TILE_FRAGMENT,
    from: productFragment,
    fragmentName: "ProductGridTile",
  });


  return (
    <li className={s.tile}>
      <Navigation href={`/products/${data.id}`} className={s.linkWrapper}>
        <div className={s.imageWrapper}>
          <ThorImage
            src={data.heroVariant?.image?.src ?? ""}
            alt={data.name}
            sizes="33vw"
            fill
            objectFit="cover"
          />
        </div>
        <div className={s.productInfo}>{data.name}</div>
        {data.priceRange?.minPrice && (
          <div>{formatMoney({ money: data.priceRange.minPrice.value })}</div>
        )}
      </Navigation>
    </li>
  );
}
