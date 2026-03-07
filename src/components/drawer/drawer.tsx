"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, type FC, type ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import s from "./drawer.module.css";

type Props = {
  heading: React.ReactNode;
  closeButton?: React.ReactNode;
  triggerElement: ReactNode;
  AriaDrawerHeight?: number;
  direction?: "top" | "bottom" | "left" | "right";
  overrideOpen?: boolean;
  toggleDrawerCallback?: (toggleAriaDrawer: () => void) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: ReactNode | ((params: { close: () => void }) => ReactNode);
  modalClassName?: string;
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;

export type DrawerProps = Props & NativeAttrs;

const Drawer: FC<DrawerProps> = ({
  heading,
  closeButton,
  triggerElement,
  toggleDrawerCallback,
  overrideOpen,
  isOpen: controlledIsOpen,
  onOpenChange,
  children,
  modalClassName,
}) => {
  const [internalIsOpen, setInternalOpen] = useState(overrideOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  useEffect(() => {
    // safari input blur fix
    // you can safely remove this when safari has fixed the issue
    if (!isOpen) {
      const focusedElement = document.activeElement as HTMLElement | null;
      if (
        focusedElement &&
        (focusedElement.tagName === "INPUT" ||
          focusedElement.tagName === "TEXTAREA" ||
          focusedElement.isContentEditable)
      ) {
        focusedElement.blur();
      }
    }
  }, [isOpen]);

  // Function to toggle the isOpen state
  const toggleAriaDrawer = () => setOpen(!isOpen);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // Enhanced trigger element with onClick prop
  const enhancedTriggerElement = React.cloneElement(
    triggerElement as React.ReactElement<{ onClick?: () => void }>,
    {
      onClick: toggleAriaDrawer,
    },
  );
  if (toggleDrawerCallback) toggleDrawerCallback(toggleAriaDrawer);

  return (
    <DialogTrigger>
      {enhancedTriggerElement}
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
        <Modal className={clsx(s.modal, modalClassName)}>
          <Dialog className={s.dialog}>
            <header className={s.drawerHeader}>
              <Heading>{heading}</Heading>

              <button
                onClick={toggleAriaDrawer}
                type="button"
                className={s.closeButton}
              >
                {closeButton}
              </button>
            </header>
            {typeof children === "function"
              ? children({ close: toggleAriaDrawer })
              : children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

Drawer.displayName = "AriaDrawer";
export default Drawer;
