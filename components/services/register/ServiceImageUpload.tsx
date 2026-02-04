"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

const MAX_SIZE_MB = 4;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type UploadedImage = {
  file?: File; // edit-mode এ backend image হলে undefined হতে পারে
  preview: string; // URL or objectURL
};

type Props = {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  max?: number;
};

export function ServiceImagesUpload({ value, onChange, max = 3 }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const images = value;
  const remainingSlots = max - images.length;

  /* ---------- Validation ---------- */
  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Accepted formats: JPG, JPEG, PNG or WEBP";
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return "Maximum file size is 4MB per image";
    }

    return null;
  };

  /* ---------- Add files ---------- */
  const addFiles = (files: FileList | File[]) => {
    if (remainingSlots <= 0) return;

    const incoming = Array.from(files).slice(0, remainingSlots);
    const next: UploadedImage[] = [];

    for (const file of incoming) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        continue;
      }

      next.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    if (next.length > 0) {
      onChange([...images, ...next]);
      setError(null);
    }
  };

  /* ---------- Events ---------- */
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
      e.target.value = "";
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const img = images[index];
    if (img?.file && img.preview.startsWith("blob:")) {
      URL.revokeObjectURL(img.preview);
    }

    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Service Images (up to {max})
      </label>

      {/* Upload box */}
      {images.length < max && (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            "border-2 border-dashed rounded-md p-8 cursor-pointer transition",
            isDragging ? "border-primary bg-primary/5" : "border-muted",
          )}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <UploadCloud className="h-10 w-10 text-primary" />

            <Button type="button" size="sm">
              Browse
            </Button>

            <p className="text-sm text-muted-foreground">
              or <span className="font-medium">Drag files</span> to upload
            </p>

            <div className="flex justify-between w-full text-xs text-muted-foreground mt-4">
              <span>JPG, JPEG, PNG, WEBP</span>
              <span>Max 4MB each</span>
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={onInputChange}
          />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Preview list */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-md p-3"
            >
              <img
                src={img.preview}
                alt="preview"
                className="h-16 w-16 rounded object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">
                  {img.file?.name ?? "Existing image"}
                </p>
                {img.file && (
                  <p className="text-xs text-muted-foreground">
                    {(img.file.size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                )}
              </div>

              <Trash2
                className="h-5 w-5 text-red-500 cursor-pointer"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
