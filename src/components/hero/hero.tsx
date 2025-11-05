import clsx from "clsx";
import React from "react";
import s from "./hero.module.css";

interface HeroProps {
  title: string;
  subtitle?: string;
  media?: React.ReactNode;
  height?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  contentPosition?: "left" | "center" | "right";
  mediaPosition?: string;
  textBackground?: boolean;
  theme?: "light" | "dark";
  mediaFit?: "cover" | "contain";
  gradientOverlay?: boolean | "light" | "dark";
  children?: React.ReactNode;
}

export default function Hero({
  title,
  subtitle,
  media,
  height = 60,
  className,
  overlay = false,
  overlayOpacity = 0.4,
  contentPosition = "left",
  mediaPosition = "center center",
  textBackground = false,
  theme = "light",
  mediaFit = "cover",
  gradientOverlay = "light",
  children,
}: HeroProps) {
  const style = {
    "--hero-height": `${height}vh`,
    "--overlay-opacity": overlayOpacity,
    "--media-position": mediaPosition,
    "--media-fit": mediaFit,
  } as React.CSSProperties;

  const showGradient = gradientOverlay !== false;
  const gradientType = gradientOverlay === "dark" ? "dark" : "light";

  return (
    <section className={clsx(s.hero, className)} style={style}>
      {media && <div className={s.media}>{media}</div>}
      {overlay && <div className={s.overlay} />}
      {showGradient && (
        <div
          className={clsx(s.gradientOverlay, {
            [s.gradientLight]: gradientType === "light",
            [s.gradientDark]: gradientType === "dark",
          })}
        />
      )}
      <div
        className={clsx(s.content, {
          [s.contentLeft]: contentPosition === "left",
          [s.contentCenter]: contentPosition === "center",
          [s.contentRight]: contentPosition === "right",
        })}
      >
        <div
          className={clsx(s.textContent, {
            [s.textContentWithBackground]: textBackground,
            [s.themeDark]: theme === "dark",
            [s.themeLight]: theme === "light",
          })}
        >
          <h1 className={s.title}>{title}</h1>
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          {children && <div className={s.actions}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
