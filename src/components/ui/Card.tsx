import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-surface p-5 shadow-sm ring-1 ring-inset ring-ink/5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
