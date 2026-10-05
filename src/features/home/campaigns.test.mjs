import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { getCollectionCampaign } from "./campaigns.ts";

test("new store collection names retain distinct original photography instead of the hero", async () => {
	const first = getCollectionCampaign("our-new-collection", 0);
	const second = getCollectionCampaign("another-collection", 1);
	assert.equal(first.src, "/campaign/nordform-courtyard.png");
	assert.equal(second.src, "/campaign/nordform-soft-layers.png");
	assert.notEqual(first.src, second.src);
	assert.equal(first.headline, undefined);
	assert.equal(second.headline, undefined);
	assert.equal(getCollectionCampaign("constructor", 0).src, first.src);
	for (const campaign of [first, second]) {
		await access(new URL(`../../../public${campaign.src}`, import.meta.url));
	}
});

test("the original starter collections keep their photography and campaign copy", () => {
	assert.equal(getCollectionCampaign("everyday-essentials", 1).src, "/campaign/nordform-courtyard.png");
	assert.equal(getCollectionCampaign("everyday-essentials", 1).headline, "Your everyday. Elevated.");
	assert.equal(getCollectionCampaign("soft-layers", 0).src, "/campaign/nordform-soft-layers.png");
	assert.equal(getCollectionCampaign("soft-layers", 0).headline, "A softer kind of outside.");
});
