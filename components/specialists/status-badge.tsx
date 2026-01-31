import { cn } from "@/lib/utils";

type Status =
  | "Approved"
  | "Under Review"
  | "Rejected"
  | "Published"
  | "Not Published";

export function StatusBadge({ type }: { type: Status }) {
  const styles = {
    Approved: "bg-emerald-100 text-emerald-700",
    "Under Review": "bg-sky-100 text-sky-700",
    Rejected: "bg-rose-100 text-rose-700",
    Published: "bg-emerald-600 text-white",
    "Not Published": "bg-red-600 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[type],
      )}
    >
      {type}
    </span>
  );
}
