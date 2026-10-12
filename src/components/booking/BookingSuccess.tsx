"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function BookingSuccess() {
  return (
    <div className="py-10 text-center sm:py-16">
      <motion.div initial={{ opacity: 0, scale: 0.55 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-status-confirmed text-white shadow-lg shadow-status-confirmed/20">
        <Check className="h-10 w-10" strokeWidth={2.5} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.35 }}>
        <p className="mt-7 text-sm font-semibold text-status-confirmed">Готово</p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink">Запись создана!</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">Мы отправили подтверждение на ваш номер. Если планы изменятся, запись можно перенести по ссылке в сообщении.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/15 bg-surface px-6 text-sm font-bold text-ink transition-colors hover:bg-ink/[0.04]"
          >
            На главную
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-center text-sm font-bold text-white transition-colors hover:bg-accent/90"
          >
            Посмотреть демо администратора
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
