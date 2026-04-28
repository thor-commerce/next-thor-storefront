import { CheckoutCart, CheckoutCustomer } from "@/features/checkout/types";
import CheckoutCustomerStepForm from "./checkout-customer-step-form";

interface CheckoutCustomerStepProps {
	cart: CheckoutCart;
	className?: string;
	countryCode: string;
	customer?: CheckoutCustomer | null;
}

export default function CheckoutCustomerStep({ cart, className, countryCode, customer }: CheckoutCustomerStepProps) {
	return <CheckoutCustomerStepForm cart={cart} className={className} countryCode={countryCode} customer={customer} />;
}
