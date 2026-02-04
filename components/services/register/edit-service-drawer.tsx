"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ServiceImagesUpload, UploadedImage } from "./ServiceImageUpload";

import { useGetServicesQuery } from "@/store/api/services.endpoints";
import { useGetSpecialistByIdQuery } from "@/store/api/specialistsApi";

/* ---------- Types ---------- */

type EditServiceForm = {
  title: string;
  description: string;
  estimatedDays: number;
  price: number;
  offerings: string[];
};

type Errors = Partial<Record<keyof EditServiceForm, string>>;

type ExistingImage = {
  id: string;
  public_url: string;
};

type NewImage = {
  file: File;
  preview: string;
};

type ImagesState = {
  existing: ExistingImage[];
  new: NewImage[];
};

/* ---------- Component ---------- */

export function EditServiceDrawer({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string | null;
}) {
  const isEditMode = Boolean(id);

  const { data: specialistData, isFetching } = useGetSpecialistByIdQuery(id!, {
    skip: !id,
  });

  const { data: servicesData } = useGetServicesQuery();

  const services = servicesData?.data ?? [];

  const [form, setForm] = useState<EditServiceForm>({
    title: "",
    description: "",
    estimatedDays: 0,
    price: 0,
    offerings: [],
  });

  const [images, setImages] = useState<ImagesState>({
    existing: [],
    new: [],
  });

  const [errors, setErrors] = useState<Errors>({});

  /* ---------- Edit mode hydrate ---------- */
  useEffect(() => {
    if (!specialistData?.data) return;

    const s = specialistData.data;

    setForm({
      title: s.title ?? "",
      description: s.description ?? "",
      estimatedDays: s.estimatedDays ?? 0,
      price: s.price ?? 0,
      offerings: s.offerings ?? [],
    });

    setImages({
      existing: s.media ?? [], // [{ id, url }]
      new: [],
    });
  }, [specialistData]);

  /* ---------- Image adapter ---------- */

  const uiImages: UploadedImage[] = [
    ...images.existing.map((img) => ({
      preview: img.public_url,
      id: img.id,
    })),
    ...images.new.map((img) => ({
      preview: img.preview,
      file: img.file,
    })),
  ];

  console.log(uiImages);

  const handleImagesChange = (next: any[]) => {
    const existing: ExistingImage[] = [];
    const newlyAdded: NewImage[] = [];

    next.forEach((img) => {
      if (img.file) {
        newlyAdded.push({
          file: img.file,
          preview: img.preview,
        });
      } else if (img.id) {
        existing.push({
          id: img.id,
          url: img.preview,
        });
      }
    });

    setImages({ existing, new: newlyAdded });
  };

  /* ---------- Helpers ---------- */

  const setField = <K extends keyof EditServiceForm>(
    key: K,
    value: EditServiceForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const addOffering = (id: string) => {
    if (!form.offerings.includes(id)) {
      setForm((prev) => ({
        ...prev,
        offerings: [...prev.offerings, id],
      }));
    }
  };

  const removeOffering = (id: string) => {
    setForm((prev) => ({
      ...prev,
      offerings: prev.offerings.filter((o) => o !== id),
    }));
  };

  /* ---------- Validation ---------- */

  const validate = () => {
    const e: Errors = {};

    if (!form.title.trim()) e.title = "Title is required";
    else if (form.title.length < 3) e.title = "Minimum 3 characters";

    if (!form.description.trim()) e.description = "Description is required";
    else if (form.description.length > 500)
      e.description = "Max 500 characters";

    if (form.estimatedDays <= 0) e.estimatedDays = "Must be greater than 0";

    if (form.price <= 0) e.price = "Must be greater than 0";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------- Submit ---------- */

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("estimatedDays", String(form.estimatedDays));
    formData.append("price", String(form.price));
    formData.append("offerings", JSON.stringify(form.offerings));

    formData.append(
      "keepImages",
      JSON.stringify(images.existing.map((i) => i.id)),
    );

    images.new.forEach((img) => {
      formData.append("images", img.file);
    });

    if (isEditMode) {
      console.log("UPDATE /specialists/:id", id, formData);
    } else {
      console.log("CREATE /specialists", formData);
    }

    onClose();
  };

  /* ---------- UI ---------- */

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-[420px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <h2 className="font-semibold">
            {isEditMode ? "Edit Service" : "Create Service"}
          </h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Body */}
        <form
          onSubmit={onSubmit}
          className={cn(
            "px-6 py-5 space-y-5 overflow-y-auto h-[calc(100vh-128px)]",
            isFetching && "opacity-60 pointer-events-none",
          )}
        >
          <Field label="Title" error={errors.title}>
            <Input
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </Field>

          <Field label="Description" error={errors.description}>
            <Textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-right text-xs text-muted-foreground">
              {form.description.length} / 500
            </p>
          </Field>

          <Field label="Estimated Days" error={errors.estimatedDays}>
            <Input
              type="number"
              value={form.estimatedDays}
              onChange={(e) =>
                setField("estimatedDays", Number(e.target.value))
              }
            />
          </Field>

          <Field label="Price" error={errors.price}>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setField("price", Number(e.target.value))}
            />
          </Field>

          {/* Offerings */}
          <Field label="Additional Offerings">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {form.offerings.length
                    ? `${form.offerings.length} selected`
                    : "Select offerings"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[350px] p-0">
                <Command>
                  <CommandInput placeholder="Search offerings..." />
                  <CommandEmpty>No offering found.</CommandEmpty>

                  <CommandGroup>
                    {services.map((service) => {
                      const selected = form.offerings.includes(service.id);

                      return (
                        <CommandItem
                          key={service.id}
                          onSelect={() => {
                            selected
                              ? removeOffering(service.id)
                              : addOffering(service.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {service.title}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected chips */}
            {form.offerings.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.offerings.map((id) => {
                  const item = services.find((s) => s.id === id);
                  if (!item) return null;

                  return (
                    <span
                      key={id}
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-slate-100"
                    >
                      {item.title}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeOffering(id)}
                      />
                    </span>
                  );
                })}
              </div>
            )}
          </Field>

          {/* Images */}
          <ServiceImagesUpload
            value={uiImages}
            onChange={handleImagesChange}
            max={3}
          />

          {/* Footer */}
          <div className="pt-4 border-t flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

/* ---------- Field Helper ---------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
