import { SpecialistsTable } from "@/components/specialists/specialists-table";

export default function SpecialistsPage() {
  return (
    <div className="rounded-[3px] border border-border bg-card px-6 py-5">
      <div>
        <h1 className="font-heading text-[18px] font-bold text-brand-text">
          Specialists
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and publish your services for Clients & Companies
        </p>
      </div>

      <SpecialistsTable />
    </div>
  );
}
