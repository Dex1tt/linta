"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Клиент записывается сам",
    description:
      "Через сайт, соцсети или персональную ссылку Linta — клиент видит только реальное свободное время.",
  },
  {
    number: "02",
    title: "Расписание обновляется мгновенно",
    description:
      "Запись сразу появляется в календаре нужного мастера, без звонков администратору.",
  },
  {
    number: "03",
    title: "Linta напоминает о визите",
    description:
      "Клиент получает напоминание и может подтвердить или перенести запись в один клик.",
  },
  {
    number: "04",
    title: "Оплата и история сохраняются",
    description:
      "Депозит, чек, услуга и заметки автоматически попадают в карточку клиента.",
  },
];

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Как работает Linta</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
            От заявки до оплаты — без хаоса.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
            Каждый этап записи связан с предыдущим — команда видит актуальную информацию, а
            клиент всегда знает, что будет дальше.
          </p>
        </div>

        <div className="relative mt-14 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[9px] top-8 w-px bg-accent/20 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-1/2 hidden h-px -translate-y-1/2 bg-accent/20 lg:block"
          />

          <div className="relative grid gap-5 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative pl-8 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-8 z-10 h-3 w-3 rounded-full border-[3px] border-surface bg-accent lg:hidden"
                />
                <motion.article
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full min-h-64 overflow-hidden rounded-xl border border-ink/[0.07] bg-surface p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-3 select-none text-6xl font-extrabold tracking-tighter text-accent/[0.09] sm:text-7xl"
                  >
                    {step.number}
                  </span>
                  <div className="relative flex h-full flex-col">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-xs font-extrabold text-accent">
                      {step.number}
                    </div>
                    <h3 className="mt-8 max-w-[15rem] text-xl font-extrabold leading-snug tracking-[-0.02em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-ink/70">{step.description}</p>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
