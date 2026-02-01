import { Textarea } from "@/components/ui/textarea";

export function FormSection({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 mb-2">{title}</h3>
      <Textarea
        placeholder={placeholder}
        className="min-h-[96px] resize-none"
      />
    </div>
  );
}
