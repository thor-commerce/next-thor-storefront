import "server-only";

const THOR_API_ORIGIN = "https://api.thorcommerce.io";

export function getStorefrontGraphqlEndpoint() {
	return buildStorefrontGraphqlEndpoint();
}

export function getStorefrontAuthGraphqlEndpoint() {
	return buildStorefrontGraphqlEndpoint();
}

function buildStorefrontGraphqlEndpoint() {
	const project = process.env.THOR_PROJECT;

	if (!project) {
		throw new Error("Missing THOR_PROJECT environment variable");
	}

	return `${THOR_API_ORIGIN}/${encodeURIComponent(project)}/storefront/graphql`;
}
