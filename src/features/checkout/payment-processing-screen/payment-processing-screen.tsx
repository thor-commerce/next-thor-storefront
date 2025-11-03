"use client";
import { useEffect } from "react";
import s from "./payment-processing-screen.module.css";

import Spinner from "@/components/spinner/spinner";

interface Props {
  cartId: string;
}

export default function PaymentProcessingScreen({ cartId }: Props) {
  const onPaymentComplete = async () => {
    // await placeOrder({ cartId }).catch(() => {
    //   //TODO: error handling
    // });
  };

  useEffect(() => {
    void onPaymentComplete();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Spinner size="medium" />
        <p>Processing payment...</p>
      </div>
    </div>
  );
}
