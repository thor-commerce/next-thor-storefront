"use client";

import Button from "@/components/button/button";
import Select from "@/components/select/select";
import TextInput from "@/components/text-input/text-input";
import { updateCustomerStepAction } from "@/features/checkout/actions";
import { CheckoutAddressValues, checkoutCustomerStepSchema, type CheckoutCustomerStepValues } from "@/features/checkout/schema";
import type { CheckoutCart, CheckoutCustomer, CheckoutCustomerAddress } from "@/features/checkout/types";
import { COUNTRIES } from "@/lib/thorcommerce/config";
import { mapEdgesToItems } from "@/utils/maps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useTransition } from "react";
import { Controller, type Control, type FieldErrors, useForm, useWatch } from "react-hook-form";
import s from "./checkout-customer-step.module.css";

interface CheckoutCustomerStepFormProps {
	cart: CheckoutCart;
	className?: string;
	countryCode: string;
	customer?: CheckoutCustomer | null;
}

const emptyAddress: CheckoutAddressValues = {
	address1: "",
	address2: "",
	city: "",
	company: "",
	countryCode: "",
	firstName: "",
	lastName: "",
	phone: "",
	postalCode: "",
	state: "",
};

export default function CheckoutCustomerStepForm({
	cart,
	className,
	countryCode,
	customer,
}: CheckoutCustomerStepFormProps) {
	const savedAddresses = useMemo(() => mapEdgesToItems(customer?.addresses), [customer?.addresses]);
	const initialShippingAddress =
		mapCartAddress(cart.shippingAddress) ?? mapCustomerAddress(customer?.defaultShippingAddress);
	const initialBillingAddress =
		mapCartAddress(cart.billingAddress) ?? mapCustomerAddress(customer?.defaultBillingAddress);
	const [error, setError] = useState<string>();
	const [isPending, startTransition] = useTransition();
	const form = useForm<CheckoutCustomerStepValues>({
		resolver: zodResolver(checkoutCustomerStepSchema),
		defaultValues: {
			billingAddress: {
				...emptyAddress,
				countryCode: countryCode.toUpperCase(),
				firstName: customer?.firstName ?? "",
				lastName: customer?.lastName ?? "",
				...initialBillingAddress,
			},
			billingSameAsShipping: !cart.billingAddress || addressesMatch(cart.shippingAddress, cart.billingAddress),
			email: cart.customerEmail ?? customer?.email ?? "",
			shippingAddress: {
				...emptyAddress,
				countryCode: countryCode.toUpperCase(),
				firstName: customer?.firstName ?? "",
				lastName: customer?.lastName ?? "",
				...initialShippingAddress,
			},
		},
	});

	const billingSameAsShipping = useWatch({
		control: form.control,
		name: "billingSameAsShipping",
	});

	const handleShippingAddressSelect = (addressId: string) => {
		const address = savedAddresses.find((item) => item.id === addressId);

		if (address) {
			form.setValue("shippingAddress", {
				...form.getValues("shippingAddress"),
				...mapCustomerAddress(address),
			}, { shouldDirty: true, shouldValidate: true });
		}
	};

	const handleBillingAddressSelect = (addressId: string) => {
		const address = savedAddresses.find((item) => item.id === addressId);

		if (address) {
			form.setValue("billingAddress", {
				...form.getValues("billingAddress"),
				...mapCustomerAddress(address),
			}, { shouldDirty: true, shouldValidate: true });
		}
	};

	const handleSubmit = form.handleSubmit((values) => {
		startTransition(async () => {
			const result = await updateCustomerStepAction(undefined, {
				...values,
				cartId: cart.id,
				countryCode,
			});

			setError(result);
		});
	});

	return (
		<form className={`${s.root} ${className ?? ""}`} onSubmit={handleSubmit}>
			<div className={s.header}>
				<h1 className={s.title}>Customer</h1>
				{customer ? (
					<p className={s.copy}>Signed in as {customer.email}. These details are saved to this cart.</p>
				) : (
					<p className={s.copy}>Enter contact and delivery details for this order.</p>
				)}
			</div>

			<div className={s.section}>
				<h2 className={s.sectionTitle}>Contact</h2>
				<Controller
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<TextInput
							{...field}
							autoComplete="email"
							block
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
							isRequired
							label="Email"
							type="email"
						/>
					)}
				/>
			</div>

			<div className={s.section}>
				<div className={s.sectionHeader}>
					<h2 className={s.sectionTitle}>Shipping address</h2>
					{savedAddresses.length > 0 && (
						<select
							className={s.savedAddressSelect}
							defaultValue=""
							onChange={(event) => handleShippingAddressSelect(event.target.value)}
						>
							<option value="" disabled>
								Use saved address
							</option>
							{savedAddresses.map((address) => (
								<option key={address.id} value={address.id}>
									{formatAddressOption(address)}
								</option>
							))}
						</select>
					)}
				</div>
				<AddressFields control={form.control} errors={form.formState.errors} fieldPrefix="shippingAddress" prefix="shipping" />
			</div>

			<div className={s.section}>
				<label className={s.checkboxLabel}>
					<Controller
						control={form.control}
						name="billingSameAsShipping"
						render={({ field }) => (
							<input
								checked={field.value}
								className={s.checkbox}
								name={field.name}
								onBlur={field.onBlur}
								onChange={(event) => field.onChange(event.target.checked)}
								ref={field.ref}
								type="checkbox"
							/>
						)}
					/>
					<span>Billing address is the same as shipping</span>
				</label>

				{!billingSameAsShipping && (
					<>
						<div className={s.sectionHeader}>
							<h2 className={s.sectionTitle}>Billing address</h2>
							{savedAddresses.length > 0 && (
								<select
									className={s.savedAddressSelect}
									defaultValue=""
									onChange={(event) => handleBillingAddressSelect(event.target.value)}
								>
									<option value="" disabled>
										Use saved address
									</option>
									{savedAddresses.map((address) => (
										<option key={address.id} value={address.id}>
											{formatAddressOption(address)}
										</option>
									))}
								</select>
							)}
						</div>
						<AddressFields control={form.control} errors={form.formState.errors} fieldPrefix="billingAddress" prefix="billing" />
					</>
				)}
			</div>

			{error && <p className={s.error}>{error}</p>}

			<Button disabled={isPending} loading={isPending} type="submit">
				Continue to delivery
			</Button>
		</form>
	);
}

