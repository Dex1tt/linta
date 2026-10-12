"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";

import { minutesToTime, timeToMinutes } from "@/lib/calendar";
import { useFocusTrap } from "@/lib/useFocusTrap";
import type { Appointment } from "@/types/appointment";
import type { Client } from "@/types/client";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";
import { DashboardFormField } from "./DashboardFormField";

interface CreateAppointmentPanelProps {
  date: string;
  initialMasterId: string;
  initialStartTime: string;
  clients: Client[];
  masters: Master[];
  services: Service[];
  isSlotAvailable: (masterId: string, startTime: string) => boolean;
  onClose: () => void;
  onCreate: (appointment: Appointment) => void;
}

export function CreateAppointmentPanel({ date, initialMasterId, initialStartTime, clients, masters, services, isSlotAvailable, onClose, onCreate }: CreateAppointmentPanelProps) {
  const dialogRef = useFocusTrap<HTMLElement>(onClose);
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [masterId, setMasterId] = useState(initialMasterId);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [error, setError] = useState("");
  const selectedMaster = masters.find((master) => master.id === masterId);
  const availableServices = useMemo(
    () => services.filter((service) => selectedMaster?.servicesIds.includes(service.id)),
    [selectedMaster, services],
  );
  const [serviceId, setServiceId] = useState(
    () => services.find((service) => masters.find((master) => master.id === initialMasterId)?.servicesIds.includes(service.id))?.id ?? services[0]?.id ?? "",
  );
  const effectiveServiceId = availableServices.some((service) => service.id === serviceId)
    ? serviceId
    : (availableServices[0]?.id ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const service = services.find((item) => item.id === effectiveServiceId);
    if (!clientId || !masterId || !service) return;
    if (!isSlotAvailable(masterId, startTime)) {
      setError("У этого мастера уже есть запись на выбранное время.");
      return;
    }

    const endMinutes = Math.min(timeToMinutes(startTime) + service.duration, 21 * 60);
    onCreate({
      id: `appointment-local-${Date.now()}`,
      clientId,
      masterId,
      serviceId: service.id,
      date,
      startTime,
      endTime: minutesToTime(endMinutes),
      status: "pending",
      depositPaid: false,
      notes: "Создано администратором в календаре",
    });
  }

  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" tabIndex={-1} aria-label="Закрыть форму создания записи" className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[2px]" onClick={onClose} />
      <motion.aside ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="create-appointment-title" tabIndex={-1} className="relative z-10 h-full w-full max-w-md overflow-y-auto bg-surface p-6 shadow-2xl sm:p-8" initial={{ x: 48, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 48, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 32 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-accent">Новая запись</p>
            <h2 id="create-appointment-title" className="mt-1 text-2xl font-extrabold text-ink">Добавить клиента</h2>
          </div>
          <button type="button" autoFocus className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-background hover:text-ink" onClick={onClose} aria-label="Закрыть форму"><X aria-hidden="true" className="h-5 w-5" /></button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <DashboardFormField label="Клиент">
            <select value={clientId} onChange={(event) => setClientId(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-ink transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10">
              {clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </DashboardFormField>
          <DashboardFormField label="Мастер">
            <select value={masterId} onChange={(event) => {
              const nextMasterId = event.target.value;
              const nextMaster = masters.find((master) => master.id === nextMasterId);
              setMasterId(nextMasterId);
              setServiceId(services.find((service) => nextMaster?.servicesIds.includes(service.id))?.id ?? "");
            }} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-ink transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10">
              {masters.map((master) => <option key={master.id} value={master.id}>{master.name}</option>)}
            </select>
          </DashboardFormField>
          <DashboardFormField label="Услуга">
            <select value={effectiveServiceId} onChange={(event) => setServiceId(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-ink transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10">
              {availableServices.map((service) => <option key={service.id} value={service.id}>{service.name} · {service.duration} мин</option>)}
            </select>
          </DashboardFormField>
          <DashboardFormField label="Время">
            <input type="time" min="09:00" max="20:30" step={1800} value={startTime} onChange={(event) => { setStartTime(event.target.value); setError(""); }} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-ink transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10" />
          </DashboardFormField>
          {error ? <p role="alert" className="rounded-xl bg-status-cancelled/10 px-4 py-3 text-sm font-semibold text-status-cancelled">{error}</p> : null}
          <button type="submit" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50" disabled={!effectiveServiceId}>
            <Plus className="h-4 w-4" /> Создать запись
          </button>
        </form>
      </motion.aside>
    </motion.div>
  );
}
