import { SpecialistsTable } from "@/components/specialists/specialists-table";

export default function SpecialistsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Specialists</h1>
        <p className="text-sm text-muted-foreground">
          Create and publish your services for Clients & Companies
        </p>
      </div>

      <SpecialistsTable />
    </div>
  );
}
