import ThorImage from "@/components/thor-image/thor-image";
import Navigation from "@/components/navigation/navigation";
import type { AccountDashboardQuery } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { formatMoney } from "@/utils/money";
import AccountTabs from "./account-tabs";
import { signOut } from "./actions";
import s from "./account-page.module.css";

type Customer = NonNullable<AccountDashboardQuery["customer"]>;
type Address = Customer["defaultShippingAddress"];

function AddressDetails({ address }: { address: Address }) {
	if (!address) return <p className={s.muted}>No default address saved yet.</p>;
	return (
		<address className={s.address}>
			<span>{[address.firstName, address.lastName].filter(Boolean).join(" ")}</span>
			{address.company && <span>{address.company}</span>}
			<span>{address.address1}</span>
			{address.address2 && <span>{address.address2}</span>}
			<span>{[address.postalCode, address.city].filter(Boolean).join(" ")}</span>
			{address.state && <span>{address.state}</span>}
			<span>{address.countryCode}</span>
			{address.phone && <span>{address.phone}</span>}
		</address>
	);
}

const statusLabel = (value: string) =>
	value
		.toLowerCase()
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

export default function AccountPage({ customer, hasCursor }: { customer: Customer; hasCursor: boolean }) {
	const orders = customer.orders.nodes ?? [];
	const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ");
	return (
		<div className={s.page}>
			<header className={s.header}>
				<p className={s.eyebrow}>YOUR NORDFORM</p>
				<h1>{customer.firstName ? `Welcome back, ${customer.firstName}.` : "Welcome back."}</h1>
			</header>
			<AccountTabs
				ordersCount={customer.ordersCount}
				signOut={
					<form action={signOut}>
						<button className={s.signOut}>Sign out</button>
					</form>
				}
				orders={
					<section id="orders" className={s.section} aria-labelledby="orders-title">
						<div className={s.sectionHeading}>
							<h2 id="orders-title">Your orders</h2>
							<span className={s.muted}>{customer.ordersCount} total</span>
						</div>
						{orders.length ? (
							<ul className={s.orders}>
								{orders.map((order) => (
									<li key={order.id} className={s.order}>
										<div className={s.orderHeading}>
											<div>
												<h3>Order #{order.orderNumber}</h3>
												<time className={s.muted} dateTime={order.createdAt}>
													{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(
														new Date(order.createdAt),
													)}
												</time>
											</div>
											<div className={s.orderAmount}>
												<strong>{formatMoney({ money: order.total })}</strong>
												<span className={s.muted}>
													{order.lineItemsQuantity} {order.lineItemsQuantity === 1 ? "item" : "items"}
												</span>
											</div>
										</div>
										<div className={s.orderStatus}>
											<span>{statusLabel(order.orderState)}</span>
											<span className={s.muted}>Delivery: {statusLabel(order.shipmentState)}</span>
											<span className={s.muted}>Payment: {statusLabel(order.paymentState)}</span>
										</div>
										<ul className={s.orderProducts}>
											{(order.lineItems.nodes ?? []).map((item) => (
												<li key={item.id} className={s.orderProduct}>
													<div className={s.productImage}>
														{item.variant?.image?.src ? (
															<ThorImage
																src={item.variant.image.src}
																alt={item.productName}
																fill
																sizes="(max-width: 480px) 96px, 160px"
															/>
														) : (
															<span className={s.muted}>No image</span>
														)}
													</div>
													<div className={s.productDetails}>
														<h4>{item.productName}</h4>
														{item.variantName && <p className={s.muted}>{item.variantName}</p>}
														<p className={s.muted}>Quantity: {item.quantity}</p>
													</div>
												</li>
											))}
										</ul>
										{order.lineItems.pageInfo.hasNextPage && (
											<p className={s.muted}>Showing the first 4 products in this order.</p>
										)}
									</li>
								))}
							</ul>
						) : (
							<div className={s.empty}>
								<h3>{hasCursor ? "No more orders." : "Your next favourite is waiting."}</h3>
								<p className={s.muted}>
									{hasCursor
										? "Return to your most recent orders."
										: "Once you place an order, you can find it here."}
								</p>
								<Navigation href={hasCursor ? "/account" : "/products"} className={s.shopButton}>
									{hasCursor ? "Latest orders" : "Explore the collection"}
								</Navigation>
							</div>
						)}
						<nav className={s.pagination} aria-label="Order history pages">
							{hasCursor && <Navigation href="/account#orders">Latest orders</Navigation>}
							{customer.orders.pageInfo.hasNextPage && customer.orders.pageInfo.endCursor && (
								<Navigation
									href={`/account?${new URLSearchParams({ after: customer.orders.pageInfo.endCursor })}#orders`}
								>
									Older orders
								</Navigation>
							)}
						</nav>
					</section>
				}
				details={
					<section id="details" className={s.section} aria-labelledby="details-title">
						<h2 id="details-title">Personal details</h2>
						<dl className={s.details}>
							<div>
								<dt>Name</dt>
								<dd>{name || "Not provided"}</dd>
							</div>
							<div>
								<dt>Email address</dt>
								<dd>{customer.email || "Not provided"}</dd>
							</div>
						</dl>
					</section>
				}
				addresses={
					<section id="addresses" className={s.section} aria-labelledby="addresses-title">
						<h2 id="addresses-title">Your addresses</h2>
						<div className={s.addresses}>
							<div>
								<h3>Default shipping address</h3>
								<AddressDetails address={customer.defaultShippingAddress} />
							</div>
							<div>
								<h3>Default billing address</h3>
								<AddressDetails address={customer.defaultBillingAddress} />
							</div>
						</div>
					</section>
				}
			/>
		</div>
	);
}
