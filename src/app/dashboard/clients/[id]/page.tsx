import Link from "next/link";
import { ArrowLeft, CalendarRange, CalendarX, CircleDollarSign, Heart, NotebookPen, Scissors, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { ClientActionButtons } from "@/components/dashboard/ClientActionButtons";
import { ClientMetricCard } from "@/components/dashboard/ClientMetricCard";
import { ClientTag } from "@/components/dashboard/ClientTag";
import { EmptyState } from "@/components/ui/EmptyState";
import { appointments } from "@/data/appointments";
import { clients } from "@/data/clients";
import { masters } from "@/data/masters";
import { services } from "@/data/services";
import { formatShortDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import type { Appointment } from "@/types/appointment";

interface ClientDetailsPageProps {
  params: Promise<{ id: string }>;
}

const statusLabels: Record<Appointment["status"], string> = {
  confirmed: "Подтверждена",
  pending: "Ожидает",
  cancelled: "Отменена",
  paid: "Оплачена",
};

const statusTones: Record<Appointment["status"], "confirmed" | "pending" | "cancelled" | "paid"> = {
  confirmed: "confirmed",
  pending: "pending",
  cancelled: "cancelled",
  paid: "paid",
};

export function generateStaticParams() {
  return clients.map((client) => ({ id: client.id }));
}

export default async function ClientDetailsPage({ params }: ClientDetailsPageProps) {
  const { id } = await params;
  const client = clients.find((item) => item.id === id);

  if (!client) {
    return (
      <section className="grid min-h-[70vh] place-items-center">
        <div className="max-w-md rounded-xl border border-slate-200 bg-surface p-8 text-center shadow-sm">
          <UserRound className="mx-auto h-10 w-10 text-slate-300" />
          <h1 className="mt-4 text-2xl font-extrabold text-ink">Клиент не найден</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Возможно, клиент был удалён или ссылка указана неверно.</p>
          <Link href="/dashboard/clients" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90">
            <ArrowLeft className="h-4 w-4" /> Назад к списку
          </Link>
        </div>
      </section>
    );
  }

  const favoriteMaster = masters.find((master) => master.id === client.favoriteMaster);
  const favoriteService = services.find((service) => service.id === client.favoriteService);
  const clientAppointments = appointments
    .filter((appointment) => appointment.clientId === client.id)
    .sort((first, second) => `${second.date} ${second.startTime}`.localeCompare(`${first.date} ${first.startTime}`));

  return (
    <section>
      <Link href="/dashboard/clients" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Назад к клиентам
      </Link>

      <div className="mt-5 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-accent/10 text-xl font-extrabold text-accent sm:h-24 sm:w-24">{client.avatar}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-accent">Карточка клиента</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{client.name}</h1>
              <a href={`tel:${client.phone.replaceAll(" ", "")}`} className="mt-1 inline-flex min-h-11 items-center text-sm text-slate-500 transition-colors hover:text-accent">{client.phone}</a>
              <div className="mt-3 flex flex-wrap gap-2">{client.tags.map((tag) => <ClientTag key={tag} tag={tag} />)}</div>
            </div>
          </div>
          <ClientActionButtons />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <ClientMetricCard icon={CalendarRange} label="Количество визитов" value={String(clientAppointments.length)} />
        <ClientMetricCard icon={CircleDollarSign} label="Общая сумма покупок" value={formatPrice(client.totalSpent)} />
        <ClientMetricCard icon={UserRound} label="Любимый мастер" value={favoriteMaster?.name ?? "Не определён"} />
        <ClientMetricCard icon={Heart} label="Любимая услуга" value={favoriteService?.name ?? "Не определена"} />
      </div>

      <div className="mt-6 rounded-xl border border-status-pending/25 bg-status-pending/[0.07] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-status-pending/15 text-status-pending"><NotebookPen className="h-5 w-5" /></span>
          <div>
            <h2 className="font-extrabold text-ink">Заметки</h2>
            <p className={`mt-1 text-sm leading-6 ${client.notes.trim() ? "text-slate-600" : "text-ink/70"}`}>
              {client.notes.trim() || "Заметок пока нет"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-extrabold text-ink">История визитов</h2>
            <p className="mt-0.5 text-sm text-slate-500">Записи из демо-расписания</p>
          </div>
          <Scissors className="h-5 w-5 text-accent" />
        </div>
        {clientAppointments.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {clientAppointments.map((appointment) => {
              const service = services.find((item) => item.id === appointment.serviceId);
              const master = masters.find((item) => item.id === appointment.masterId);
              return (
                <div key={appointment.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[130px_minmax(180px,1fr)_minmax(160px,1fr)_auto] sm:items-center sm:px-6">
                  <div>
                    <p className="text-sm font-bold text-ink">{formatShortDate(appointment.date)}</p>
                    <p className="text-xs text-slate-500">{appointment.startTime}–{appointment.endTime}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{service?.name ?? "Услуга"}</p>
                    <p className="text-xs text-slate-500">{service ? formatPrice(service.price) : "Цена не указана"}</p>
                  </div>
                  <p className="truncate text-sm text-slate-600">{master?.name ?? "Мастер не указан"}</p>
                  <Badge tone={statusTones[appointment.status]}>{statusLabels[appointment.status]}</Badge>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={CalendarX}
            title="Это будет первый визит клиента"
            description="После записи визит появится здесь вместе с услугой, мастером и статусом."
          />
        )}
      </div>
    </section>
  );
}
