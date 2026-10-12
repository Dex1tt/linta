"use client";

import { CalendarX } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { getIsoWeekDates, getLocalIsoDate } from "@/lib/calendar";
import { filterAppointmentsByDate } from "@/lib/mockDataHelpers";
import type { Appointment } from "@/types/appointment";
import type { Client } from "@/types/client";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";
import { WeekAppointmentCard } from "./WeekAppointmentCard";

interface WeekCalendarProps {
  selectedDate: string;
  appointments: Appointment[];
  clients: Client[];
  masters: Master[];
  services: Service[];
  selectedMasterIds: Set<string>;
  onSelectAppointment: (appointmentId: string) => void;
}

const dayFormatter = new Intl.DateTimeFormat("ru-RU", { weekday: "short" });
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });

export function WeekCalendar({
  selectedDate,
  appointments,
  clients,
  masters,
  services,
  selectedMasterIds,
  onSelectAppointment,
}: WeekCalendarProps) {
  const weekDates = getIsoWeekDates(selectedDate);
  const today = getLocalIsoDate();
  const filteredAppointments = appointments.filter((appointment) => selectedMasterIds.has(appointment.masterId));
  const weekAppointments = filteredAppointments.filter(
    (appointment) => appointment.date >= weekDates[0] && appointment.date <= weekDates[6],
  );

  if (weekAppointments.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="На эту неделю записей пока нет"
        description="Перейдите к другой неделе или измените фильтр мастеров."
      />
    );
  }

  return (
    <div className="touch-pan-x overflow-x-auto overscroll-contain">
      <div className="grid min-w-[1100px] grid-cols-7 divide-x divide-slate-200">
        {weekDates.map((date) => {
          const dateAppointments = filterAppointmentsByDate(filteredAppointments, date)
            .sort((first, second) => first.startTime.localeCompare(second.startTime));
          const dateValue = new Date(`${date}T12:00:00Z`);
          const isToday = date === today;

          return (
            <section key={date} aria-label={dateFormatter.format(dateValue)} className="min-w-0 bg-surface">
              <header className={`sticky top-0 z-10 border-b px-3 py-4 text-center ${isToday ? "border-accent bg-accent/[0.08]" : "border-slate-200 bg-surface"}`}>
                <p className={`text-xs font-extrabold uppercase tracking-[0.1em] ${isToday ? "text-accent" : "text-slate-600"}`}>
                  {dayFormatter.format(dateValue).replaceAll(".", "")}
                </p>
                <p className="mt-1 text-sm font-extrabold text-ink">{dateFormatter.format(dateValue).replaceAll(".", "")}</p>
                {isToday ? <span className="mt-2 inline-flex rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">Сегодня</span> : null}
              </header>

              <div className="min-h-[420px] space-y-2 p-2.5">
                {dateAppointments.length > 0 ? (
                  dateAppointments.map((appointment) => (
                    <WeekAppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      clientName={clients.find((client) => client.id === appointment.clientId)?.name ?? "Клиент"}
                      serviceName={services.find((service) => service.id === appointment.serviceId)?.name ?? "Услуга"}
                      masterName={masters.find((master) => master.id === appointment.masterId)?.name ?? "Мастер"}
                      onSelect={onSelectAppointment}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={CalendarX}
                    compact
                    title="Нет записей"
                    description="День свободен"
                    className="px-1 py-10"
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
