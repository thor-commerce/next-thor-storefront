import Image from "next/image";
import Navigation from "@/components/navigation/navigation";
import ThorImage from "@/components/thor-image/thor-image";
import type { HomePageQuery } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import s from "./homepage.module.css";
import ProductCarousel from "./product-carousel";
import { getCollectionCampaign } from "./campaigns";

type Props = { data: HomePageQuery };

export default function Homepage({ data }: Props) {
	const collections = mapEdgesToItems(data.collections);
	const products = mapEdgesToItems(data.products);

	return (
		<div className={s.page}>
			<section className={s.hero} aria-labelledby="campaign-title">
				<Image
					src="/campaign/nordform-everyday.png"
					alt="Two people wearing relaxed neutral layers beside a coastal concrete wall"
					fill
					preload
					sizes="100vw"
					className={s.heroImage}
				/>
				<div className={s.heroCopy}>
					<p className={s.eyebrow}>Nordform / Everyday essentials</p>
					<h1 id="campaign-title">
						Made for
						<br />
						your everyday.
					</h1>
					<p>Easy layers. Quiet colours. Your own way to wear them.</p>
					<Navigation href="/products" className={s.lightButton}>
						Shop the collection
					</Navigation>
				</div>
			</section>

			{collections.length > 0 && (
				<section className={s.campaignGrid} aria-label="Shop the Nordform collections">
					{collections.map((collection, index) => {
						const campaign = getCollectionCampaign(collection.slug, index);
						return (
							<article key={collection.id} className={s.campaignCard}>
								<Image
									src={campaign.src}
									alt={campaign.alt}
									fill
									sizes="(max-width: 640px) 100vw, 50vw"
									className={s.campaignImage}
								/>
								<div className={s.campaignCopy}>
									<p>{collection.name}</p>
									<h2>{campaign.headline ?? collection.name}</h2>
									<Navigation
										href={`/collections/${collection.slug}`}
										className={s.lightButton}
										aria-label={`Shop ${collection.name}`}
									>
										Shop
									</Navigation>
								</div>
							</article>
						);
					})}
				</section>
			)}

			{products.length > 0 && (
				<section className={s.section} aria-labelledby="latest-title">
					<ProductCarousel
						heading={
							<div>
								<p className={s.eyebrow}>The everyday rotation</p>
								<h2 id="latest-title">Meet your next favourites.</h2>
							</div>
						}
					>
						{products.map((product) => {
							const price = product.priceRange?.minPrice;
							return (
								<Navigation key={product.id} href={`/products/${product.slug}`} className={s.productCard}>
									<div className={s.productImage}>
										<ThorImage
											src={product.heroVariant?.image?.src ?? ""}
											alt={product.name}
											fill
											sizes="(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 33vw"
											className={s.productImageMedia}
										/>
									</div>
									<h3>{product.name}</h3>
									{price && <p>{formatMoney({ money: price.discountedPrice?.value ?? price.value })}</p>}
								</Navigation>
							);
						})}
					</ProductCarousel>
				</section>
			)}

			<section className={s.brandStatement} aria-labelledby="brand-title">
				<p className={s.eyebrow}>Less noise. More you.</p>
				<h2 id="brand-title">
					Good days.
					<br />
					Great essentials.
				</h2>
				<p>
					From the first layer to the finishing touch.
					<br />
					Find the pieces that feel like you.
				</p>
				<Navigation href="/products" className={s.darkButton}>
					Find your favourites
				</Navigation>
			</section>
		</div>
	);
}
