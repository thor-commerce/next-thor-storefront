"use client";
import { CheckoutCartDetailsQuery } from "@/__generated__/thor/graphql";
import Select from "@/components/select/select";
import TextInput from "@/components/text-input/text-input";
import { COUNTRIES } from "@/lib/thor/config";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import invariant from "tiny-invariant";
import { omitBy, pickBy } from "lodash-es";
import z from "zod";
import { cartUpdateAction } from "../actions";
import s from "./checkout-main.module.css";
import { CheckoutSection } from "./checkout-section/checkout-section";
import CheckoutShippingMethods from "./checkout-shipping-methods/checkout-shipping-methods";
import StripeWrapper from "./checkout-payment/stripe-wrapper";
import CheckoutPayment from "./checkout-payment/checkout-payment";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const baseAddressFormSchema = z.object({
  country: z.string().min(2, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  phone: z.string().min(1, "Phone number is required"),
});
const checkoutMainFormSchema = z.object({
  // Contact
  email: z.email("Invalid email address"),
  shippingAddress: baseAddressFormSchema,
  // Shipping Method (to be populated after address with country + zipcode)
  shippingMethodId: z.string().optional(),
});

export type CheckoutMainFormValues = z.infer<typeof checkoutMainFormSchema>;

export default function CheckoutMain({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutCartDetailsQuery>;
}) {
  const {
    data: { cart },
  } = useReadQuery(queryRef);
  const stripe = useStripe();
  const elements = useElements();

  invariant(cart, "Cart data is required");

  const form = useForm<CheckoutMainFormValues>({
    resolver: zodResolver(checkoutMainFormSchema),
    values: {
      email: cart?.customerEmail || "",
      shippingAddress: {
        country: cart?.shippingAddress?.countryCode || "",
        firstName: cart?.shippingAddress?.firstName || "",
        lastName: cart?.shippingAddress?.lastName || "",
        address: cart?.shippingAddress?.address1 || "",
        apartment: cart?.shippingAddress?.address2 || "",
        city: cart?.shippingAddress?.city || "",
        postalCode: cart?.shippingAddress?.postalCode || "",
        phone: cart?.shippingAddress?.phone || "",
      },
      //it is possible to have multiple shipping lines, so we pick the first one that exists, for the case of this example
      shippingMethodId:
        cart.shippingLines.find(Boolean)?.shippingMethod.id || undefined,
    },
  });

  const handleBlur = async () => {
    //get all dirty fields
    const dirtyFields = form.formState.dirtyFields;
    const values = form.getValues();
    //check if either email or shipping address changed
    if (dirtyFields.email || dirtyFields.shippingAddress) {
      console.log(
        "Updating cart with new email or shipping address",
        dirtyFields
      );

      // Build the update object with only non-empty values
      const updateData: Record<string, unknown> = {};

      // Only include email if it's dirty and has a value
      if (dirtyFields.email && values.email) {
        updateData.customerEmail = values.email;
      }

      // Only include shipping address fields that have values
      if (dirtyFields.shippingAddress && values.shippingAddress) {
        // Check if all required fields are present
        const hasRequiredFields =
          values.shippingAddress.address &&
          values.shippingAddress.city &&
          values.shippingAddress.postalCode &&
          values.shippingAddress.country;

        if (hasRequiredFields) {
          const cleanedAddress = pickBy(
            {
              countryCode: values.shippingAddress.country,
              firstName: values.shippingAddress.firstName,
              lastName: values.shippingAddress.lastName,
              address1: values.shippingAddress.address,
              address2: values.shippingAddress.apartment,
              city: values.shippingAddress.city,
              postalCode: values.shippingAddress.postalCode,
              phone: values.shippingAddress.phone,
            },
            (value) => value !== "" && value != null
          );

          updateData.shippingAddress = cleanedAddress;
        }
      }

      // Only call the action if there's something to update
      if (Object.keys(updateData).length > 0) {
        await cartUpdateAction(updateData);
      }
    }
  };

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <form className={s.main} onSubmit={handleSubmit} onBlur={handleBlur}>
        <CheckoutSection>
          <CheckoutSection.Header title="Contact" />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label={"Email"}
                block
                autoComplete="shipping email"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </CheckoutSection>
        <CheckoutSection>
          <CheckoutSection.Header title="Delivery" />
          <CheckoutSection.Row>
            <Controller
              name="shippingAddress.country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Select
                  label={"Country/Region"}
                  block
                  options={COUNTRIES.map((country) => ({
                    value: country.code.toUpperCase(),
                    label: country.name,
                  }))}
                  {...field}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </CheckoutSection.Row>
          <CheckoutSection.Row columns={2}>
            <Controller
              control={form.control}
              name="shippingAddress.firstName"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"First Name"}
                  block
                  autoComplete="given-name"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="shippingAddress.lastName"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"Last Name"}
                  block
                  autoComplete="family-name"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </CheckoutSection.Row>
          <CheckoutSection.Row>
            <Controller
              control={form.control}
              name="shippingAddress.address"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"Address"}
                  block
                  autoComplete="shipping address-line1"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </CheckoutSection.Row>
          <CheckoutSection.Row>
            <Controller
              control={form.control}
              name="shippingAddress.apartment"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"Apartment, suite, etc. (optional)"}
                  block
                  autoComplete="shipping address-line2"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </CheckoutSection.Row>
          <CheckoutSection.Row columns={2}>
            <Controller
              control={form.control}
              name="shippingAddress.postalCode"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"Postal Code"}
                  block
                  autoComplete="shipping postal-code"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="shippingAddress.city"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"City"}
                  block
                  autoComplete="shipping city"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </CheckoutSection.Row>
          <CheckoutSection.Row>
            <Controller
              control={form.control}
              name="shippingAddress.phone"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label={"Phone"}
                  block
                  autoComplete="shipping tel"
                  type="tel"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </CheckoutSection.Row>
        </CheckoutSection>
        <CheckoutSection>
          <CheckoutSection.Header title="Shipping Method" />
          <CheckoutShippingMethods cartFragment={cart} />
        </CheckoutSection>
        <CheckoutSection>
          <CheckoutSection.Header title="Payment" />
          <CheckoutPayment />
        </CheckoutSection>
      </form>
    </FormProvider>
  );
}

