import { cn } from "@/lib/utils";

type Status =
  | "Approved"
  | "Under Review"
  | "Rejected"
  | "Published"
  | "Not Published";

export function StatusBadge({ type }: { type: Status }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium",
        type === "Approved" && "bg-green-100 text-green-700",
        type === "Under Review" && "bg-blue-100 text-blue-700",
        type === "Rejected" && "bg-red-100 text-red-700",
        type === "Published" && "bg-green-500 text-white",
        type === "Not Published" && "bg-red-500 text-white",
      )}
    >
      {type}
    </span>
  );
}
