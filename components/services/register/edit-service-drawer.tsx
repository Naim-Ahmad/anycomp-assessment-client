import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";

export function EditServiceDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="
          w-[420px]
          max-w-none
          p-0
          bg-white
          border-l border-slate-200
          shadow-xl
          rounded-none
        "
      >
        {/* Header */}

        <DialogTitle>
          <SheetHeader>Edit Service</SheetHeader>
        </DialogTitle>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto h-[calc(100vh-120px)]">
          <Field label="Title">
            <Input />
          </Field>

          <Field label="Description">
            <Textarea className="min-h-[100px]" />
            <p className="text-xs text-slate-400 mt-1">0 / 500 words</p>
          </Field>

          <Field label="Estimated Completion Time (Days)">
            <Input type="number" />
          </Field>

          <Field label="Price">
            <Input placeholder="MYR 0.00" />
          </Field>

          <Field label="Additional Offerings">
            <div className="flex flex-wrap gap-2">
              <Tag>Company Secretary Subscription</Tag>
              <Tag>eSignature</Tag>
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Confirm</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ---------- Helpers ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
      {children}
    </span>
  );
}
