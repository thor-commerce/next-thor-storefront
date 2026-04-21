"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import s from "./top-bar-animator.module.css";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
	children: React.ReactNode;
}

export default function TopBarAnimator({ children }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const el = ref.current;
		if (!el) return;

		const topBar = el.querySelector("[data-top-bar]") as HTMLElement;
		if (!topBar) return;

		const navbar = el.closest("[data-navbar]") as HTMLElement;
		if (!navbar) return;

		const height = topBar.offsetHeight;
		navbar.style.setProperty("--top-bar-offset", `-${height}px`);

		ScrollTrigger.create({
			start: `${height}px top`,
			onEnter: () => navbar.classList.add(s.topBarHidden),
			onLeaveBack: () => navbar.classList.remove(s.topBarHidden),
		});
	});

	return <div ref={ref}>{children}</div>;
}
