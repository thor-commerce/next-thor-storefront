import Button from "@/components/button/button";
import Hero from "@/components/hero/hero";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <Hero
        title="Fish & Veggies? Ice Cream's on Us!"
        subtitle="Buy fish or vegetables and get 20% off ice cream. Because healthy eating deserves a sweet reward."
        mediaPosition="center bottom"
        height={80}
        gradientOverlay="dark"
        theme="dark"

        media={
          <Image src="/campaign/fish-veg-ice-desktop.png" alt="Hero" fill priority />
        }
      />
    </div>
  );
}
