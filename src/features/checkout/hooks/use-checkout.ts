"use client";
//create a hook

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    type Dispatch,
    type SetStateAction,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { CheckoutStepEnum } from "../types";

export interface UseCheckoutState {
    progress: number;
    currentStep: CheckoutStepEnum;
    setStep: (step: CheckoutStepEnum) => void;
    prefetchNextStep: () => void;
    previousUrl: string;
    errorMessage?: string | null;
    setErrorMessage: Dispatch<SetStateAction<string | null>>;
    removePaymentProcessing: () => void;
    stripePromise?: Promise<Stripe | null>;
}
export const CheckoutContext = createContext<UseCheckoutState>({} as UseCheckoutState);
export const useCheckoutContext = () => useContext(CheckoutContext);

export function useCheckoutState(publishableKey: string): UseCheckoutState {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ lang: string }>();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Memoize stripe promise so it's only created once per publishableKey
    const stripePromise = useMemo(() => {
        if (!publishableKey) return undefined;
        return loadStripe(publishableKey);
    }, [publishableKey]);

    useEffect(() => {
        if (errorMessage != "" && errorMessage != null) {
            window.scrollTo(0, 0);
        }
    }, [errorMessage]);

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const setStep = useCallback(
        (step: CheckoutStepEnum) => {
            router.push(`${pathname}?${createQueryString("step", step)}`);
        },
        [createQueryString, pathname, router],
    );

    const removePaymentProcessing = useCallback(() => {
        //keep query params and remove processing_payment
        const params = new URLSearchParams(searchParams.toString());
        params.delete("processing_payment");
        router.replace(`${pathname}?${params.toString()}`);
    }, [createQueryString, pathname, router]);

    const progress = useMemo(() => {
        return (
            (100 / (1 + Object.keys(CheckoutStepEnum).length)) *
            (1 +
                Object.keys(CheckoutStepEnum)
                    .map((key) => CheckoutStepEnum[key as keyof typeof CheckoutStepEnum])
                    .indexOf(searchParams.get("step") as CheckoutStepEnum))
        );
    }, [searchParams]);

    const prefetchNextStep = useCallback(() => {
        const currentStep = searchParams.get("step") as CheckoutStepEnum;
        const steps = Object.keys(CheckoutStepEnum).map(
            (key) => CheckoutStepEnum[key as keyof typeof CheckoutStepEnum],
        );
        const currentStepIndex = steps.indexOf(currentStep);
        const nextStepIndex = currentStepIndex + 1;

        if (nextStepIndex < steps.length) {
            const nextStep = steps[nextStepIndex];
            router.prefetch(`${pathname}?${createQueryString("step", nextStep)}`);
        }
    }, [createQueryString, pathname, router, searchParams]);

    const previousUrl = useMemo(() => {
        //if the step is the first step set it to empty string
        if (searchParams.get("step") === CheckoutStepEnum.Customer) {
            return "";
        }
        const steps = Object.keys(CheckoutStepEnum).map(
            (key) => CheckoutStepEnum[key as keyof typeof CheckoutStepEnum],
        );
        const currentStepIndex = steps.indexOf(searchParams.get("step") as CheckoutStepEnum);
        const previousStepIndex = currentStepIndex - 1;
        const previousStep = steps[previousStepIndex];

        return `${pathname.replace(`/${params.lang}`, "")}?${createQueryString("step", previousStep)}`;
    }, [createQueryString, pathname, searchParams, params]);

    return {
        progress,
        currentStep: searchParams.get("step") as CheckoutStepEnum,
        setStep,
        prefetchNextStep,
        previousUrl,
        errorMessage,
        setErrorMessage,
        removePaymentProcessing,
        stripePromise
    };
}

const useCheckout = () => {
    const { progress, currentStep, setStep, prefetchNextStep, previousUrl, errorMessage, setErrorMessage, removePaymentProcessing, stripePromise } =
        useCheckoutContext();
    return {
        progress,
        currentStep,
        setStep,
        prefetchNextStep,
        previousUrl,
        errorMessage,
        setErrorMessage,
        removePaymentProcessing,
        stripePromise
    };
};

export default useCheckout;
