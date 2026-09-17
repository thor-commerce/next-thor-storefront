interface Edge<T> {
	node: T;
}
interface Connection<T> {
	edges?: Array<Edge<T>> | undefined | null;
}

export function mapEdgesToItems<T>(data?: Connection<T> | undefined | null): T[] {
	return data?.edges?.map(({ node }) => node) ?? [];
}
