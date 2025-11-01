"use client";

import TextInput from "@/components/text-input/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { Controller, Path, useForm } from "react-hook-form";
import z from "zod";
import { addDiscountCode } from "../actions";
import { DiscountCodeActionResponse } from "../types";
import s from "./discount-code-form.module.css";
import { discountCodeSchema } from "./validation";
import Button from "@/components/button/button";
import {
  Disclosure,
  DisclosurePanel,
  Button as ReactAriaButton,
} from "react-aria-components";
import { ChevronDown } from "lucide-react";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import { CartDetailsQuery } from "@/__generated__/thor/graphql";
import DiscountCodeLabel from "./discount-code-label";

export type DiscountCodeFormValues = z.infer<typeof discountCodeSchema>;

export default function DiscountCodeForm({
  queryRef,
}: {
  queryRef: QueryRef<CartDetailsQuery>;
}) {
  const {
    data: { cart },
  } = useReadQuery(queryRef);
  const initialState: DiscountCodeActionResponse = {
    success: false,
    errors: {},
  };

  const form = useForm<DiscountCodeFormValues>({
    resolver: zodResolver(discountCodeSchema),
    defaultValues: { code: "" },
  });

  const [state, formAction, pendingAdd] = useActionState(addDiscountCode, null);

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([key, value]) => {
        form.setError(key as Path<DiscountCodeFormValues>, {
          type: "server",
          message: value[0] || "",
        });
      });
    }
    if (state?.success) {
      // Ensure controlled field fully clears
      form.reset({ code: "" });
    }
  }, [state]);

  const onSubmit = form.handleSubmit((_, e) => {
    const formEl = e?.target as HTMLFormElement | null;
    if (!formEl) return;

    const fd = new FormData(formEl);

    // Optional: wrap in a transition to keep the UI snappy
    startTransition(() => {
      formAction(fd);
    });
  });

  return (
    <Disclosure
      className={s.disclosure}
      defaultExpanded={(cart?.discountCodes?.length ?? 0) > 0}
    >
      <ReactAriaButton slot="trigger" className={s.disclosureButton}>
        {/* <ChevronRight size={18} /> */}
        Do you have a discount code?
        <ChevronDown size={18} />
      </ReactAriaButton>
      <DisclosurePanel className={s.disclosurePanel}>
        <div className={s.disclosedContent}>
          <form onSubmit={onSubmit} className={s.discountCodeForm}>
            <Controller
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"Discount Code"}
                  block
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message || ""}
                />
              )}
            />
            <Button type="submit" loading={pendingAdd} className={s.applyBtn}>
              Apply
            </Button>
          </form>
          <ul className={s.appliedDiscountCodesList}>
            {cart?.discountCodes.map((x) => (
              <DiscountCodeLabel key={x.code} code={x.code} />
            ))}
          </ul>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
