import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary: "bg-surface text-ink ring-1 ring-inset ring-ink/10 hover:bg-ink/5",
};

export function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
