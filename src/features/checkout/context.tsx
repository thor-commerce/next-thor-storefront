"use client";
import React, { type FC, type PropsWithChildren } from "react";
import { CheckoutContext, useCheckoutState } from "./hooks/use-checkout";

interface Props {
  publishableKey: string;
}
type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;

export type CheckoutContextProviderProps = Props & NativeAttrs;

const CheckoutContextProvider: FC<
  PropsWithChildren<CheckoutContextProviderProps>
> = ({ children, publishableKey }) => {
	
  const checkoutState = useCheckoutState(publishableKey);

  return (
    <CheckoutContext.Provider value={checkoutState}>
      {children}
    </CheckoutContext.Provider>
  );
};

CheckoutContextProvider.displayName = "CheckoutContextProvider";
export default CheckoutContextProvider;
