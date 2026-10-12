"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck2, CircleDollarSign, Repeat2, UserX } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { formatPrice } from "@/lib/formatPrice";
import type { Appointment } from "@/types/appointment";
import type { Client } from "@/types/client";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";

interface AnalyticsDashboardProps {
  appointments: Appointment[];
  clients: Client[];
  masters: Master[];
  services: Service[];
}

type Period = "week" | "month" | "quarter";

const periodOptions: Array<{ id: Period; label: string; days: number }> = [
  { id: "week", label: "Неделя", days: 7 },
  { id: "month", label: "Месяц", days: 30 },
  { id: "quarter", label: "Квартал", days: 90 },
];

const metricAnimation = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.35 },
  }),
};

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function shiftDate(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return toIsoDate(value);
}

function getWeekday(date: string): string {
  const label = new Intl.DateTimeFormat("ru-RU", { weekday: "short" })
    .format(new Date(`${date}T12:00:00Z`))
    .replaceAll(".", "");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function getDaysDifference(startDate: string, endDate: string): number {
  const start = new Date(`${startDate}T12:00:00Z`).getTime();
  const end = new Date(`${endDate}T12:00:00Z`).getTime();
  return Math.floor((end - start) / 86_400_000);
}

function getChartData(
  period: Period,
  startDate: string,
  endDate: string,
  paidAppointments: Appointment[],
  servicesById: Map<string, Service>,
) {
  const shortDateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  });
  const monthFormatter = new Intl.DateTimeFormat("ru-RU", { month: "short" });

  if (period === "week") {
    return Array.from({ length: 7 }, (_, index) => {
      const date = shiftDate(startDate, index);
      return {
        label: getWeekday(date),
        revenue: paidAppointments
          .filter((appointment) => appointment.date === date)
          .reduce((sum, appointment) => sum + (servicesById.get(appointment.serviceId)?.price ?? 0), 0),
      };
    });
  }

  if (period === "month") {
    return Array.from({ length: 5 }, (_, index) => {
      const bucketStart = shiftDate(startDate, index * 7);
      const bucketEnd = index === 4 ? endDate : shiftDate(bucketStart, 6);
      return {
        label: `${shortDateFormatter.format(new Date(`${bucketStart}T12:00:00Z`))}–${shortDateFormatter.format(new Date(`${bucketEnd}T12:00:00Z`))}`,
        revenue: paidAppointments
          .filter((appointment) => appointment.date >= bucketStart && appointment.date <= bucketEnd)
          .reduce((sum, appointment) => sum + (servicesById.get(appointment.serviceId)?.price ?? 0), 0),
      };
    });
  }

  const monthKeys = Array.from(
    new Set(
      Array.from({ length: getDaysDifference(startDate, endDate) + 1 }, (_, index) =>
        shiftDate(startDate, index).slice(0, 7),
      ),
    ),
  );

  return monthKeys.map((monthKey) => ({
    label: monthFormatter
      .format(new Date(`${monthKey}-01T12:00:00Z`))
      .replaceAll(".", "")
      .replace(/^./, (letter) => letter.toUpperCase()),
    revenue: paidAppointments
      .filter((appointment) => appointment.date.startsWith(monthKey))
      .reduce((sum, appointment) => sum + (servicesById.get(appointment.serviceId)?.price ?? 0), 0),
  }));
}

