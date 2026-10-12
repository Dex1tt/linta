import type { LucideIcon } from "lucide-react";

interface AppointmentDetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function AppointmentDetailRow({ icon: Icon, label, value }: AppointmentDetailRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-slate-500">{label}</span>
        <span className="block truncate text-sm font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}
