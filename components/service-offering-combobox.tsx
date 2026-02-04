"use client";

import {
  Combobox,
  ComboboxChips,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { useGetServicesQuery } from "@/store/api/services.endpoints";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ServiceOfferingCombobox({ value, onChange }: Props) {
  const { data, isLoading } = useGetServicesQuery();

  const services = data?.data ?? [];

  console.log(services);

  return (
    <Combobox
      multiple
      value={value}
      onValueChange={onChange}
      disabled={isLoading}
    >
      <ComboboxChips placeholder="Select service offerings…" />

      <ComboboxInput placeholder="Search services…" />

      <ComboboxList>
        {services.map((service) => (
          <ComboboxItem
            key={service.id}
            value={service.id}
            label={service.title}
          >
            <div>
              <p className="font-medium">{service.title}</p>
              {service.description && (
                <p className="text-xs text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </ComboboxItem>
        ))}
      </ComboboxList>
    </Combobox>
  );
}
