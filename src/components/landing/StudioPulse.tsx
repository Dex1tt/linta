"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  CalendarClock,
  Check,
  Coffee,
  RotateCcw,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface PulseAction {
  id: string;
  label: string;
  title: string;
  description: string;
  impact: string;
  action: string;
  icon: LucideIcon;
  tone: "warm" | "accent" | "paid";
}

const pulseActions: PulseAction[] = [
  {
    id: "free-window",
    label: "Свободное окно",
    title: "Сегодня в 16:30 освободилось время",
    description: "В листе ожидания есть четыре клиента на стрижку и укладку.",
    impact: "+2 500 ₽ к выручке",
    action: "Заполнить окно",
    icon: CalendarClock,
    tone: "warm",
  },
  {
    id: "confirmation",
    label: "Нужно подтверждение",
    title: "Виктория не подтвердила визит на 18:00",
    description: "Linta подготовила короткое напоминание с кнопками ответа.",
    impact: "Снизить риск неявки",
    action: "Напомнить",
    icon: BellRing,
    tone: "accent",
  },
  {
    id: "workload",
    label: "Нагрузка команды",
    title: "У Дмитрия пять записей подряд",
    description: "Между 14:00 и 19:30 нет перерыва — можно освободить 20 минут.",
    impact: "Сохранить темп команды",
    action: "Добавить перерыв",
    icon: Coffee,
    tone: "paid",
  },
];

const toneClasses: Record<PulseAction["tone"], string> = {
  warm: "bg-accent-warm/15 text-accent-warm",
  accent: "bg-[#68d5c8]/10 text-[#68d5c8]",
  paid: "bg-status-paid/15 text-[#7eb0ff]",
};

export function StudioPulse() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const pendingActions = pulseActions.filter((action) => !completedIds.includes(action.id));
  const actionCountLabel = pendingActions.length === 1
    ? "действие"
    : pendingActions.length > 1 && pendingActions.length < 5
      ? "действия"
      : "действий";

  const completeAction = (id: string) => {
    setCompletedIds((current) => [...current, id]);
  };

  return (
    <section
      id="studio-pulse"
      aria-labelledby="studio-pulse-title"
      className="bg-surface py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[0.9fr_0.6fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Фирменный сценарий
            </p>
            <h2
              id="studio-pulse-title"
              className="mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-tight tracking-[-0.04em] text-ink sm:text-4xl lg:text-6xl"
            >
              Linta не просто показывает данные. Она собирает следующий шаг.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink/70 sm:text-lg lg:pb-1">
            «Пульс студии» превращает расписание, подтверждения и загрузку команды в короткую очередь понятных действий.
          </p>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-[1.75rem] bg-ink text-white shadow-[0_30px_80px_rgba(18,49,46,.22)] sm:mt-16"
        >
          <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-9">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-warm text-ink">
                <TrendingUp aria-hidden="true" size={19} strokeWidth={2.2} />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-ink bg-status-confirmed" />
              </span>
              <div>
                <p className="font-extrabold">Пульс Linta</p>
                <p className="text-xs text-white/55">Сегодня · данные обновлены сейчас</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-white/65">
                12 октября
              </span>
              <span className="rounded-full bg-accent-warm px-3 py-2 text-ink">
                {pendingActions.length} {actionCountLabel}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Картина дня</p>
              <p className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
                День под контролем. Есть несколько точек роста.
              </p>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                Вместо пяти отчётов — один список приоритетов, который администратор может разобрать за несколько минут.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <div className="bg-ink p-4 sm:p-5">
                  <p className="text-2xl font-extrabold text-accent-warm">87%</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">загрузка команды</p>
                </div>
                <div className="bg-ink p-4 sm:p-5">
                  <p className="text-2xl font-extrabold text-white">21 400 ₽</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">потенциал дня</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#68d5c8]/10 text-[#68d5c8]">
                  <UsersRound aria-hidden="true" size={19} />
                </span>
                <p className="text-sm leading-6 text-white/65">
                  Шесть клиентов готовы к повторной записи на этой неделе.
                </p>
              </div>
            </div>

            <div className="min-w-0 bg-[#163a36] p-4 sm:p-6 lg:p-8">
              <div className="mb-4 flex min-h-11 items-center justify-between gap-3 px-1">
                <div>
                  <p className="font-extrabold">Что сделать сейчас</p>
                  <p className="mt-1 text-xs text-white/50">Нажмите на действие — очередь обновится</p>
                </div>
                {completedIds.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setCompletedIds([])}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-bold text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <RotateCcw aria-hidden="true" size={15} />
                    Повторить
                  </button>
                ) : null}
              </div>

              <div className="space-y-3" aria-live="polite">
                <AnimatePresence initial={false} mode="popLayout">
                  {pendingActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <motion.article
                        layout={!shouldReduceMotion}
                        key={action.id}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 30, scale: 0.98 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.065] p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                          <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneClasses[action.tone]}`}>
                              <Icon aria-hidden="true" size={20} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">{action.label}</p>
                              <h3 className="mt-1 text-sm font-extrabold leading-6 text-white sm:text-base">{action.title}</h3>
                              <p className="mt-1 text-xs leading-5 text-white/55 sm:text-sm">{action.description}</p>
                              <p className="mt-2 text-xs font-bold text-accent-warm">{action.impact}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => completeAction(action.id)}
                            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-white px-4 text-xs font-extrabold text-ink transition-colors hover:bg-accent-warm xl:w-auto"
                          >
                            {action.action}
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>

                {pendingActions.length === 0 ? (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-status-confirmed/15 text-[#75d4a0]">
                      <Check aria-hidden="true" size={28} strokeWidth={2.5} />
                    </span>
                    <p className="mt-5 text-lg font-extrabold">Очередь разобрана</p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">Все важные действия на сегодня выполнены. Пульс обновится при новых событиях.</p>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
