import Image, { ImageLoaderProps } from "next/image";
import clsx from "clsx";
type Props = {} & React.ComponentProps<typeof Image>;

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?width=${width}&quality=${quality || 75}&format=webp`;
};

export default function ThorImage({ ...props }: Props) {
  //if src is empty return a missing image placeholder
  if (!props.src) {
    return (
      <div className={clsx(props.className)}>
        <span className="text-gray-500">No Image</span>
      </div>
    );
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image loader={imageLoader} {...props} />;
}