function AddressFields({
	control,
	errors,
	fieldPrefix,
	prefix,
}: {
	control: Control<CheckoutCustomerStepValues>;
	errors: FieldErrors<CheckoutCustomerStepValues>;
	fieldPrefix: "shippingAddress" | "billingAddress";
	prefix: string;
}) {
	const fieldErrors = errors[fieldPrefix];

	return (
		<div className={s.addressFields}>
			<div className={s.grid}>
				<Controller
					control={control}
					name={`${fieldPrefix}.firstName`}
					render={({ field, fieldState }) => (
						<TextInput
							{...field}
							autoComplete={`${prefix} given-name`}
							block
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
							isRequired
							label="First name"
						/>
					)}
				/>
				<Controller
					control={control}
					name={`${fieldPrefix}.lastName`}
					render={({ field, fieldState }) => (
						<TextInput
							{...field}
							autoComplete={`${prefix} family-name`}
							block
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
							isRequired
							label="Last name"
						/>
					)}
				/>
			</div>
			<Controller
				control={control}
				name={`${fieldPrefix}.company`}
				render={({ field }) => (
					<TextInput {...field} autoComplete={`${prefix} organization`} block label="Company" />
				)}
			/>
			<Controller
				control={control}
				name={`${fieldPrefix}.address1`}
				render={({ field, fieldState }) => (
					<TextInput
						{...field}
						autoComplete={`${prefix} address-line1`}
						block
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						isRequired
						label="Address"
					/>
				)}
			/>
			<Controller
				control={control}
				name={`${fieldPrefix}.address2`}
				render={({ field }) => (
					<TextInput {...field} autoComplete={`${prefix} address-line2`} block label="Apartment, suite, etc." />
				)}
			/>
			<div className={s.grid}>
				<Controller
					control={control}
					name={`${fieldPrefix}.postalCode`}
					render={({ field, fieldState }) => (
						<TextInput
							{...field}
							autoComplete={`${prefix} postal-code`}
							block
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
							isRequired
							label="Postal code"
						/>
					)}
				/>
				<Controller
					control={control}
					name={`${fieldPrefix}.city`}
					render={({ field, fieldState }) => (
						<TextInput
							{...field}
							autoComplete={`${prefix} address-level2`}
							block
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
							isRequired
							label="City"
						/>
					)}
				/>
			</div>
			<div className={s.grid}>
				<Controller
					control={control}
					name={`${fieldPrefix}.state`}
					render={({ field }) => (
						<TextInput {...field} autoComplete={`${prefix} address-level1`} block label="State / region" />
					)}
				/>
				<Controller
					control={control}
					name={`${fieldPrefix}.countryCode`}
					render={({ field }) => (
						<Select
							block
							errorMessage={fieldErrors?.countryCode?.message}
							isInvalid={!!fieldErrors?.countryCode}
							label="Country"
							onChange={field.onChange}
							options={COUNTRIES.map((country) => ({
								label: country.name,
								value: country.code.toUpperCase(),
							}))}
							required
							value={field.value}
						/>
					)}
				/>
			</div>
			<Controller
				control={control}
				name={`${fieldPrefix}.phone`}
				render={({ field, fieldState }) => (
					<TextInput
						{...field}
						autoComplete={`${prefix} tel`}
						block
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						isRequired
						label="Phone"
						type="tel"
					/>
				)}
			/>
		</div>
	);
}

