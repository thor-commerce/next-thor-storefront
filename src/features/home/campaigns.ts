type Campaign = { src: string; alt: string; headline?: string };

const collectionCampaigns: Record<string, Campaign> = {
	"everyday-essentials": {
		src: "/campaign/nordform-courtyard.png",
		alt: "Woman in an ivory tee and charcoal trousers walking through a sunlit courtyard",
		headline: "Your everyday. Elevated.",
	},
	"soft-layers": {
		src: "/campaign/nordform-soft-layers.png",
		alt: "Man wearing a moss green knit and beige trousers on a rocky coast",
		headline: "A softer kind of outside.",
	},
};

const fallbackCampaigns: readonly Campaign[] = Object.values(collectionCampaigns).map(
	({ src, alt }) => ({ src, alt }),
);

/** New stores keep the starter photography without repeating the hero in every tile. */
export function getCollectionCampaign(slug: string, index: number): Campaign {
	return Object.hasOwn(collectionCampaigns, slug)
		? collectionCampaigns[slug]
		: fallbackCampaigns[index % fallbackCampaigns.length];
}
