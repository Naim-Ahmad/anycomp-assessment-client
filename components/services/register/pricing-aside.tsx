import { PriceRow } from "./price-row";

export function PricingAside() {
  return (
    <aside className="sticky top-6 h-fit">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium mb-1">Professional Fee</h3>

        <p className="text-xs text-slate-500 mb-4">
          Set a rate for your service
        </p>

        <div className="text-3xl font-semibold mb-6">RM 1,800</div>

        <div className="space-y-2 text-sm">
          <PriceRow label="Base price" value="RM 1,800" />
          <PriceRow label="Service processing fee" value="RM 540" />
          <PriceRow label="Total" value="RM 2,340" />
          <PriceRow label="Your returns" value="RM 1,800" strong />
        </div>
      </div>
    </aside>
  );
}
