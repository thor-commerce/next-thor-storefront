import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutPayment() {
  return (
      <PaymentElement
        options={{
          layout: {
            type: "accordion",
            radios: true,
            spacedAccordionItems: false,
            defaultCollapsed: false,
          },
          wallets: {
            applePay: "auto",
            googlePay: "auto",
            link: "auto",
          },
          fields: {
            billingDetails: "never",
          },
        }}
      />
  );
}
