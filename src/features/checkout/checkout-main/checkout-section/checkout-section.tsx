import { PropsWithChildren } from "react";
import s from "./checkout-section.module.css";

function Root({ children }: PropsWithChildren) {
  return <section className={s.section}>{children}</section>;
}

function CheckoutSectionHeader({ title }: { title: string }) {
  return (
    <div className="section-header">
      <h2 className={s.title}>{title}</h2>
    </div>
  );
}

function CheckoutSectionRow({
  children,
  columns = 1,
}: PropsWithChildren<{ columns?: number }>) {
  return (
    <div 
      className={s.row} 
      style={{ '--columns': columns } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export const CheckoutSection = Object.assign(Root, {
  Header: CheckoutSectionHeader,
  Row: CheckoutSectionRow,
});
