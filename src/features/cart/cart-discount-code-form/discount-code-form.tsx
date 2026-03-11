"use client";

import { CartDetailsQuery } from "@/__generated__/thor/graphql";
import Button from "@/components/button/button";
import TextInput from "@/components/text-input/text-input";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useActionState, useEffect } from "react";
import {
  Disclosure,
  DisclosurePanel,
  Button as ReactAriaButton,
} from "react-aria-components";
import { Controller, Path, useForm } from "react-hook-form";
import z from "zod";
import { addDiscountCode } from "../actions";
import { DiscountCodeActionResponse } from "../types";
import s from "./discount-code-form.module.css";
import DiscountCodeLabel from "./discount-code-label";
import { discountCodeSchema } from "./validation";

export type DiscountCodeFormValues = z.infer<typeof discountCodeSchema>;

export default function DiscountCodeForm({
  queryRef,
}: {
  queryRef: QueryRef<CartDetailsQuery>;
}) {
  const {
    data: { cart },
  } = useReadQuery(queryRef);

  const form = useForm<DiscountCodeFormValues>({
    resolver: zodResolver(discountCodeSchema),
    defaultValues: { code: "" },
  });

  const [state, formAction, pendingAdd] = useActionState<DiscountCodeActionResponse | null, FormData>(
    addDiscountCode,
    null,
  );

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
      form.reset({ code: "" });
      form.clearErrors();
    }
  }, [form, state]);

  const handleSubmitCapture = async (event: React.FormEvent<HTMLFormElement>) => {
    const isValid = await form.trigger();
    if (!isValid) {
      event.preventDefault();
      return;
    }

    form.clearErrors();
  };

  return (
    <Disclosure
      className={s.disclosure}
      defaultExpanded={(cart?.discountCodes?.length ?? 0) > 0}
    >
      <ReactAriaButton slot="trigger" className={s.disclosureButton}>
        Do you have a discount code?
        <ChevronDown size={18} />
      </ReactAriaButton>
      <DisclosurePanel className={s.disclosurePanel}>
        <div className={s.disclosedContent}>
          <form
            action={formAction}
            className={s.discountCodeForm}
            onSubmitCapture={(event) => {
              void handleSubmitCapture(event);
            }}
          >
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
