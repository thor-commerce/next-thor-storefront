import { type FC } from "react";
import s from "./checkout-details.module.css";
import { EditIcon } from "lucide-react";
import { CheckoutCart, CheckoutStepEnum, PaymentGateway } from "@/features/checkout/types";
import Link from "next/link";

interface Props {
	cart: CheckoutCart;
	currentStep: CheckoutStepEnum;
	countryCode: string;
	paymentGateway?: Pick<PaymentGateway, "id" | "name" | "type">;
}

const CheckoutDetails: FC<Props> = ({ cart, countryCode, currentStep, paymentGateway }) => {
	const shippingLine = cart.shippingLines.find(Boolean);

	return (
		<div className={s.root}>
			<div className={s.row}>
				<div className={s.leftColumn}>
					<div>
						<span className={s.heading}>Payment method</span>
					</div>
					<div>{formatPaymentMethod(paymentGateway)}</div>
				</div>
				<EditLink cartId={cart.id} countryCode={countryCode} step={CheckoutStepEnum.GatewaySelection} />
			</div>
			<div className={s.row}>
				<div className={s.leftColumn}>
					<div>
						<span className={s.heading}>Contact</span>
					</div>
					<div>{cart.customerEmail ?? "Not set"}</div>
				</div>
				<EditLink cartId={cart.id} countryCode={countryCode} step={CheckoutStepEnum.Customer} />
			</div>
			<div className={s.row}>
				<div className={s.leftColumn}>
					<div>
						<span className={s.heading}>Ship to</span>
					</div>
					<div className={s.address}>{formatAddress(cart.shippingAddress)}</div>
				</div>
				<EditLink cartId={cart.id} countryCode={countryCode} step={CheckoutStepEnum.Customer} />
			</div>
			{currentStep === CheckoutStepEnum.Payment && (
				<div className={s.row}>
					<div className={s.leftColumn}>
						<div>
							<span className={s.heading}>Delivery</span>
						</div>
						<div>{shippingLine?.shippingMethod.name ?? "Not set"}</div>
					</div>
					<EditLink cartId={cart.id} countryCode={countryCode} step={CheckoutStepEnum.Delivery} />
				</div>
			)}
		</div>
	);
};

CheckoutDetails.displayName = "CheckoutDetails";
export default CheckoutDetails;

function EditLink({
	cartId,
	countryCode,
	step,
}: {
	cartId: string;
	countryCode: string;
	step: CheckoutStepEnum;
}) {
	return (
		<Link
			aria-label={`Edit ${getEditLabel(step)}`}
			className={s.edit}
			href={`/${countryCode}/checkout/${cartId}?step=${step}`}
		>
			<EditIcon aria-hidden size={16} />
		</Link>
	);
}

function getEditLabel(step: CheckoutStepEnum) {
	if (step === CheckoutStepEnum.Delivery) {
		return "delivery";
	}

	if (step === CheckoutStepEnum.GatewaySelection) {
		return "payment method";
	}

	return "customer details";
}

function formatPaymentMethod(paymentGateway?: Pick<PaymentGateway, "name" | "type">) {
	if (!paymentGateway) {
		return "Not set";
	}

	if (paymentGateway.type === "ManualPaymentGateway") {
		return "Invoice";
	}

	if (paymentGateway.type === "StripePaymentGateway" || paymentGateway.type === "StripeConnectPaymentGateway") {
		return `Card via ${paymentGateway.name}`;
	}

	return paymentGateway.name;
}

function formatAddress(address: CheckoutCart["shippingAddress"]) {
	if (!address) {
		return "Not set";
	}

	if (address.formatted) {
		return address.formatted;
	}

	return [
		[address.address1, address.address2].filter(Boolean).join(", "),
		[address.postalCode, address.city].filter(Boolean).join(" "),
		address.countryCode,
	]
		.filter(Boolean)
		.join("\n");
}
