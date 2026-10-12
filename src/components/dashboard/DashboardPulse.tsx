"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BellRing, CalendarClock, CreditCard, Gauge, MoveUpRight } from "lucide-react";
import Link from "next/link";

export interface DashboardPulseAction {
  id: string;
  kind: "confirmation" | "deposit" | "capacity";
  title: string;
  description: string;
  meta: string;
  href: string;
}

interface DashboardPulseProps {
  dateLabel: string;
  utilization: number;
  potentialRevenue: string;
  actions: DashboardPulseAction[];
}

const actionStyles = {
  confirmation: {
    icon: BellRing,
    className: "bg-status-pending/15 text-status-pending",
  },
  deposit: {
    icon: CreditCard,
    className: "bg-status-paid/15 text-status-paid",
  },
  capacity: {
    icon: CalendarClock,
    className: "bg-accent/10 text-accent",
  },
} as const;

export function DashboardPulse({
  dateLabel,
  utilization,
  potentialRevenue,
  actions,
}: DashboardPulseProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="dashboard-pulse-title"
      className="mt-6 overflow-hidden rounded-2xl bg-ink text-white shadow-md"
    >
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent-warm text-ink">
            <Gauge aria-hidden="true" size={20} strokeWidth={2.1} />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-ink bg-status-confirmed" />
          </span>
          <div>
            <h2 id="dashboard-pulse-title" className="font-extrabold">Пульс Linta</h2>
            <p className="mt-0.5 text-xs text-white/55">Приоритеты на {dateLabel.toLowerCase()}</p>
          </div>
        </div>
        <span className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/70">
          {actions.length} {actions.length === 1 ? "действие" : actions.length < 5 ? "действия" : "действий"}
        </span>
      </div>

      <div className="grid xl:grid-cols-[0.38fr_1fr]">
        <div className="border-b border-white/10 p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Состояние дня</p>
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 xl:grid-cols-1">
            <div className="bg-ink p-4">
              <p className="text-2xl font-extrabold text-accent-warm">{utilization}%</p>
              <p className="mt-1 text-xs leading-5 text-white/50">загрузка команды</p>
            </div>
            <div className="bg-ink p-4">
              <p className="text-xl font-extrabold text-white sm:text-2xl">{potentialRevenue}</p>
              <p className="mt-1 text-xs leading-5 text-white/50">в предстоящих визитах</p>
            </div>
          </div>
        </div>

        <div className="bg-[#163a36] p-4 sm:p-5">
          <div className="space-y-2.5">
            {actions.map((action, index) => {
              const config = actionStyles[action.kind];
              const Icon = config.icon;

              return (
                <motion.article
                  key={action.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.08 * index }}
                  className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.className}`}>
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold leading-5 text-white">{action.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/55">{action.description}</p>
                      <p className="mt-1.5 text-xs font-bold text-accent-warm">{action.meta}</p>
                    </div>
                  </div>
                  <Link
                    href={action.href}
                    className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-xs font-extrabold text-ink transition-colors hover:bg-accent-warm sm:w-auto"
                  >
                    Открыть
                    <MoveUpRight aria-hidden="true" size={14} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
