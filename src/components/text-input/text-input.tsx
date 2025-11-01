/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  props,
  ref
) {
  const {
    label,
    className,
    inputClassName,
    description,
    errorMessage,
    block,
    // Extract common controlled field props that need to be applied to <Input />
    value,
    defaultValue,
    onChange,
    onBlur,
    name,
    isRequired,
    ...rest
  } = props as any; // (loosening for controlled prop extraction)

  const inputControlProps: Record<string, any> = {};
  if (name !== undefined) inputControlProps.name = name;
  if (onChange) inputControlProps.onChange = onChange;
  if (onBlur) inputControlProps.onBlur = onBlur;
  if (value !== undefined) inputControlProps.value = value;
  else if (defaultValue !== undefined) inputControlProps.defaultValue = defaultValue;

  return (
    <TextField
      className={clsx(className, s.textField)}
      data-block={block}
      isRequired={isRequired}
      {...rest}
    >
      <Label className={s.label}>
        <span className={s.placeholder}>
          {label} {isRequired && "*"}
        </span>
      </Label>
      <span className={s.inputWrapper}>
        <Input
          ref={ref}
            /* Forward controlled form props to the actual input element */
          {...inputControlProps}
          className={clsx(s.input, inputClassName)}
          placeholder=" "
        />
      </span>
      {description && <Text slot="description">{description}</Text>}
      <FieldError className={s.error}>{errorMessage}</FieldError>
    </TextField>
  );
});
