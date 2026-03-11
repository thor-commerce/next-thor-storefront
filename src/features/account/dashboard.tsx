"use client";

import { AccountDashboardQuery } from "@/__generated__/thor/graphql";
import Button from "@/components/button/button";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import { useActionState, useEffect } from "react";
import NavbarSignOutButton from "../navbar/navbar-profile/navbar-sign-out";
import { updateProfile, type UpdateProfileState } from "./profile-actions";
import s from "./dashboard.module.css";
import TextInput from "@/components/text-input/text-input";

type Props = {
  customer: NonNullable<AccountDashboardQuery["customer"]>;
};

const formatAddress = (address: {
  address1?: string | null;
  address2?: string | null;
  postalCode?: string | null;
  city?: string | null;
  state?: string | null;
  countryCode?: string | null;
}) =>
  [address.address1, address.address2, [address.postalCode, address.city].filter(Boolean).join(" "), address.state, address.countryCode]
    .filter(Boolean)
    .join(", ");

export default function AccountDashboard({ customer }: Props) {
  const groups = mapEdgesToItems(customer.customerGroups);
  const orders = mapEdgesToItems(customer.orders);
  const addresses = mapEdgesToItems(customer.addresses);
  const defaultShippingId = customer.defaultShippingAddress?.id;
  const defaultBillingId = customer.defaultBillingAddress?.id;

  const [state, formAction, isPending] = useActionState<UpdateProfileState, FormData>(updateProfile, null);

  useEffect(() => {
    if (state?.success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state?.success]);

  return (
    <div className={s.page}>
      <div className={s.header}>
        <div>
          <h1 className={s.title}>Account</h1>
          <p className={s.subtitle}>
            Review your profile, recent orders, saved addresses, and membership details in one place.
          </p>
        </div>
        <div className={s.headerActions}>
          <NavbarSignOutButton />
        </div>
      </div>

      <div className={s.stats}>
        <div className={s.stat}>
          <div className={s.statValue}>{customer.ordersCount}</div>
          <div className={s.statLabel}>Orders placed</div>
        </div>
        <div className={s.stat}>
          <div className={s.statValue}>{customer.addresses.totalCount}</div>
          <div className={s.statLabel}>Saved addresses</div>
        </div>
        <div className={s.stat}>
          <div className={s.statValue}>{groups.length}</div>
          <div className={s.statLabel}>Customer groups</div>
        </div>
      </div>

      <div className={s.grid}>
        <div className={s.mainColumn}>
          <section className={s.panel}>
            <h2 className={s.panelTitle}>Profile</h2>
            <p className={s.panelMeta}>Update the details tied to your customer account.</p>

            <form action={formAction} className={s.form}>
              <div className={s.formRow}>
                <TextInput
                  label="First name"
                  name="firstName"
                  defaultValue={customer.firstName ?? ""}
                  block
                />
                <TextInput
                  label="Last name"
                  name="lastName"
                  defaultValue={customer.lastName ?? ""}
                  block
                />
              </div>
              <TextInput
                label="Email"
                type="email"
                name="email"
                defaultValue={customer.email ?? ""}
                block
              />

              {state?.error && <p className={`${s.message} ${s.error}`}>{state.error}</p>}
              {state?.success && <p className={`${s.message} ${s.success}`}>Profile updated.</p>}

              <Button type="submit" loading={isPending} style={{ width: "auto" }}>
                Save changes
              </Button>
            </form>
          </section>

          <section className={s.panel}>
            <h2 className={s.panelTitle}>Recent orders</h2>
            <p className={s.panelMeta}>Your five most recent orders.</p>

            {orders.length ? (
              <div className={s.orderList}>
                {orders.map((order) => (
                  <div key={order.id} className={s.orderItem}>
                    <div className={s.orderHeader}>
                      <div className={s.orderNumber}>Order #{order.orderNumber}</div>
                      <div className={s.orderDate}>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(order.createdAt))}
                      </div>
                    </div>
                    <div className={s.orderMeta}>
                      <div>
                        <div className={s.orderMetaLabel}>Status</div>
                        <div className={s.orderMetaValue}>{order.orderState.replaceAll("_", " ")}</div>
                      </div>
                      <div>
                        <div className={s.orderMetaLabel}>Payment</div>
                        <div className={s.orderMetaValue}>{order.paymentState.replaceAll("_", " ")}</div>
                      </div>
                      <div>
                        <div className={s.orderMetaLabel}>Shipment</div>
                        <div className={s.orderMetaValue}>{order.shipmentState.replaceAll("_", " ")}</div>
                      </div>
                      <div>
                        <div className={s.orderMetaLabel}>Total</div>
                        <div className={s.orderMetaValue}>{formatMoney({ money: order.total })}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={s.empty}>No orders yet.</p>
            )}
          </section>
        </div>

        <div className={s.sideColumn}>
          <section className={s.panel}>
            <h2 className={s.panelTitle}>Customer groups</h2>
            {groups.length ? (
              <div className={s.groupList}>
                {groups.map((group) => (
                  <div key={group.id} className={s.groupItem}>
                    {group.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className={s.empty}>No groups assigned.</p>
            )}
          </section>

          <section className={s.panel}>
            <h2 className={s.panelTitle}>Saved addresses</h2>
            <p className={s.panelMeta}>Default billing and shipping details plus other saved addresses.</p>

            {addresses.length ? (
              <div className={s.addressList}>
                {addresses.map((address) => (
                  <div key={address.id} className={s.addressItem}>
                    <div className={s.addressHeader}>
                      <div className={s.addressName}>
                        {address.name ||
                          [address.firstName, address.lastName].filter(Boolean).join(" ") ||
                          "Address"}
                      </div>
                      <div className={s.addressFlags}>
                        {[
                          address.id === defaultShippingId ? "Default shipping" : null,
                          address.id === defaultBillingId ? "Default billing" : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    </div>
                    <div className={s.addressBody}>
                      <div>{formatAddress(address)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={s.empty}>No saved addresses yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
