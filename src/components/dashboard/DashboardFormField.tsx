import type { ReactNode } from "react";

interface DashboardFormFieldProps {
  label: string;
  children: ReactNode;
}

export function DashboardFormField({ label, children }: DashboardFormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      {children}
    </label>
  );
}
