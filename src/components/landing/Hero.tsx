"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles, TrendingUp } from "lucide-react";

const activity = [
  { time: "10:30", name: "Алина Орлова", service: "Стрижка и укладка", state: "Пришла", tone: "confirmed" },
  { time: "12:00", name: "Софья Крылова", service: "Маникюр", state: "Оплачено", tone: "paid" },
  { time: "14:30", name: "Дарья Новикова", service: "Окрашивание", state: "Подтвердить", tone: "pending" },
];

const stateClasses: Record<string, string> = {
  confirmed: "bg-status-confirmed/10 text-status-confirmed",
  paid: "bg-status-paid/10 text-status-paid",
  pending: "bg-status-pending/10 text-status-pending",
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative flex min-h-[90vh] scroll-mt-[72px] items-center overflow-hidden bg-ink pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-accent/40 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent-warm/20 blur-[130px]" />

      <div className="relative mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl">
          <div className="mb-6 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 text-sm font-semibold text-white/80 backdrop-blur">
            <Sparkles aria-hidden="true" size={15} className="text-accent-warm" />
            Рабочий ритм студии — в одном сервисе
          </div>
          <h1 className="text-balance text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4.15rem]">
            Студия работает в ритме. Вы управляете результатом.
          </h1>
          <p className="mt-6 max-w-[35rem] text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            Linta соединяет онлайн-запись, команду и деньги в понятный рабочий поток. Меньше ручных действий — больше времени на клиентов и рост.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/demo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-warm px-6 text-sm font-extrabold text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f6ad72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm">
              Открыть интерактивное демо
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Как устроена Linta
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
            <span className="flex items-center gap-2"><Check aria-hidden="true" size={16} className="text-accent-warm" />14 дней бесплатно</span>
            <span className="flex items-center gap-2"><Check aria-hidden="true" size={16} className="text-accent-warm" />Без привязки карты</span>
          </div>
        </motion.div>

        <motion.div initial={shouldReduceMotion ? false : { opacity: 0, x: 32, rotate: 0.8 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[680px] lg:mx-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#f7faf8] text-ink shadow-[0_30px_80px_rgba(0,0,0,.34)]">
            <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <p className="text-sm font-extrabold">Пульс студии</p>
                <p className="mt-1 text-xs text-ink/70">Сегодня, 12 октября</p>
              </div>
              <span className="inline-flex min-h-8 items-center gap-2 rounded-full bg-status-confirmed/10 px-3 text-xs font-bold text-status-confirmed">
                <span className="h-2 w-2 rounded-full bg-status-confirmed" /> Всё по плану
              </span>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
              <div className="rounded-xl bg-ink p-4 text-white sm:p-5">
                <p className="text-xs font-semibold text-white/50">Выручка сегодня</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">48 700 ₽</p>
                  <span className="mb-1 flex items-center gap-1 text-xs font-bold text-[#75d4a0]"><TrendingUp size={14} /> 18%</span>
                </div>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[78%] rounded-full bg-accent-warm" /></div>
                <p className="mt-2 text-[11px] text-white/60">78% дневного плана</p>
              </div>

              <div className="rounded-xl border border-ink/10 bg-white p-4 sm:p-5">
                <p className="text-xs font-semibold text-ink/70">Загрузка команды</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[conic-gradient(#0F766E_0_82%,#E5ECE9_82%_100%)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-extrabold">82%</span>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">4 мастера</p>
                    <p className="mt-1 text-xs leading-5 text-ink/70">2 свободных окна<br />до конца дня</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-extrabold">Ближайшие визиты</p>
                <span className="text-xs font-semibold text-accent">Открыть день</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                {activity.map((item, index) => (
                  <div key={item.time} className={`grid grid-cols-[52px_1fr_auto] items-center gap-3 px-3 py-3.5 sm:grid-cols-[64px_1fr_auto] sm:px-4 ${index ? "border-t border-ink/10" : ""}`}>
                    <span className="text-xs font-extrabold text-ink/70">{item.time}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{item.name}</p>
                      <p className="mt-0.5 truncate text-xs text-ink/70">{item.service}</p>
                    </div>
                    <span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${stateClasses[item.tone]}`}>{item.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative mx-4 -mt-4 flex items-center gap-3 rounded-xl border border-white/15 bg-white p-3.5 text-ink shadow-xl sm:absolute sm:-bottom-8 sm:-left-8 sm:mx-0 sm:max-w-[285px] sm:p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><Check aria-hidden="true" size={20} strokeWidth={2.5} /></span>
            <div>
              <p className="text-xs font-extrabold">Окно заполнено автоматически</p>
              <p className="mt-1 text-[11px] leading-4 text-ink/70">Клиент из листа ожидания записан на 18:30</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
