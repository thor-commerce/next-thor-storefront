"use client";

import { useCallback, useId, useSyncExternalStore, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s from "./homepage.module.css";

type Props = { heading: ReactNode; children: ReactNode };

export default function ProductCarousel({ heading, children }: Props) {
	const viewportId = useId();
	const [viewportRef, api] = useEmblaCarousel({
		align: "start",
		dragFree: true,
		slidesToScroll: "auto",
		breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
	});
	const subscribe = useCallback(
		(onChange: () => void) => {
			api?.on("select", onChange).on("reinit", onChange);
			return () => {
				api?.off("select", onChange).off("reinit", onChange);
			};
		},
		[api],
	);
	const getSnapshot = useCallback(() => (api?.canGoToPrev() ? 1 : 0) | (api?.canGoToNext() ? 2 : 0), [api]);
	const availableDirections = useSyncExternalStore(subscribe, getSnapshot, () => 0);

	return (
		<>
			<div className={s.sectionHeader}>
				{heading}
				<div className={s.carouselActions}>
					<div className={s.carouselControls}>
						<button
							type="button"
							aria-label="Previous products"
							aria-controls={viewportId}
							disabled={!(availableDirections & 1)}
							onClick={() => api?.goToPrev()}
							className={s.carouselButton}
						>
							<ChevronLeft aria-hidden="true" size={22} />
						</button>
						<button
							type="button"
							aria-label="Next products"
							aria-controls={viewportId}
							disabled={!(availableDirections & 2)}
							onClick={() => api?.goToNext()}
							className={s.carouselButton}
						>
							<ChevronRight aria-hidden="true" size={22} />
						</button>
					</div>
				</div>
			</div>
			<div
				id={viewportId}
				ref={viewportRef}
				className={s.carouselViewport}
				role="group"
				aria-roledescription="carousel"
				aria-label="Featured products"
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.target !== event.currentTarget) return;
					if (event.key === "ArrowLeft") {
						event.preventDefault();
						api?.goToPrev();
					}
					if (event.key === "ArrowRight") {
						event.preventDefault();
						api?.goToNext();
					}
				}}
			>
				<div className={s.productGrid}>{children}</div>
			</div>
		</>
	);
}
