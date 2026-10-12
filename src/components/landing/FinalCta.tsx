"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function FinalCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="bg-surface px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-ink px-5 py-16 text-center shadow-lg sm:rounded-[2rem] sm:px-12 sm:py-24 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.48),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(244,162,97,0.18),transparent_32%)]"
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/55">
            Пора навести порядок
          </p>
          <h2
            id="final-cta-title"
            className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-6xl"
          >
            Вся студия — в одном рабочем пространстве.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            Контролируйте расписание, клиентов и выручку без лишних сервисов.
          </p>
          <Link
            href="/demo"
            className="mt-9 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-accent-warm px-8 text-base font-extrabold text-ink shadow-md transition-colors hover:bg-[#f6ad72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Создать студию
            <ArrowRight aria-hidden="true" className="ml-2" size={19} strokeWidth={2} />
          </Link>
          <p className="mt-4 text-xs text-white/60">14 дней бесплатно · карта не нужна</p>
        </div>
      </motion.div>
    </section>
  );
}
