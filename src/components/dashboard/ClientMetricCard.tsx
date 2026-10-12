import type { LucideIcon } from "lucide-react";

interface ClientMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ClientMetricCard({ icon: Icon, label, value }: ClientMetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-surface p-5 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 break-words text-base font-extrabold leading-6 text-ink sm:text-lg" title={value}>{value}</p>
    </div>
  );
}
