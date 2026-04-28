import type { CheckoutCart } from "@/features/checkout/types";
import CheckoutDeliveryStepForm from "./checkout-delivery-step-form";

interface CheckoutDeliveryStepProps {
	cart: CheckoutCart;
	className?: string;
	countryCode: string;
}

export default function CheckoutDeliveryStep({ cart, className, countryCode }: CheckoutDeliveryStepProps) {
	return <CheckoutDeliveryStepForm cart={cart} className={className} countryCode={countryCode} />;
}
