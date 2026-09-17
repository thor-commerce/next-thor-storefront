"use client";

import { useId, useState, type ComponentProps } from "react";
import s from "./auth-form.module.css";

type Props = Omit<ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "id"> & { label: string };

export default function AuthField({ label, type = "text", ...props }: Props) {
	const id = useId();
	const [value, setValue] = useState("");
	const [visible, setVisible] = useState(false);
	const isPassword = type === "password";
	return (
		<div className={s.field}>
			<label htmlFor={id}>{label}</label>
			<div className={isPassword ? s.passwordField : undefined}>
				<input
					{...props}
					id={id}
					type={isPassword && visible ? "text" : type}
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				{isPassword && (
					<button
						type="button"
						className={s.passwordToggle}
						onClick={() => setVisible(!visible)}
						aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
						aria-pressed={visible}
					>
						{visible ? "Hide" : "Show"}
					</button>
				)}
			</div>
		</div>
	);
}
