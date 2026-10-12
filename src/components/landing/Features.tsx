"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  CalendarClock,
  CalendarDays,
  ChartNoAxesCombined,
  ContactRound,
  ReceiptText,
  ShieldCheck,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    icon: CalendarClock,
    title: "Онлайн-запись 24/7",
    description: "Клиент выбирает услугу, мастера и время — в любое время суток.",
  },
  {
    icon: CalendarDays,
    title: "Умный календарь",
    description: "Загрузка мастеров, перерывы, двойные записи и лист ожидания.",
  },
  {
    icon: ContactRound,
    title: "CRM клиентов",
    description: "История визитов, заметки, предпочтения и формулы в одной карточке.",
  },
  {
    icon: WalletCards,
    title: "Депозиты и предоплаты",
    description: "Защита времени мастера от необоснованных отмен.",
  },
  {
    icon: BellRing,
    title: "Напоминания",
    description: "SMS, push или сообщение клиенту перед визитом.",
  },
  {
    icon: ReceiptText,
    title: "Оплаты и чеки",
    description: "Оплата на месте, онлайн или депозитом — всё в одной системе.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Аналитика",
    description: "Выручка, загрузка, отмены и повторные визиты как на ладони.",
  },
  {
    icon: ShieldCheck,
    title: "Роли и доступы",
    description: "Отдельные права для владельца, администратора и мастера.",
  },
];

export function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.65fr]">
          <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Рабочая среда
          </p>
          <h2
            id="features-title"
            className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl"
          >
            Не набор функций, а связанный рабочий процесс.
          </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink/70 sm:text-lg lg:pb-1">
            Запись запускает цепочку действий: календарь обновляется, клиент получает сообщение, а показатели студии пересчитываются без ручной работы.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-fr gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isPrimary = index === 0;
            const desktopSpan = index === 0 ? "lg:col-span-6 lg:row-span-2" : index < 5 ? "lg:col-span-3" : "lg:col-span-4";

            return (
              <motion.article
                key={feature.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group rounded-2xl border p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-md sm:p-7 ${desktopSpan} ${isPrimary ? "min-h-80 border-ink bg-ink text-white lg:min-h-[34rem]" : "min-h-56 border-ink/[0.08] bg-surface"}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${isPrimary ? "bg-accent-warm text-ink" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"}`}>
                  <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                </div>
                <h3 className={`mt-7 font-extrabold leading-snug tracking-[-0.02em] ${isPrimary ? "max-w-sm text-3xl text-white sm:text-4xl" : "text-xl text-ink"}`}>
                  {feature.title}
                </h3>
                <p className={`mt-3 max-w-md text-sm leading-6 ${isPrimary ? "text-white/60 sm:text-base sm:leading-7" : "text-ink/70"}`}>{feature.description}</p>
                {isPrimary ? (
                  <div className="mt-10 grid gap-2 rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(244,162,97,.12))] p-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:p-5">
                    {[
                      ["01", "Клиент выбрал время"],
                      ["02", "Календарь обновлён"],
                      ["03", "Команда уведомлена"],
                    ].map(([number, label], flowIndex) => (
                      <div key={number} className="contents">
                        <div className="rounded-lg bg-white/[0.08] p-3">
                          <span className="text-[10px] font-bold text-accent-warm">{number}</span>
                          <p className="mt-1 text-xs font-bold leading-5 text-white">{label}</p>
                        </div>
                        {flowIndex < 2 ? <span aria-hidden="true" className="hidden text-center text-accent-warm sm:block">→</span> : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
