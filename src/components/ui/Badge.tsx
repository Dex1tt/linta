import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "neutral" | "confirmed" | "pending" | "cancelled" | "paid";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-ink/5 text-ink",
  confirmed: "bg-status-confirmed/10 text-status-confirmed",
  pending: "bg-status-pending/10 text-status-pending",
  cancelled: "bg-status-cancelled/10 text-status-cancelled",
  paid: "bg-status-paid/10 text-status-paid",
};

export function Badge({
  children,
  className = "",
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
