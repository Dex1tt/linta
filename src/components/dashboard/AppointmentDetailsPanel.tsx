"use client";

import { motion } from "framer-motion";
import { CalendarDays, Check, Clock3, CreditCard, UserRound, X } from "lucide-react";

import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import { useFocusTrap } from "@/lib/useFocusTrap";
import type { Appointment } from "@/types/appointment";
import type { Client } from "@/types/client";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";
import { AppointmentDetailRow } from "./AppointmentDetailRow";

interface AppointmentDetailsPanelProps {
  appointment: Appointment;
  client?: Client;
  master?: Master;
  service?: Service;
  onClose: () => void;
  onStatusChange: (status: Appointment["status"]) => void;
}

const statusLabels: Record<Appointment["status"], string> = {
  confirmed: "Подтверждена",
  pending: "Ожидает подтверждения",
  cancelled: "Отменена",
  paid: "Оплачена",
};

export function AppointmentDetailsPanel({
  appointment,
  client,
  master,
  service,
  onClose,
  onStatusChange,
}: AppointmentDetailsPanelProps) {
  const dialogRef = useFocusTrap<HTMLElement>(onClose);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Закрыть детали записи"
        className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-details-title"
        tabIndex={-1}
        className="relative z-10 h-full w-full max-w-md overflow-y-auto bg-surface p-6 shadow-2xl sm:p-8"
        initial={{ x: 48, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 48, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-accent">Детали записи</p>
            <h2 id="appointment-details-title" className="mt-1 text-2xl font-extrabold text-ink">
              {client?.name ?? "Клиент"}
            </h2>
          </div>
          <button
            type="button"
            autoFocus
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-background hover:text-ink"
            onClick={onClose}
            aria-label="Закрыть панель"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 space-y-3">
          <AppointmentDetailRow icon={CalendarDays} label="Дата" value={formatDate(appointment.date)} />
          <AppointmentDetailRow icon={Clock3} label="Время" value={`${appointment.startTime}–${appointment.endTime}`} />
          <AppointmentDetailRow icon={UserRound} label="Мастер" value={master?.name ?? "Не указан"} />
          <AppointmentDetailRow icon={CreditCard} label="Услуга" value={service ? `${service.name} · ${formatPrice(service.price)}` : "Не указана"} />
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Статус</p>
          <p className="mt-1 font-bold text-ink">{statusLabels[appointment.status]}</p>
          <p className="mt-1 text-sm text-slate-600">
            {appointment.depositPaid ? "Депозит внесён" : "Без депозита"}
          </p>
        </div>

        {appointment.notes ? (
          <div className="mt-4 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Заметка</p>
            <p className="mt-2 text-sm leading-6 text-ink">{appointment.notes}</p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90"
            onClick={() => onStatusChange("confirmed")}
          >
            <Check className="h-4 w-4" />
            Подтвердить
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            onClick={() => onStatusChange("pending")}
          >
            Перенести
          </button>
          <button
            type="button"
            className="rounded-full border border-status-cancelled/30 px-5 py-3 text-sm font-bold text-status-cancelled transition-colors hover:bg-status-cancelled/10"
            onClick={() => onStatusChange("cancelled")}
          >
            Отменить
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}
