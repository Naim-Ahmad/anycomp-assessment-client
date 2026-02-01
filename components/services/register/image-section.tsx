export function ImageSection() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div
        className="h-[200px] rounded-lg border border-dashed border-slate-300
                   flex items-center justify-center text-sm text-slate-400"
      >
        Upload image (PNG, JPG)
      </div>

      <div className="grid grid-rows-2 gap-4">
        <div className="h-[96px] rounded-lg bg-slate-100" />
        <div className="h-[96px] rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}
