import {
  Banknote,
  CalendarCheck2,
  CalendarDays,
  CalendarX,
  Clock3,
  Gauge,
  Plus,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

import { DashboardPulse, type DashboardPulseAction } from "@/components/dashboard/DashboardPulse";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { appointments } from "@/data/appointments";
import { clients } from "@/data/clients";
import { masters } from "@/data/masters";
import { services } from "@/data/services";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import type { AppointmentStatus } from "@/types/appointment";

const statusConfig = {
  confirmed: { label: "Подтверждена", tone: "confirmed" },
  pending: { label: "Ожидает", tone: "pending" },
  cancelled: { label: "Отменена", tone: "cancelled" },
  paid: { label: "Оплачена", tone: "paid" },
} as const satisfies Record<AppointmentStatus, { label: string; tone: AppointmentStatus }>;

function timeToMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export default function DashboardPage() {
  const dashboardDate = appointments.map((appointment) => appointment.date).sort()[0] ?? "";
  const todayAppointments = appointments
    .filter((appointment) => appointment.date === dashboardDate)
    .sort((first, second) => first.startTime.localeCompare(second.startTime));
  const paidAppointments = todayAppointments.filter((appointment) => appointment.status === "paid");
  const pendingAppointments = todayAppointments.filter(
    (appointment) => appointment.status === "pending",
  );
  const activeAppointments = todayAppointments.filter(
    (appointment) => appointment.status !== "cancelled",
  );

  const clientById = new Map(clients.map((client) => [client.id, client]));
  const masterById = new Map(masters.map((master) => [master.id, master]));
  const serviceById = new Map(services.map((service) => [service.id, service]));

  const revenueToday = paidAppointments.reduce(
    (total, appointment) => total + (serviceById.get(appointment.serviceId)?.price ?? 0),
    0,
  );
  const potentialRevenue = activeAppointments
    .filter((appointment) => appointment.status !== "paid")
    .reduce(
      (total, appointment) => total + (serviceById.get(appointment.serviceId)?.price ?? 0),
      0,
    );

  const dayOfWeek = dashboardDate
    ? ((new Date(`${dashboardDate}T12:00:00+07:00`).getDay() + 6) % 7) + 1
    : 1;
  const workingMasters = masters.filter((master) =>
    master.workingHours.daysOfWeek.includes(dayOfWeek as 1 | 2 | 3 | 4 | 5 | 6 | 7),
  );
  const availableMinutes = workingMasters.reduce(
    (total, master) =>
      total +
      timeToMinutes(master.workingHours.end) -
      timeToMinutes(master.workingHours.start),
    0,
  );
  const bookedMinutes = activeAppointments.reduce(
    (total, appointment) => total + (serviceById.get(appointment.serviceId)?.duration ?? 0),
    0,
  );
  const mastersUtilization =
    availableMinutes > 0 ? Math.round((bookedMinutes / availableMinutes) * 100) : 0;

  const appointmentCountByMaster = new Map<string, number>();
  for (const appointment of activeAppointments) {
    appointmentCountByMaster.set(
      appointment.masterId,
      (appointmentCountByMaster.get(appointment.masterId) ?? 0) + 1,
    );
  }
  const busiestMaster = masters
    .map((master) => ({
      master,
      count: appointmentCountByMaster.get(master.id) ?? 0,
    }))
    .sort((first, second) => second.count - first.count)[0];
  const appointmentsWithoutDeposit = activeAppointments.filter(
    (appointment) => !appointment.depositPaid,
  ).length;

  const metrics = [
    {
      label: "Записей сегодня",
      value: String(todayAppointments.length),
      caption: dashboardDate ? formatDate(dashboardDate) : "Нет записей",
      icon: CalendarCheck2,
      iconClassName: "bg-accent/10 text-accent",
    },
    {
      label: "Выручка сегодня",
      value: formatPrice(revenueToday),
      caption: `Оплаченных визитов: ${paidAppointments.length}`,
      icon: Banknote,
      iconClassName: "bg-status-confirmed/10 text-status-confirmed",
    },
    {
      label: "Ожидают подтверждения",
      value: String(pendingAppointments.length),
      caption: "Нужен ответ клиента",
      icon: Clock3,
      iconClassName: "bg-status-pending/10 text-status-pending",
    },
    {
      label: "Загрузка мастеров",
      value: `${mastersUtilization}%`,
      caption: `${bookedMinutes} из ${availableMinutes} минут`,
      icon: Gauge,
      iconClassName: "bg-status-paid/10 text-status-paid",
    },
  ];

  const firstPendingAppointment = pendingAppointments[0];
  const firstPendingClient = firstPendingAppointment
    ? clientById.get(firstPendingAppointment.clientId)
    : undefined;
  const pulseActions: DashboardPulseAction[] = [
    {
      id: "confirmations",
      kind: "confirmation",
      title: pendingAppointments.length > 0
        ? `${pendingAppointments.length} ${pendingAppointments.length === 1 ? "запись ждёт" : "записи ждут"} подтверждения`
        : "Все записи подтверждены",
      description: firstPendingAppointment
        ? `${firstPendingClient?.name ?? "Клиент"} · визит в ${firstPendingAppointment.startTime}`
        : "Ответы клиентов получены, дополнительных действий не требуется.",
      meta: pendingAppointments.length > 0 ? "Снизить риск неявки" : "Готово",
      href: "/dashboard/calendar",
    },
    {
      id: "deposits",
      kind: "deposit",
      title: appointmentsWithoutDeposit > 0
        ? `${appointmentsWithoutDeposit} ${appointmentsWithoutDeposit === 1 ? "визит без депозита" : "визита без депозита"}`
        : "Все необходимые депозиты внесены",
      description: appointmentsWithoutDeposit > 0
        ? "Проверьте условия записи и при необходимости отправьте ссылку на оплату."
        : "Предоплаты по активным записям не требуют внимания.",
      meta: appointmentsWithoutDeposit > 0 ? "Защитить время мастеров" : "Готово",
      href: "/dashboard/calendar",
    },
    {
      id: "capacity",
      kind: "capacity",
      title: `Свободно примерно ${Math.max(0, 100 - mastersUtilization)}% времени команды`,
      description: busiestMaster
        ? `Больше всего записей у мастера ${busiestMaster.master.name}: ${busiestMaster.count}.`
        : "Расписание команды пока свободно.",
      meta: "Проверить свободные окна",
      href: "/dashboard/calendar",
    },
  ];

  const quickActions = [
    {
      href: "/dashboard/calendar?new=appointment",
      label: "Создать запись",
      icon: Plus,
    },
    {
      href: "/dashboard/clients?new=client",
      label: "Добавить клиента",
      icon: UserPlus,
    },
    {
      href: "/dashboard/calendar",
      label: "Открыть календарь",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="py-2 sm:py-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Обзор студии</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-ink sm:text-4xl">
            Доброе утро, Анна
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            {dashboardDate ? `${formatDate(dashboardDate)} · ближайший рабочий день` : "Нет данных"}
          </p>
        </div>
        <Link
          href="/dashboard/calendar?new=appointment"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Plus aria-hidden="true" className="mr-2" size={18} strokeWidth={2.2} />
          Новая запись
        </Link>
      </header>

      <section className="mt-8 grid gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4" aria-label="Метрики студии">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              key={metric.label}
              className="rounded-xl border border-ink/[0.07] bg-surface p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink/70">{metric.label}</p>
                  <p className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-ink">
                    {metric.value}
                  </p>
                </div>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${metric.iconClassName}`}
                >
                  <Icon aria-hidden="true" size={20} strokeWidth={1.9} />
                </span>
              </div>
              <p className="mt-3 text-xs text-ink/70">{metric.caption}</p>
            </article>
          );
        })}
      </section>

      <DashboardPulse
        dateLabel={dashboardDate ? formatDate(dashboardDate) : "ближайший день"}
        utilization={mastersUtilization}
        potentialRevenue={formatPrice(potentialRevenue)}
        actions={pulseActions}
      />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-xl border border-ink/[0.07] bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="font-extrabold text-ink">Быстрые действия</h2>
          <p className="mt-1 text-xs text-ink/70">Частые задачи администратора</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex min-h-14 items-center gap-3 rounded-xl border border-ink/[0.08] px-4 text-sm font-bold text-ink transition-[background-color,border-color] hover:border-accent/20 hover:bg-accent/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon aria-hidden="true" size={17} strokeWidth={2} />
                  </span>
                  {action.label}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-ink/[0.07] bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="font-extrabold text-ink">Нагрузка команды</h2>
          <p className="mt-1 text-xs text-ink/70">Распределение ближайшего рабочего дня</p>
          <div className="mt-5 space-y-4">
            {masters.map((master) => {
              const count = appointmentCountByMaster.get(master.id) ?? 0;
              const maxCount = Math.max(1, ...appointmentCountByMaster.values());
              const width = Math.round((count / maxCount) * 100);

              return (
                <div key={master.id}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="truncate font-bold text-ink">{master.name}</span>
                    <span className="shrink-0 text-ink/70">{count} запис.</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-ink/[0.07] bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-5 sm:px-6">
          <div>
            <h2 className="font-extrabold text-ink">Ближайшие записи</h2>
            <p className="mt-1 text-xs text-ink/70">
              {dashboardDate ? formatDate(dashboardDate) : "Нет выбранной даты"}
            </p>
          </div>
          <Link
            href="/dashboard/calendar"
            className="inline-flex min-h-11 items-center text-sm font-bold text-accent transition-colors hover:text-accent/80 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Все записи
          </Link>
        </div>

        {todayAppointments.length > 0 ? (
          <div>
            <div className="hidden grid-cols-[5.5rem_1.25fr_1fr_1fr_auto] gap-4 border-b border-ink/[0.06] bg-background/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-ink/70 md:grid">
              <span>Время</span>
              <span>Клиент</span>
              <span>Услуга</span>
              <span>Мастер</span>
              <span>Статус</span>
            </div>
            <div className="divide-y divide-ink/[0.06]">
              {todayAppointments.map((appointment) => {
                const client = clientById.get(appointment.clientId);
                const master = masterById.get(appointment.masterId);
                const service = serviceById.get(appointment.serviceId);
                const status = statusConfig[appointment.status];

                return (
                  <article
                    key={appointment.id}
                    className="grid gap-4 px-5 py-4 transition-colors hover:bg-background/70 sm:px-6 md:grid-cols-[5.5rem_1.25fr_1fr_1fr_auto] md:items-center"
                  >
                    <div>
                      <p className="font-extrabold text-ink">{appointment.startTime}</p>
                      <p className="mt-0.5 text-xs text-ink/70">до {appointment.endTime}</p>
                    </div>
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-extrabold text-accent">
                        {client?.avatar ?? "—"}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-ink">{client?.name ?? "Клиент не найден"}</p>
                        <p className="mt-0.5 truncate text-xs text-ink/70">{client?.phone ?? "—"}</p>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink/75">{service?.name ?? "Услуга не найдена"}</p>
                      <p className="mt-0.5 text-xs text-ink/70">{service ? formatPrice(service.price) : "—"}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink/75">{master?.name ?? "Мастер не найден"}</p>
                      <p className="mt-0.5 truncate text-xs text-ink/70">{master?.specialization ?? "—"}</p>
                    </div>
                    <div className="md:justify-self-end">
                      <Badge tone={status.tone}>{status.label}</Badge>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={CalendarX}
            title="На сегодня записей пока нет"
            description="Свободный день можно использовать для задач команды или добавить новую запись."
          />
        )}
      </section>
    </div>
  );
}
