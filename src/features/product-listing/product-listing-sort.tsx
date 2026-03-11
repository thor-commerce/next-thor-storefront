"use client";

import Select from "@/components/select/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  value: string;
  defaultValue: string;
  options: { value: string; label: string }[];
};

export default function ProductListingSort({ value, defaultValue, options }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue === defaultValue) {
      params.delete("sort");
    } else {
      params.set("sort", nextValue);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <Select
      label="Sort by"
      name="sort"
      block
      value={value}
      options={options.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
}
