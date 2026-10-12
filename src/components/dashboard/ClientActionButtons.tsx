"use client";

import Link from "next/link";
import { CalendarPlus, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function ClientActionButtons() {
  const showDevelopmentNotice = () => toast.info("Эта функция в разработке");

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent sm:w-auto"
        onClick={showDevelopmentNotice}
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        Написать
      </button>
      <Link
        href="/dashboard/calendar"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90 sm:w-auto"
        onClick={showDevelopmentNotice}
      >
        <CalendarPlus aria-hidden="true" className="h-4 w-4" />
        Записать на услугу
      </Link>
    </div>
  );
}
