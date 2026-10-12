import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-5 text-center ${compact ? "py-8" : "py-12 sm:py-16"} ${className}`}
    >
      <Icon
        aria-hidden="true"
        className={`${compact ? "h-12 w-12" : "h-14 w-14"} text-ink/20`}
        strokeWidth={1.35}
      />
      <p className="mt-4 text-base font-extrabold leading-6 text-ink">{title}</p>
      {description ? (
        <p className="mt-1.5 max-w-md text-sm leading-6 text-ink/70">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