function mapCartAddress(
	address: CheckoutCart["shippingAddress"] | CheckoutCart["billingAddress"],
): Partial<CheckoutAddressValues> | undefined {
	if (!address) {
		return undefined;
	}

	return {
		address1: address.address1 ?? "",
		address2: address.address2 ?? "",
		city: address.city ?? "",
		company: address.company ?? "",
		countryCode: address.countryCode ?? "",
		firstName: address.firstName ?? "",
		lastName: address.lastName ?? "",
		phone: address.phone ?? "",
		postalCode: address.postalCode ?? "",
		state: address.state ?? "",
	};
}

function mapCustomerAddress(address?: CheckoutCustomerAddress | null): Partial<CheckoutAddressValues> | undefined {
	if (!address) {
		return undefined;
	}

	return {
		address1: address.address1 ?? "",
		address2: address.address2 ?? "",
		city: address.city ?? "",
		company: address.company ?? "",
		countryCode: address.countryCode ?? "",
		firstName: address.firstName ?? "",
		lastName: address.lastName ?? "",
		phone: address.phone ?? "",
		postalCode: address.postalCode ?? "",
		state: address.state ?? "",
	};
}

function formatAddressOption(address: CheckoutCustomerAddress) {
	const name = [address.firstName, address.lastName].filter(Boolean).join(" ");
	const line = [address.address1, address.city].filter(Boolean).join(", ");

	return [name, line].filter(Boolean).join(" - ") || "Saved address";
}

function addressesMatch(
	shippingAddress: CheckoutCart["shippingAddress"],
	billingAddress: CheckoutCart["billingAddress"],
) {
	if (!shippingAddress || !billingAddress) {
		return false;
	}

	return (
		shippingAddress.address1 === billingAddress.address1 &&
		shippingAddress.address2 === billingAddress.address2 &&
		shippingAddress.city === billingAddress.city &&
		shippingAddress.company === billingAddress.company &&
		shippingAddress.countryCode === billingAddress.countryCode &&
		shippingAddress.firstName === billingAddress.firstName &&
		shippingAddress.lastName === billingAddress.lastName &&
		shippingAddress.phone === billingAddress.phone &&
		shippingAddress.postalCode === billingAddress.postalCode &&
		shippingAddress.state === billingAddress.state
	);
}
