"use client";

import { Clock3, Scissors, UserRound } from "lucide-react";

import type { Appointment } from "@/types/appointment";

interface WeekAppointmentCardProps {
  appointment: Appointment;
  clientName: string;
  serviceName: string;
  masterName: string;
  onSelect: (appointmentId: string) => void;
}

const statusStyles: Record<Appointment["status"], string> = {
  confirmed: "border-status-confirmed/35 bg-status-confirmed/10 hover:bg-status-confirmed/15",
  pending: "border-status-pending/40 bg-status-pending/10 hover:bg-status-pending/15",
  cancelled: "border-status-cancelled/30 bg-status-cancelled/[0.07] opacity-70 hover:opacity-100",
  paid: "border-status-paid/35 bg-status-paid/10 hover:bg-status-paid/15",
};

const statusDots: Record<Appointment["status"], string> = {
  confirmed: "bg-status-confirmed",
  pending: "bg-status-pending",
  cancelled: "bg-status-cancelled",
  paid: "bg-status-paid",
};

export function WeekAppointmentCard({
  appointment,
  clientName,
  serviceName,
  masterName,
  onSelect,
}: WeekAppointmentCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(appointment.id)}
      aria-label={`${appointment.startTime}, ${clientName}, ${serviceName}, мастер ${masterName}`}
      className={`w-full rounded-xl border p-3 text-left shadow-sm transition-colors ${statusStyles[appointment.status]}`}
    >
      <span className="flex items-center gap-2 text-xs font-extrabold text-ink">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${statusDots[appointment.status]}`} />
        <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-slate-600" />
        {appointment.startTime}–{appointment.endTime}
      </span>
      <span className="mt-2 block truncate text-sm font-extrabold text-ink">{clientName}</span>
      <span className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-slate-600">
        <Scissors aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{serviceName}</span>
      </span>
      <span className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-slate-600">
        <UserRound aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{masterName}</span>
      </span>
    </button>
  );
}
