/* eslint-disable @typescript-eslint/no-explicit-any */
interface Edge<T> {
  node: T;
}
interface Connection<T> {
  edges?: Array<Edge<T>> | undefined | null;
}

export function mapEdgesToItems<T>(
  data?: Connection<T> | undefined | null,
): T[] {
  return data?.edges?.map(({ node }) => node) ?? [];
}

/**
 * Recursively merges two objects.
 * When encountering an "edges" property that's an array in both objects,
 * it concatenates the arrays.
 *
 * @param prev - The previous object (e.g. from the cache).
 * @param next - The new object (e.g. from fetchMore).
 * @returns The merged object.
 */
export function autoMergeEdges<T>(prev: T, next: T): T {
  // If both values are arrays, merge them.
  if (Array.isArray(prev) && Array.isArray(next)) {
    return [...prev, ...next] as unknown as T;
  }

  // If both values are non-null objects, merge them recursively.
  if (
    prev !== null &&
    next !== null &&
    typeof prev === 'object' &&
    typeof next === 'object'
  ) {
    const merged = { ...next } as any;
    for (const key in prev) {
      if (Object.prototype.hasOwnProperty.call(prev, key) && key in next) {
        // Special case for the "edges" field.
        if (
          key === 'edges' &&
          Array.isArray((prev as any)[key]) &&
          Array.isArray((next as any)[key])
        ) {
          merged[key] = [...(prev as any)[key], ...(next as any)[key]];
        } else {
          // Recursively merge nested objects.
          merged[key] = autoMergeEdges((prev as any)[key], (next as any)[key]);
        }
      }
    }
    return merged as T;
  }

  // For other types, return the new value.
  return next;
}
