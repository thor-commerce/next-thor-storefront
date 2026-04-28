import z from "zod";

const requiredString = (field: string) => z.string().trim().min(1, `${field} is required`);
const optionalString = z.string().trim();

export const checkoutAddressSchema = z.object({
	address1: requiredString("Address"),
	address2: optionalString,
	city: requiredString("City"),
	company: optionalString,
	countryCode: requiredString("Country"),
	firstName: requiredString("First name"),
	lastName: requiredString("Last name"),
	phone: requiredString("Phone"),
	postalCode: requiredString("Postal code"),
	state: optionalString,
});

const optionalCheckoutAddressSchema = z.object({
	address1: optionalString,
	address2: optionalString,
	city: optionalString,
	company: optionalString,
	countryCode: optionalString,
	firstName: optionalString,
	lastName: optionalString,
	phone: optionalString,
	postalCode: optionalString,
	state: optionalString,
});

export const checkoutCustomerStepSchema = z
	.object({
		billingAddress: optionalCheckoutAddressSchema,
		billingSameAsShipping: z.boolean(),
		email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
		shippingAddress: checkoutAddressSchema,
	})
	.superRefine((values, context) => {
		if (values.billingSameAsShipping) {
			return;
		}

		const result = checkoutAddressSchema.safeParse(values.billingAddress);

		if (result.success) {
			return;
		}

		for (const issue of result.error.issues) {
			context.addIssue({
				...issue,
				path: ["billingAddress", ...issue.path],
			});
		}
	});

export type CheckoutCustomerStepValues = z.infer<typeof checkoutCustomerStepSchema>;
export type CheckoutAddressValues = z.infer<typeof checkoutAddressSchema>;

export const checkoutDeliveryStepSchema = z.object({
	shippingMethodId: requiredString("Shipping method"),
});

export type CheckoutDeliveryStepValues = z.infer<typeof checkoutDeliveryStepSchema>;
