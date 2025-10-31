"use client";

import { removeLineItem } from "@/features/cart/actions";
import clsx from "clsx";
import { useFormStatus } from "react-dom";
import s from "./cart-line-item.module.css";
import { useActionState } from "react";
import { CartLineItemType } from "../types";

export function RemoveItemButton({ item }: { item: CartLineItemType }) {
  const [, formAction] = useActionState(removeLineItem, null);

  const actionWithVariant = formAction.bind(null, item.id);

  return (
    <form action={actionWithVariant} className={s.removeForm}>
      <SubmitButton />
    </form>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={"Remove item"}
      aria-disabled={pending}
      disabled={pending}
      data-loading={pending}
      className={clsx(s.removeItemButton)}
    >
      {pending && (
        <div className={s.spinnerButton}>
          <div className={s.spinner}>
            <span className={s.spinnerSpan}>Loading...</span>
          </div>
        </div>
      )}
      <svg
        className={s.removeIcon}
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.8355 3.87331H10.4258V2.45652C10.4258 1.57509 9.7088 0.85791 8.82736 0.85791H6.42082C5.53938 0.85791 4.82237 1.57509 4.82237 2.45652V3.87331H0.412666C0.184703 3.87331 0 4.05801 0 4.28597C0 4.51394 0.184703 4.69864 0.412666 4.69864H1.69967V14.4051C1.69967 15.9405 2.94865 17.1895 4.48398 17.1895H10.7642C12.2995 17.1895 13.5485 15.9405 13.5485 14.4051V4.69864H14.8355C15.0635 4.69864 15.2482 4.51394 15.2482 4.28597C15.2482 4.05801 15.0635 3.87331 14.8355 3.87331ZM5.64771 2.45652C5.64771 2.03017 5.99455 1.68324 6.42082 1.68324H8.82736C9.25363 1.68324 9.60048 2.03017 9.60048 2.45652V3.87331H5.64771V2.45652ZM12.7232 14.4051C12.7232 15.4852 11.8444 16.3641 10.7642 16.3641H4.48398C3.40382 16.3641 2.525 15.4852 2.525 14.4051V4.69864H12.7232V14.4051Z"
          fill="#222325"
        ></path>
        <path
          d="M5.4986 14.3262C5.72657 14.3262 5.91127 14.1415 5.91127 13.9135V7.14899C5.91127 6.92103 5.72657 6.73633 5.4986 6.73633C5.27064 6.73633 5.08594 6.92103 5.08594 7.14899V13.9135C5.08594 14.1415 5.27064 14.3262 5.4986 14.3262Z"
          fill="#222325"
        ></path>
        <path
          d="M9.7486 14.3262C9.97657 14.3262 10.1613 14.1415 10.1613 13.9135V7.14899C10.1613 6.92103 9.97657 6.73633 9.7486 6.73633C9.52064 6.73633 9.33594 6.92103 9.33594 7.14899V13.9135C9.33594 14.1415 9.52064 14.3262 9.7486 14.3262Z"
          fill="#222325"
        ></path>
      </svg>
    </button>
  );
}
