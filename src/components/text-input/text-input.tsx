"use client";
import { forwardRef } from "react";
import clsx from "clsx";
import {
	Input,
	Label,
	TextField,
	TextFieldProps,
	ValidationResult,
	Text,
	FieldError,
} from "react-aria-components";

import s from "./text-input.module.css";

export interface TextInputProps extends TextFieldProps {
	label?: string;
	block?: boolean;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	inputClassName?: string;
}

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref) {
	const { label, className, inputClassName, description, errorMessage, block, isRequired, ...rest } = props;

	return (
		<TextField className={clsx(className, s.textField)} data-block={block} isRequired={isRequired} {...rest}>
			<Label className={s.label}>
				{label} {isRequired && "*"}
			</Label>
			<span className={s.inputWrapper}>
				<Input ref={ref} className={clsx(s.input, inputClassName)} />
			</span>
			{description && <Text slot="description">{description}</Text>}
			<FieldError className={s.error}>{errorMessage}</FieldError>
		</TextField>
	);
});
