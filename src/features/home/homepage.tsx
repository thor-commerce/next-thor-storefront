import { HomePageQuery } from "@/__generated__/thor/graphql";
import Button from "@/components/button/button";
import Navigation from "@/components/navigation/navigation";
import ThorImage from "@/components/thor-image/thor-image";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import s from "./homepage.module.css";

type Props = {
  data: HomePageQuery;
};

const formatCount = (count: number, noun: string) =>
  `${new Intl.NumberFormat("en-US").format(count)} ${count === 1 ? noun : `${noun}s`}`;

export default function Homepage({ data }: Props) {
  const categories = mapEdgesToItems(data.categories);
  const collections = mapEdgesToItems(data.collections);
  const products = mapEdgesToItems(data.products);

  const featuredCategory = categories[0];
  const totalCategoryProducts = categories.reduce((sum, category) => sum + Number(category.productsCount), 0);
  const totalCollectionProducts = collections.reduce(
    (sum, collection) => sum + collection.products.totalCount,
    0,
  );

  return (
    <div className={s.page}>
      <section className={s.lead}>
        <div className={s.container}>
          <div className={s.leadGrid}>
            <div className={s.leadCopy}>
              <h1 className={s.leadTitle}>Everyday groceries, seasonal picks, and dinner shortcuts.</h1>
              <p className={s.leadText}>
                Shop the core catalog, jump straight into curated collections, or start with the categories
                people browse most.
              </p>
              <div className={s.leadActions}>
                <Button as={Navigation} href="/products" style={{ width: "auto" }}>
                  Shop all products
                </Button>
                <Button
                  as={Navigation}
                  href={featuredCategory ? `/categories/${featuredCategory.slug}` : "/categories"}
                  variant="secondary"
                  className={s.secondaryAction}
                  style={{ width: "auto" }}
                >
                  Browse categories
                </Button>
              </div>

              <div className={s.stats}>
                <div className={s.stat}>
                  <div className={s.statValue}>{formatCount(categories.length, "category")}</div>
                  <div className={s.statLabel}>Main departments</div>
                </div>
                <div className={s.stat}>
                  <div className={s.statValue}>{formatCount(collections.length, "collection")}</div>
                  <div className={s.statLabel}>Curated selections</div>
                </div>
                <div className={s.stat}>
                  <div className={s.statValue}>{formatCount(products.length, "new arrival")}</div>
                  <div className={s.statLabel}>Freshly added products</div>
                </div>
              </div>
            </div>

            <div className={s.leadAside}>
              <div className={s.leadImage}>
                <ThorImage
                  src="/campaign/fish-veg-ice-desktop.png"
                  alt="Featured grocery selection"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 32rem"
                  className={s.leadImageMedia}
                />
              </div>
              <div className={s.leadNote}>
                <div className={s.leadNoteTitle}>What’s inside</div>
                <div className={s.leadNoteText}>
                  {formatCount(totalCategoryProducts, "product")} across the top categories and{" "}
                  {formatCount(totalCollectionProducts, "product")} in the highlighted collections.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Shop by category</h2>
            <Navigation href="/categories" className={s.sectionLink}>
              See all categories
            </Navigation>
          </div>
          <div className={s.featureGrid}>
            {categories.map((category) => (
              <Navigation key={category.id} href={`/categories/${category.slug}`} className={s.featureCard}>
                <div className={s.featureTitle}>{category.name}</div>
                <div className={s.featureMeta}>{formatCount(Number(category.productsCount), "product")}</div>
              </Navigation>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Collections</h2>
            <Navigation href="/collections" className={s.sectionLink}>
              See all collections
            </Navigation>
          </div>
          <div className={s.featureGrid}>
            {collections.map((collection) => (
              <Navigation key={collection.id} href={`/collections/${collection.slug}`} className={s.featureCard}>
                <div className={s.featureTitle}>{collection.name}</div>
                <div className={s.featureMeta}>
                  {formatCount(collection.products.totalCount, "product")}
                </div>
              </Navigation>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Latest products</h2>
            <Navigation href="/products" className={s.sectionLink}>
              See all products
            </Navigation>
          </div>
          <div className={s.productGrid}>
            {products.map((product) => {
              const price = product.priceRange?.minPrice;
              return (
                <Navigation key={product.id} href={`/products/${product.slug}`} className={s.productCard}>
                  <div className={s.productImage}>
                    <ThorImage
                      src={product.heroVariant?.image?.src ?? ""}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={s.productImageMedia}
                    />
                  </div>
                  <div className={s.productName}>{product.name}</div>
                  {price && (
                    <div className={s.productPrice}>
                      {formatMoney({ money: price.discountedPrice?.value ?? price.value })}
                    </div>
                  )}
                </Navigation>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
