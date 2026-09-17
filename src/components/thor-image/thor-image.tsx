"use client";
import Image, { ImageLoaderProps } from "next/image";
import clsx from "clsx";
type Props = {} & React.ComponentProps<typeof Image>;

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	const [path, query] = src.split("?", 2);
	const params = new URLSearchParams(query);
	params.set("width", String(width));
	params.set("quality", String(quality ?? 75));
	params.set("format", "webp");
	return `${path}?${params}`;
};

export default function ThorImage({ alt, ...props }: Props) {
	//if src is empty return a missing image placeholder
	if (!props.src) {
		return (
			<div className={clsx(props.className)} role="img" aria-label={alt || "No image"}>
				<span>No Image</span>
			</div>
		);
	}
	return <Image alt={alt} loader={imageLoader} {...props} />;
}
