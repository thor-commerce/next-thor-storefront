import s from "./product-grid.module.css";
type Props = {
  heading: string;
};
export default function ProductGridHeader({ heading }: Props) {
  return (
    <header className={s.header}>
      <h1 className={s.heading}>{heading}</h1>
    </header>
  );
}
