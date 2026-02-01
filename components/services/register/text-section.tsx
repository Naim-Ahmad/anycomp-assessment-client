export function TextSection({ title, text }: { title: string; text: string }) {
  return (
    <div className="pb-4 border-b border-slate-200">
      <h3 className="text-sm font-medium text-slate-900 mb-1">{title}</h3>

      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
