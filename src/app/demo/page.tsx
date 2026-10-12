"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const demos = [
  {
    href: "/dashboard",
    title: "Для администратора",
    description:
      "Дашборд, календарь, клиенты и аналитика — всё, что видит владелец студии.",
    icon: LayoutDashboard,
    iconClassName: "bg-accent/10 text-accent",
  },
  {
    href: "/book",
    title: "Для клиента",
    description:
      "Как выглядит запись на услугу глазами клиента студии — быстро и понятно.",
    icon: CalendarDays,
    iconClassName: "bg-status-confirmed/10 text-status-confirmed",
  },
];

export default function DemoPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col sm:min-h-[calc(100vh-6rem)]">
        <Link
          href="/"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg text-sm font-semibold text-ink/70 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          На главную
        </Link>

        <div className="flex flex-1 flex-col justify-center py-14 sm:py-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent">
              Демо Linta
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.035em] text-ink sm:text-5xl">
              Выберите, что посмотреть
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
              Linta — это два опыта: удобная панель для вашей команды и простая запись для
              клиентов.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 sm:mt-12">
            {demos.map((demo, index) => {
              const Icon = demo.icon;

              return (
                <motion.article
                  key={demo.href}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.16 + index * 0.12 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  className="flex min-h-80 flex-col rounded-xl border border-ink/[0.08] bg-surface p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${demo.iconClassName}`}
                  >
                    <Icon aria-hidden="true" size={27} strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-ink">
                    {demo.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">
                    {demo.description}
                  </p>
                  <Link
                    href={demo.href}
                    className="mt-auto inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Открыть демо
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
