"use client";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import React, { useId, useImperativeHandle, useRef } from "react";
import s from "./select.module.css";

interface Props
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id" | "ref"> {
  label: string;
  id?: string;
  block?: boolean;
  ref?: React.Ref<HTMLSelectElement>;
  options: { value: string; label: string }[];
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function Select({
  label,
  block,
  id,
  ref,
  options,
  placeholder,
  isInvalid,
  errorMessage,
  ...props
}: Props) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const generatedId = useId();
  useImperativeHandle(ref, () => selectRef.current!, []);

  return (
    <div>
    <div className={clsx(s.selectField)} data-block={block} data-invalid={isInvalid}>
      <label className={s.label} htmlFor={id || generatedId}>
        {label}
      </label>
      <select
        className={s.select}
        ref={selectRef}
        id={id || generatedId}
        {...props}
        aria-invalid={isInvalid}
        aria-describedby={`${id || generatedId}-error`}
      >
        <option value="" disabled hidden></option>
        {options?.map((option) => (
          <option key={option.label + "_" + option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={s.chevron}>
        <ChevronDown width={16} />
      </div>
    </div>
    {isInvalid && errorMessage && (
      <div className={s.errorMessage} id={`${id || generatedId}-error`}>
        {errorMessage}
      </div>
    )}
    </div>
  );
}
