"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Tabs, TabList, Tab, TabPanel, type Key } from "react-aria-components";
import s from "./account-page.module.css";

type Props = {
	ordersCount: number;
	orders: ReactNode;
	details: ReactNode;
	addresses: ReactNode;
	signOut: ReactNode;
};

export default function AccountTabs({ ordersCount, orders, details, addresses, signOut }: Props) {
	const [selectedKey, setSelectedKey] = useState<Key>("orders");
	const tabListRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const list = tabListRef.current;
		const indicator = indicatorRef.current;
		if (!list || !indicator) return;

		const updateIndicator = () => {
			const selected = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
			if (!selected) return;
			indicator.style.width = `${selected.offsetWidth}px`;
			indicator.style.transform = `translateX(${selected.offsetLeft}px)`;
		};
		updateIndicator();
		const observer = new ResizeObserver(updateIndicator);
		observer.observe(list);
		for (const tab of list.querySelectorAll('[role="tab"]')) observer.observe(tab);
		return () => observer.disconnect();
	}, [selectedKey]);

	return (
		<Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} className={s.tabs}>
			<div className={s.tabBar}>
				<div className={s.tabNavigation}>
					<TabList ref={tabListRef} aria-label="Account" className={s.tabList}>
						<Tab id="orders" className={s.tab}>
							Orders <span>{ordersCount}</span>
						</Tab>
						<Tab id="details" className={s.tab}>
							Personal details
						</Tab>
						<Tab id="addresses" className={s.tab}>
							Addresses
						</Tab>
					</TabList>
					<div ref={indicatorRef} className={s.tabIndicator} aria-hidden="true" />
				</div>
				<div className={s.accountActions}>{signOut}</div>
			</div>
			<TabPanel id="orders" className={s.tabPanel}>
				{orders}
			</TabPanel>
			<TabPanel id="details" className={s.tabPanel}>
				{details}
			</TabPanel>
			<TabPanel id="addresses" className={s.tabPanel}>
				{addresses}
			</TabPanel>
		</Tabs>
	);
}
