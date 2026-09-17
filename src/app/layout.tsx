import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Nordform — Everyday essentials",
	description:
		"Easy layers, quiet colours, and everyday essentials. Discover clothing and accessories from Nordform.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistSans.variable} data-scroll-behavior="smooth">
			<body>
				<div className="main-root">{children}</div>
			</body>
		</html>
	);
}
