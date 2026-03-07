"use client";

import ShoppingCart from "@/components/icons/shopping-cart";
import { mapEdgesToItems } from "@/utils/maps";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";
import { useCart } from "./cart-context";
import s from "./cart.module.css";

export default function CartDrawer() {

    const { cart } = useCart();

    const quantityRef = useRef(cart?.lineItemsQuantity);

    const [isOpen, setOpen] = useState(false);
    const hasItems = cart?.lineItemsQuantity && cart.lineItemsQuantity > 0;
    const lines = mapEdgesToItems(cart?.lineItems);
    useEffect(() => {
        if (
            cart?.lineItemsQuantity &&
            cart?.lineItemsQuantity !== quantityRef.current &&
            cart?.lineItemsQuantity > 0
        ) {
            if (!isOpen) {
                setOpen(true);
            }
            quantityRef.current = cart?.lineItemsQuantity;
        }
    }, [isOpen, cart?.lineItemsQuantity, quantityRef]);

    return (
        <DialogTrigger>
            <Button className={s.cartButton} onClick={() => setOpen(true)}>
                <ShoppingCart />
                {cart?.lineItemsQuantity && cart.lineItemsQuantity > 0 ? (
                    <span className={clsx(s.cartCount)}>
                        <span className={s.number}>{cart.lineItemsQuantity > 9 ? "+9" : cart.lineItemsQuantity}</span>
                    </span>
                ) : null}
            </Button>
            <ModalOverlay
                isDismissable
                className={s.overlay}
                isOpen={isOpen}
                onOpenChange={setOpen}
                shouldCloseOnInteractOutside={(element) => {
                    // Don't close when interacting with 1Password or other browser extensions
                    const isExtensionElement =
                        element.closest("[data-1p-ignore]") ||
                        element.closest('[class*="onepassword"]') ||
                        element.closest('[class*="1password"]') ||
                        element.closest('[id*="onepassword"]') ||
                        element.closest('[id*="1password"]') ||
                        element.closest('[role="listbox"]') ||
                        element.closest('[role="dialog"]') ||
                        (() => {
                            const style = window.getComputedStyle(element);
                            const zIndex = parseInt(style.zIndex, 10);
                            return zIndex > 50000;
                        })();

                    return !isExtensionElement;
                }}
            >
                <Modal className={clsx(s.modal)}>
                    <Dialog className={s.dialog}>
                        <header className={s.drawerHeader}>
                            <Heading>Cart</Heading>
                        </header>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
        // <Drawer
        //     heading={`Cart · ${cart?.lineItemsQuantity ?? 0}`}
        //     closeButton={
        //         <XIcon />
        //     }
        //     isOpen={isOpen}
        //     onOpenChange={setOpen}
        //     triggerElement={

        //     }
        // >
        //     <>
        //         {/* {cart && hasItems ? (
        //             <>
        //                 <ul className={s.lineItems}>
        //                     {lines.map((item) => (
        //                         <CartLineItem key={item.id} lineItem={item} />
        //                     ))}
        //                 </ul>
        //                 <footer className={s.drawerFooter}>
        //                     <div className={s.checkoutDetails}>
        //                         <div className={clsx(s.detailRow, s.subtotalRow)} role="row">
        //                             <Text size={"small"}>Subtotal</Text>
        //                             <Text size={"small"}>
        //                                 {formatMoney({
        //                                     minimumFractionDigits: 0,
        //                                     maximumFractionDigits: 2,
        //                                     locale,
        //                                     money: cart.subtotal,
        //                                 })}
        //                             </Text>
        //                         </div>
        //                         <div className={s.detailRow} role="row">
        //                             <Text size={"small"}>Secure payment</Text>
        //                             <ul className={s.paymentIcons}>
        //                                 <li>
        //                                     <svg
        //                                         width="23"
        //                                         height="16"
        //                                         viewBox="0 0 23 16"
        //                                         fill="none"
        //                                         xmlns="http://www.w3.org/2000/svg"
        //                                     >
        //                                         <rect
        //                                             x="0.5"
        //                                             y="0.5"
        //                                             width="22"
        //                                             height="15"
        //                                             rx="2"
        //                                             fill="white"
        //                                             stroke="#D9D9D9"
        //                                         />
        //                                         <path
        //                                             fillRule="evenodd"
        //                                             clipRule="evenodd"
        //                                             d="M7.02517 10.8388H5.63182L4.58697 6.79488C4.53738 6.60886 4.43208 6.4444 4.27718 6.36689C3.89063 6.17211 3.46468 6.0171 3 5.93891V5.78322H5.24458C5.55437 5.78322 5.78671 6.0171 5.82543 6.28871L6.36756 9.20572L7.76023 5.78322H9.11486L7.02517 10.8388ZM9.88932 10.8388H8.57341L9.65698 5.78322H10.9729L9.88932 10.8388ZM12.6754 7.18377C12.7141 6.91148 12.9464 6.75579 13.2175 6.75579C13.6434 6.7167 14.1074 6.79488 14.4947 6.98899L14.727 5.9005C14.3398 5.74481 13.9138 5.66663 13.5273 5.66663C12.2501 5.66663 11.3207 6.3669 11.3207 7.33879C11.3207 8.07815 11.979 8.46636 12.4437 8.70024C12.9464 8.93344 13.14 9.08913 13.1013 9.32233C13.1013 9.67212 12.7141 9.82782 12.3275 9.82782C11.8629 9.82782 11.3982 9.71122 10.9729 9.51643L10.7406 10.6056C11.2052 10.7997 11.708 10.8779 12.1726 10.8779C13.6047 10.9163 14.4947 10.2167 14.4947 9.16664C14.4947 7.84427 12.6754 7.76677 12.6754 7.18377ZM19.1 10.8388L18.0552 5.78322H16.9329C16.7005 5.78322 16.4682 5.93891 16.3907 6.17211L14.4559 10.8388H15.8106L16.081 10.1001H17.7454L17.9003 10.8388H19.1ZM17.1265 7.14468L17.513 9.05004H16.4294L17.1265 7.14468Z"
        //                                             fill="#172B85"
        //                                         />
        //                                     </svg>
        //                                 </li>
        //                                 <li>
        //                                     <svg
        //                                         width="23"
        //                                         height="16"
        //                                         viewBox="0 0 23 16"
        //                                         fill="none"
        //                                         xmlns="http://www.w3.org/2000/svg"
        //                                     >
        //                                         <rect
        //                                             x="0.5"
        //                                             y="0.5"
        //                                             width="22"
        //                                             height="15"
        //                                             rx="2"
        //                                             fill="#1F72CD"
        //                                             stroke="#D9D9D9"
        //                                         />
        //                                         <path
        //                                             fillRule="evenodd"
        //                                             clipRule="evenodd"
        //                                             d="M4.1443 5.62036L2 10.576H4.56703L4.88527 9.78586H5.61269L5.93093 10.576H8.75651V9.97294L9.00828 10.576H10.4699L10.7217 9.9602V10.576H16.5981L17.3127 9.80638L17.9817 10.576L21 10.5824L18.8489 8.11201L21 5.62036H18.0285L17.333 6.37575L16.685 5.62036H10.2922L9.74322 6.89945L9.18139 5.62036H6.61972V6.2029L6.33475 5.62036H4.1443ZM12.9196 6.32407H16.2941L17.3262 7.48836L18.3916 6.32407H19.4237L17.8555 8.11131L19.4237 9.87796H18.3448L17.3127 8.70015L16.2419 9.87796H12.9196V6.32407ZM13.7529 7.70948V7.06034V7.05972H15.8585L16.7773 8.09787L15.8178 9.14169H13.7529V8.43301H15.5939V7.70948H13.7529ZM4.64098 6.32407H5.89227L7.31459 9.68451V6.32407H8.68533L9.7839 8.73349L10.7964 6.32407H12.1603V9.88006H11.3304L11.3236 7.09361L10.1137 9.88006H9.3713L8.15461 7.09361V9.88006H6.44733L6.12366 9.08285H4.37499L4.05199 9.87936H3.13725L4.64098 6.32407ZM4.67359 8.34589L5.2497 6.92573L5.82515 8.34589H4.67359Z"
        //                                             fill="white"
        //                                         />
        //                                     </svg>
        //                                 </li>
        //                                 <li>
        //                                     <svg
        //                                         width="23"
        //                                         height="16"
        //                                         viewBox="0 0 23 16"
        //                                         fill="none"
        //                                         xmlns="http://www.w3.org/2000/svg"
        //                                     >
        //                                         <rect
        //                                             x="0.5"
        //                                             y="0.5"
        //                                             width="22"
        //                                             height="15"
        //                                             rx="2"
        //                                             fill="white"
        //                                             stroke="#D9D9D9"
        //                                         />
        //                                         <path
        //                                             d="M14.9745 2.99243C17.75 2.99256 19.9999 5.206 19.9999 7.93579C19.9996 10.6654 17.7499 12.878 14.9745 12.8782C13.73 12.8782 12.5915 12.4325 11.7137 11.6956C10.8361 12.4321 9.6982 12.8782 8.45398 12.8782C5.6785 12.878 3.42859 10.6646 3.42859 7.93481C3.42885 5.20528 5.67866 2.99262 8.45398 2.99243C9.69798 2.99243 10.8361 3.43772 11.7137 4.17407C12.5914 3.43741 13.7302 2.99243 14.9745 2.99243Z"
        //                                             fill="#ED0006"
        //                                         />
        //                                         <path
        //                                             d="M14.9741 2.99243C17.7497 2.99243 20.0004 5.20592 20.0004 7.93579C20.0002 10.6654 17.7495 12.8782 14.9741 12.8782C13.7295 12.8781 12.592 12.4315 11.7143 11.6946C12.794 10.7881 13.4798 9.44139 13.4799 7.93579C13.4799 6.42977 12.7944 5.08166 11.7143 4.17505C12.592 3.43834 13.7298 2.99247 14.9741 2.99243Z"
        //                                             fill="#F9A000"
        //                                         />
        //                                         <path
        //                                             d="M11.7142 4.17419C12.7945 5.08073 13.4797 6.42884 13.4798 7.93494C13.4798 9.44101 12.7943 10.7891 11.7142 11.6957C10.6341 10.7891 9.94855 9.44093 9.94855 7.93494C9.94866 6.42892 10.634 5.08073 11.7142 4.17419Z"
        //                                             fill="#FF5E00"
        //                                         />
        //                                     </svg>
        //                                 </li>
        //                                 <li>
        //                                     <svg
        //                                         width="23"
        //                                         height="16"
        //                                         viewBox="0 0 23 16"
        //                                         fill="none"
        //                                         xmlns="http://www.w3.org/2000/svg"
        //                                     >
        //                                         <rect
        //                                             x="0.5"
        //                                             y="0.5"
        //                                             width="22"
        //                                             height="15"
        //                                             rx="2"
        //                                             fill="#FEB4C7"
        //                                             stroke="#D9D9D9"
        //                                         />
        //                                         <path
        //                                             d="M9.22723 7.23047C9.53763 7.23047 9.82569 7.3294 10.0641 7.49902V7.31152H10.9079V10.252H10.0641V10.0645C9.82569 10.234 9.53763 10.333 9.22723 10.333C8.40559 10.333 7.73993 9.63821 7.73993 8.78125C7.74017 7.92451 8.40574 7.23049 9.22723 7.23047ZM18.1335 7.23047C18.4436 7.23057 18.7312 7.32964 18.9694 7.49902V7.31152H19.8141V10.252H18.9694V10.0645C18.7312 10.2338 18.4436 10.3329 18.1335 10.333C17.3118 10.333 16.6452 9.63822 16.6452 8.78125C16.6454 7.9245 17.312 7.23047 18.1335 7.23047ZM20.7097 9.20898C21.0022 9.20898 21.2399 9.45655 21.2399 9.76172C21.2397 10.0666 21.0021 10.3135 20.7097 10.3135C20.4174 10.3132 20.1806 10.0665 20.1804 9.76172C20.1804 9.45669 20.4173 9.20922 20.7097 9.20898ZM3.56415 6V10.2529H2.6286V6H3.56415ZM5.90106 6C5.90106 6.92076 5.55705 7.7774 4.94403 8.41406L6.237 10.2529H5.08173L3.67645 8.25391L4.03876 7.9707C4.64024 7.50072 4.98505 6.78263 4.98505 6H5.90106ZM7.39325 10.252H6.50946V6.00098H7.39325V10.252ZM12.2145 7.69434C12.3838 7.46469 12.699 7.31152 13.0417 7.31152V8.16699C13.0383 8.16695 13.0344 8.16699 13.0309 8.16699C12.697 8.16723 12.2165 8.41594 12.2165 8.87891V10.252H11.3503V7.31152H12.2145V7.69434ZM15.1452 7.23242C15.8252 7.23242 16.3473 7.69761 16.3474 8.38184V10.252H15.5036V8.7002C15.5035 8.27161 15.2904 8.04106 14.9196 8.04102C14.5734 8.04102 14.2858 8.25986 14.2858 8.70703V10.252H13.4352V7.31152H14.2751V7.64258C14.4885 7.34133 14.808 7.23242 15.1452 7.23242ZM9.29657 8.02539C8.87415 8.02539 8.53192 8.36437 8.53192 8.78223C8.53215 9.19989 8.87429 9.53809 9.29657 9.53809C9.71888 9.53807 10.061 9.19988 10.0612 8.78223C10.0612 8.36438 9.71902 8.0254 9.29657 8.02539ZM18.2018 8.02539C17.7796 8.02565 17.4372 8.36453 17.4372 8.78223C17.4374 9.19973 17.7797 9.53783 18.2018 9.53809C18.6242 9.53809 18.9672 9.19989 18.9675 8.78223C18.9675 8.36437 18.6243 8.02539 18.2018 8.02539Z"
        //                                             fill="#17120F"
        //                                         />
        //                                     </svg>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                     </div>
        //                     <CheckoutButton hasItems={hasItems} cart={cart} />
        //                     <div className={s.detailRow} role="row">
        //                         <div className={s.benefits}>
        //                             {globalSettings?.benefits?.map((benefit, index) => {
        //                                 if (!benefit?.content) return null;

        //                                 invariant(
        //                                     benefit.content.__typename ===
        //                                     "GlobalSettingsCartDrawerBenefit",
        //                                     "Expected GlobalSettingsCartDrawerBenefit content type",
        //                                 );

        //                                 return (
        //                                     <Fragment key={index}>
        //                                         <span>
        //                                             <CheckCircleIcon size={15} />
        //                                             <p>{benefit.content.text}</p>
        //                                         </span>
        //                                         {index <
        //                                             (globalSettings?.benefits?.length ?? 0) - 1 && (
        //                                                 <div className={s.seperator} />
        //                                             )}
        //                                     </Fragment>
        //                                 );
        //                             })}
        //                         </div>
        //                     </div>
        //                 </footer>
        //                 <CartTrackingEvents cart={cart} />
        //             </>
        //         ) : (
        //             <div className={s.emptyCart}>
        //                 <FishIcon className={s.emptyCartIcon} />
        //                 <Text size="medium" muted>
        //                     Your cart is empty
        //                 </Text>
        //             </div>
        //         )} */}
        //     </>
        // </Drawer>
    );
}
