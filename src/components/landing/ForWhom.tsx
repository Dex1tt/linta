"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Crown, Headphones, Scissors, Smartphone, type LucideIcon } from "lucide-react";

interface Role {
  title: string;
  description: string;
  icon: LucideIcon;
}

const roles: Role[] = [
  {
    icon: Crown,
    title: "Владельцу",
    description: "Выручка, загрузка, отмены и эффективность команды — в одном дашборде.",
  },
  {
    icon: Headphones,
    title: "Администратору",
    description: "Быстрое создание записей и меньше ручной работы с клиентами.",
  },
  {
    icon: Scissors,
    title: "Мастеру",
    description: "Личное расписание, карточки клиентов и заметки под рукой.",
  },
  {
    icon: Smartphone,
    title: "Клиенту",
    description: "Запись за минуту, напоминания и прозрачная отмена визита.",
  },
];

export function ForWhom() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="for-whom"
      aria-labelledby="for-whom-title"
      className="bg-surface py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
            <div aria-hidden="true" className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent/35 blur-[90px]" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent-warm">Команда в одном ритме</p>
              <h2 id="for-whom-title" className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Свой экран для каждой роли.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/55 sm:text-lg">
                Владелец видит бизнес целиком, администратор управляет потоком, мастер — своим днём, клиент — только удобной записью.
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10 px-6 sm:px-10 lg:px-12">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.article
                  key={role.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-4 py-6 sm:grid-cols-[3rem_9rem_1fr] sm:items-center sm:gap-5 sm:py-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.07] text-accent-warm">
                    <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-[-0.02em]">{role.title}</h3>
                  <p className="text-sm leading-6 text-white/50">{role.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