export function AnalyticsDashboard({ appointments, clients, masters, services }: AnalyticsDashboardProps) {
  const [period, setPeriod] = useState<Period>("week");
  const analytics = useMemo(() => {
    const endDate = appointments.map((appointment) => appointment.date).sort().at(-1) ?? toIsoDate(new Date());
    const selectedPeriod = periodOptions.find((option) => option.id === period) ?? periodOptions[0];
    const startDate = shiftDate(endDate, -(selectedPeriod.days - 1));
    const periodAppointments = appointments.filter((appointment) => appointment.date >= startDate && appointment.date <= endDate);
    const servicesById = new Map(services.map((service) => [service.id, service]));
    const paidAppointments = periodAppointments.filter((appointment) => appointment.status === "paid");
    const revenue = paidAppointments.reduce((sum, appointment) => sum + (servicesById.get(appointment.serviceId)?.price ?? 0), 0);
    const cancelledCount = periodAppointments.filter((appointment) => appointment.status === "cancelled").length;
    const noShowRate = periodAppointments.length > 0 ? Math.round((cancelledCount / periodAppointments.length) * 100) : 0;
    const knownClientIds = new Set(clients.map((client) => client.id));
    const completedVisits = periodAppointments.filter(
      (appointment) =>
        appointment.status !== "cancelled" && knownClientIds.has(appointment.clientId),
    );
    const uniqueClients = new Set(completedVisits.map((appointment) => appointment.clientId)).size;
    const repeatVisits = Math.max(completedVisits.length - uniqueClients, 0);
    const repeatRate = completedVisits.length > 0
      ? Math.round((repeatVisits / completedVisits.length) * 100)
      : 0;
    const chartData = getChartData(period, startDate, endDate, paidAppointments, servicesById);

    const topServices = services
      .map((service) => {
        const serviceAppointments = periodAppointments.filter((appointment) => appointment.serviceId === service.id);
        const serviceRevenue = serviceAppointments
          .filter((appointment) => appointment.status === "paid")
          .reduce((sum) => sum + service.price, 0);
        return { ...service, bookings: serviceAppointments.length, revenue: serviceRevenue };
      })
      .filter((service) => service.bookings > 0)
      .sort((first, second) => second.bookings - first.bookings || second.revenue - first.revenue)
      .slice(0, 5);

    const masterLoad = masters.map((master) => ({
      ...master,
      bookings: periodAppointments.filter((appointment) => appointment.masterId === master.id).length,
    }));

    return {
      startDate,
      endDate,
      revenue,
      totalVisits: periodAppointments.length,
      noShowRate,
      repeatRate,
      chartData,
      topServices,
      masterLoad,
      maxServiceBookings: Math.max(...topServices.map((service) => service.bookings), 1),
      maxMasterBookings: Math.max(...masterLoad.map((master) => master.bookings), 1),
    };
  }, [appointments, clients, masters, period, services]);

  const metrics = [
    { label: "Выручка за период", value: formatPrice(analytics.revenue), note: "Только оплаченные записи", icon: CircleDollarSign, color: "text-accent bg-accent/10" },
    { label: "Всего визитов", value: String(analytics.totalVisits), note: "Все записи за период", icon: CalendarCheck2, color: "text-status-paid bg-status-paid/10" },
    { label: "Процент неявок", value: `${analytics.noShowRate}%`, note: "Доля отменённых записей", icon: UserX, color: "text-status-cancelled bg-status-cancelled/10" },
    { label: "Повторные визиты", value: `${analytics.repeatRate}%`, note: "Доля визитов после первого", icon: Repeat2, color: "text-status-confirmed bg-status-confirmed/10" },
  ];

  const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });

  return (
    <section className="min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Показатели студии</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Аналитика</h1>
          <p className="mt-2 text-sm text-slate-500">
            {dateFormatter.format(new Date(`${analytics.startDate}T12:00:00`))} — {dateFormatter.format(new Date(`${analytics.endDate}T12:00:00`))}
          </p>
        </div>
        <div className="inline-flex w-full self-start rounded-full border border-slate-200 bg-surface p-1 shadow-sm sm:w-auto sm:self-auto">
          {periodOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={period === option.id}
              onClick={() => setPeriod(option.id)}
              className={`min-h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors sm:px-4 ${period === option.id ? "bg-accent text-white shadow-sm" : "text-slate-500 hover:text-ink"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.article key={metric.label} custom={index} variants={metricAnimation} initial="hidden" animate="visible" className="rounded-xl border border-slate-200 bg-surface p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-ink">{metric.value}</p>
                </div>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${metric.color}`}><Icon className="h-5 w-5" /></span>
              </div>
              <p className="mt-3 text-xs text-slate-600">{metric.note}</p>
            </motion.article>
          );
        })}
      </div>

      <motion.div key={`chart-${period}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-extrabold text-ink">
            Выручка {period === "week" ? "по дням" : period === "month" ? "по неделям" : "по месяцам"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Сумма оплаченных услуг</p>
        </div>
        <div className="mt-6 h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barCategoryGap="28%">
              <defs>
                <linearGradient id={`revenue-gradient-${period}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" />
                  <stop offset="100%" stopColor="#8B75FF" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="4 4" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} tickFormatter={(value: number) => `${Math.round(value / 1000)} тыс.`} />
              <Tooltip cursor={{ fill: "rgba(108, 75, 255, 0.05)" }} formatter={(value) => [formatPrice(Number(value)), "Выручка"]} labelFormatter={(label) => `День: ${label}`} contentStyle={{ borderRadius: 12, borderColor: "#E2E8F0", boxShadow: "0 8px 24px rgba(22, 24, 29, 0.08)" }} />
              <Bar dataKey="revenue" name="Выручка" fill={`url(#revenue-gradient-${period})`} radius={[10, 10, 3, 3]} maxBarSize={72} isAnimationActive animationDuration={850} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-extrabold text-ink">Топ-услуги</h2>
          <p className="mt-1 text-sm text-slate-500">По количеству записей</p>
          <div className="mt-6 space-y-5">
            {analytics.topServices.map((service, index) => (
              <div key={service.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-extrabold text-accent">{index + 1}</span>
                    <div className="min-w-0"><p className="truncate text-sm font-bold text-ink">{service.name}</p><p className="mt-0.5 text-xs text-slate-500">{service.bookings} записей</p></div>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-ink">{formatPrice(service.revenue)}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-accent" style={{ width: `${(service.bookings / analytics.maxServiceBookings) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-extrabold text-ink">Загрузка по мастерам</h2>
          <p className="mt-1 text-sm text-slate-500">Сравнение по количеству записей</p>
          <div className="mt-6 space-y-5">
            {analytics.masterLoad.map((master) => (
              <div key={master.id}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-status-confirmed/10 text-xs font-extrabold text-status-confirmed">{master.avatar}</span>
                    <div className="min-w-0"><p className="truncate text-sm font-bold text-ink">{master.name}</p><p className="truncate text-xs text-slate-500">{master.specialization}</p></div>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-ink">{master.bookings} записей</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-status-confirmed" style={{ width: `${(master.bookings / analytics.maxMasterBookings) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
