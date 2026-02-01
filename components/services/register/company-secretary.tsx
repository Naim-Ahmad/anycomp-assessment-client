// _components/company-secretary.tsx

export function CompanySecretary() {
  return (
    <div className="rounded-xl border border-slate-200 p-5 flex gap-4">
      <div className="h-10 w-10 rounded-full bg-slate-200" />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium">Grace Lim</h4>
          <span className="text-xs text-green-600">● Online</span>
        </div>

        <div className="flex gap-2 my-2">
          <span className="text-xs bg-slate-100 px-2 py-0.5 rounded">
            Certified Company Secretary
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          A company secretary ensures compliance with statutory requirements and
          plays a key role in corporate governance and statutory filings.
        </p>
      </div>
    </div>
  );
}
