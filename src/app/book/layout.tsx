import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/ui/BrandMark";

export const metadata: Metadata = {
  title: "Онлайн-запись — Linta",
  description: "Выберите услугу, мастера и удобное время для визита.",
};

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Linta — главная" className="mx-auto flex min-h-11 w-fit items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <BrandMark className="h-10 w-10" />
          <span className="text-2xl font-extrabold tracking-tight text-ink">Linta</span>
        </Link>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-surface p-5 shadow-md sm:mt-8 sm:p-8">{children}</div>
        <p className="mt-5 text-center text-xs text-slate-600">Безопасная онлайн-запись через Linta</p>
      </div>
    </main>
  );
}
