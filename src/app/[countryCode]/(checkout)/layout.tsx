import { type ReactNode } from "react";
import s from "./layout.module.css";

export const metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  return <div className={s.checkoutWrapper}>{props.children}</div>;
}
