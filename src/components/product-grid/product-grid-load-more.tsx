import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  loadMore?: () => void;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
}
export function ProductGridLoadMore({
  loadMore,
  hasNextPage,
  isLoadingMore,
}: Props) {
  const { ref, inView } = useInView({
    rootMargin: "200px", // Trigger before fully in view
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isLoadingMore) {
      loadMore?.();
    }
  }, [inView, hasNextPage, isLoadingMore, loadMore]);

  if (!hasNextPage) return null;

  return (
    <div
      ref={ref}
      style={{
        minHeight: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
}
