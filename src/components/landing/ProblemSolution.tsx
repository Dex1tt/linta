"use client";

import { motion, useReducedMotion } from "framer-motion";

const comparisons = [
  {
    before: "Записи в Direct и WhatsApp",
    after: "Единая онлайн-запись",
  },
  {
    before: "Клиент забыл о визите",
    after: "Автонапоминания и подтверждения",
  },
  {
    before: "Отмена в последний момент",
    after: "Депозит и правила отмены",
  },
  {
    before: "Расписание в Excel",
    after: "Живой календарь по мастерам",
  },
  {
    before: "История клиента в голове администратора",
    after: "CRM с визитами, заметками и предпочтениями",
  },
];

export function ProblemSolution() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="problem-solution"
      aria-labelledby="problem-solution-title"
      className="bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Порядок вместо рутины
          </p>
          <h2
            id="problem-solution-title"
            className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl"
          >
            Меньше пустых окон. Больше предсказуемости.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
            Linta собирает разрозненные процессы студии в понятный рабочий поток, которым удобно
            пользоваться и команде, и клиентам.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl sm:mt-16">
          <div className="mb-3 hidden grid-cols-[1fr_3.5rem_1fr] px-6 md:grid">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink/70">Было</p>
            <span aria-hidden="true" />
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">Стало</p>
          </div>

          <div className="space-y-4">
            {comparisons.map((comparison, index) => (
              <motion.article
                key={comparison.before}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid overflow-hidden rounded-xl border border-ink/[0.08] bg-surface shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-accent/20 hover:shadow-md md:grid-cols-[1fr_3.5rem_1fr] md:items-stretch"
              >
                <div className="flex min-h-24 items-center gap-4 bg-status-cancelled/[0.035] p-5 sm:p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-status-cancelled/10 text-status-cancelled">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 5L15 15M15 5L5 15" />
                    </svg>
                  </span>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-status-cancelled/70 md:hidden">
                      Было
                    </p>
                    <p className="font-semibold leading-6 text-ink/70">{comparison.before}</p>
                  </div>
                </div>

                <div className="relative flex h-11 items-center justify-center bg-surface md:h-auto">
                  <span
                    aria-hidden="true"
                    className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-ink/10 md:bottom-5 md:left-1/2 md:right-auto md:top-5 md:h-auto md:w-px md:-translate-x-1/2 md:translate-y-0"
                  />
                  <span className="relative z-10 flex h-8 w-8 rotate-90 items-center justify-center rounded-full border border-accent/15 bg-surface text-accent shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 md:rotate-0">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 10H16M11 5L16 10L11 15" />
                    </svg>
                  </span>
                </div>

                <div className="flex min-h-24 items-center gap-4 bg-accent/[0.035] p-5 sm:p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-status-confirmed/10 text-status-confirmed">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 10.5L8 14.5L16 5.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-accent md:hidden">
                      Стало
                    </p>
                    <p className="font-bold leading-6 text-ink">{comparison.after}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
