"use client";

import { useMemo, useState } from "react";
import { DndContext, PointerSensor, pointerWithin, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarX, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, UserRoundSearch } from "lucide-react";
import { toast } from "sonner";

import { CALENDAR_END_MINUTES, CALENDAR_SLOT_HEIGHT, CALENDAR_SLOT_MINUTES, CALENDAR_START_MINUTES, formatWeekRange, getIsoWeekStart, minutesToTime, shiftIsoDate, timeToMinutes } from "@/lib/calendar";
import { filterAppointmentsByDate } from "@/lib/mockDataHelpers";
import type { Appointment } from "@/types/appointment";
import type { Client } from "@/types/client";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";
import { EmptyState } from "@/components/ui/EmptyState";
import { AppointmentBlock } from "./AppointmentBlock";
import { AppointmentDetailsPanel } from "./AppointmentDetailsPanel";
import { CalendarTimeSlot } from "./CalendarTimeSlot";
import { CreateAppointmentPanel } from "./CreateAppointmentPanel";
import { WeekCalendar } from "./WeekCalendar";

interface BookingCalendarProps {
  initialAppointments: Appointment[];
  clients: Client[];
  masters: Master[];
  services: Service[];
}

interface CreatePanelState {
  masterId: string;
  startTime: string;
}

type CalendarView = "day" | "week";

const slots = Array.from({ length: (CALENDAR_END_MINUTES - CALENDAR_START_MINUTES) / CALENDAR_SLOT_MINUTES }, (_, index) => CALENDAR_START_MINUTES + index * CALENDAR_SLOT_MINUTES);
const calendarHeight = slots.length * CALENDAR_SLOT_HEIGHT;

export function BookingCalendar({ initialAppointments, clients, masters, services }: BookingCalendarProps) {
  const firstDate = initialAppointments.map((item) => item.date).sort()[0];
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedDate, setSelectedDate] = useState(firstDate ?? new Date().toISOString().slice(0, 10));
  const [viewMode, setViewMode] = useState<CalendarView>("day");
  const [selectedMasterIds, setSelectedMasterIds] = useState(() => new Set(masters.map((master) => master.id)));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [createPanel, setCreatePanel] = useState<CreatePanelState | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const visibleMasters = masters.filter((master) => selectedMasterIds.has(master.id));
  const dayAppointments = useMemo(() => filterAppointmentsByDate(appointments, selectedDate), [appointments, selectedDate]);
  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedAppointmentId);

  function toggleMaster(masterId: string) {
    setSelectedMasterIds((current) => {
      const next = new Set(current);
      if (next.has(masterId)) next.delete(masterId);
      else next.add(masterId);
      return next;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const appointmentId = String(event.active.id);
    const target = event.over?.data.current as { masterId?: string; startMinutes?: number } | undefined;
    if (!target?.masterId || typeof target.startMinutes !== "number") return;
    const targetMasterId = target.masterId;
    const targetStartMinutes = target.startMinutes;
    const targetStartTime = minutesToTime(targetStartMinutes);
    const draggedAppointment = appointments.find((appointment) => appointment.id === appointmentId);
    if (!draggedAppointment) return;

    const isSameSlot =
      draggedAppointment.date === selectedDate &&
      draggedAppointment.masterId === targetMasterId &&
      draggedAppointment.startTime === targetStartTime;
    if (isSameSlot) return;

    const isOccupied = appointments.some(
      (appointment) =>
        appointment.id !== appointmentId &&
        appointment.date === selectedDate &&
        appointment.masterId === targetMasterId &&
        appointment.startTime === targetStartTime,
    );
    if (isOccupied) return;

    setAppointments((current) =>
      current.map((appointment) => {
        if (appointment.id !== appointmentId) return appointment;
        const duration = timeToMinutes(appointment.endTime) - timeToMinutes(appointment.startTime);
        const endMinutes = targetStartMinutes + duration;
        return { ...appointment, masterId: targetMasterId, date: selectedDate, startTime: targetStartTime, endTime: minutesToTime(endMinutes) };
      }),
    );
    toast.success(`Запись перенесена на ${targetStartTime}`);
  }

  function isSlotAvailable(masterId: string, startTime: string) {
    return !appointments.some(
      (appointment) =>
        appointment.date === selectedDate &&
        appointment.masterId === masterId &&
        appointment.startTime === startTime,
    );
  }

  function updateAppointmentStatus(status: Appointment["status"]) {
    if (!selectedAppointmentId) return;
    setAppointments((current) => current.map((appointment) => appointment.id === selectedAppointmentId ? { ...appointment, status } : appointment));
    toast.success("Статус записи обновлён");
  }

  const formattedDate = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${selectedDate}T12:00:00`));
  const weekRange = formatWeekRange(selectedDate);
  const navigationStep = viewMode === "week" ? 7 : 1;

  return (
    <section className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Расписание студии</p>
          <h1 className="mt-1 text-2xl font-extrabold capitalize tracking-tight text-ink sm:text-4xl">
            {viewMode === "day" ? formattedDate : weekRange}
          </h1>
        </div>
        <div className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <div className="col-span-2 flex items-center justify-between rounded-full border border-slate-200 bg-surface p-1 shadow-sm sm:col-auto">
            <button type="button" className={`flex h-11 shrink-0 items-center justify-center gap-1 rounded-full px-3 text-slate-600 transition-colors hover:bg-background hover:text-ink ${viewMode === "day" ? "w-11" : "sm:px-4"}`} onClick={() => setSelectedDate((date) => shiftIsoDate(date, -navigationStep))} aria-label={viewMode === "day" ? "Предыдущий день" : "Предыдущая неделя"}>
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              {viewMode === "week" ? <span className="hidden text-xs font-bold sm:inline">Предыдущая неделя</span> : null}
            </button>
            {viewMode === "day" ? (
              <input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="min-h-11 min-w-0 flex-1 rounded-full bg-transparent px-1 text-center text-sm font-bold text-ink sm:flex-none sm:px-2" aria-label="Выбрать дату" />
            ) : (
              <span className="min-w-0 flex-1 px-1 text-center text-xs font-extrabold text-ink sm:min-w-40 sm:text-sm">{weekRange}</span>
            )}
            <button type="button" className={`flex h-11 shrink-0 items-center justify-center gap-1 rounded-full px-3 text-slate-600 transition-colors hover:bg-background hover:text-ink ${viewMode === "day" ? "w-11" : "sm:px-4"}`} onClick={() => setSelectedDate((date) => shiftIsoDate(date, navigationStep))} aria-label={viewMode === "day" ? "Следующий день" : "Следующая неделя"}>
              {viewMode === "week" ? <span className="hidden text-xs font-bold sm:inline">Следующая неделя</span> : null}
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <div className="flex rounded-full border border-slate-200 bg-surface p-1 shadow-sm" role="group" aria-label="Режим календаря">
            <button type="button" aria-pressed={viewMode === "day"} onClick={() => setViewMode("day")} className={`min-h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors sm:px-4 ${viewMode === "day" ? "bg-accent text-white shadow-sm" : "text-slate-600 hover:text-ink"}`}>День</button>
            <button type="button" aria-pressed={viewMode === "week"} onClick={() => setViewMode("week")} className={`min-h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors sm:px-4 ${viewMode === "week" ? "bg-accent text-white shadow-sm" : "text-slate-600 hover:text-ink"}`}>Неделя</button>
          </div>
          <div className="relative">
            <button type="button" className="inline-flex min-h-[54px] w-full items-center justify-between gap-2 rounded-full border border-slate-200 bg-surface px-3 text-sm font-bold text-ink shadow-sm transition-colors hover:border-accent/40 sm:min-h-11 sm:w-auto sm:px-4" onClick={() => setIsFilterOpen((value) => !value)} aria-expanded={isFilterOpen} aria-controls="master-filter-options">
              <SlidersHorizontal className="h-4 w-4 text-accent" /> Мастера: {selectedMasterIds.size === masters.length ? "все" : selectedMasterIds.size}<ChevronDown className="h-4 w-4 text-slate-600" />
            </button>
            {isFilterOpen ? (
              <div id="master-filter-options" className="absolute right-0 top-[calc(100%+8px)] z-40 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-surface p-3 shadow-lg">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-ink hover:bg-background">
                  <input type="checkbox" checked={selectedMasterIds.size === masters.length} onChange={() => setSelectedMasterIds(selectedMasterIds.size === masters.length ? new Set() : new Set(masters.map((master) => master.id)))} className="h-4 w-4 accent-accent" /> Показать всех
                </label>
                <div className="my-2 border-t border-slate-200" />
                {masters.map((master) => (
                  <label key={master.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-background">
                    <input type="checkbox" checked={selectedMasterIds.has(master.id)} onChange={() => toggleMaster(master.id)} className="h-4 w-4 accent-accent" />
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/10 text-[10px] font-extrabold text-accent">{master.avatar}</span><span className="truncate">{master.name}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <DndContext id="booking-calendar-dnd" sensors={sensors} collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <AnimatePresence mode="wait">
          <motion.div key={`${viewMode}-${viewMode === "week" ? getIsoWeekStart(selectedDate) : selectedDate}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-sm">
            {visibleMasters.length > 0 ? (
              viewMode === "day" ? (
              <div className="max-h-[68vh] min-h-[480px] touch-pan-x overflow-auto overscroll-contain sm:min-h-[520px] lg:max-h-[calc(100vh-230px)]">
                <div
                  className="grid w-full"
                  style={{
                    gridTemplateColumns: `72px repeat(${visibleMasters.length}, minmax(178px, 1fr))`,
                    minWidth: Math.max(720, 72 + visibleMasters.length * 178),
                  }}
                >
                  <div className="sticky left-0 top-0 z-40 flex h-20 items-end border-b border-r border-slate-200 bg-surface px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    Время
                  </div>
                  {visibleMasters.map((master) => (
                    <div key={master.id} className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-r border-slate-200 bg-surface px-4 last:border-r-0">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-extrabold text-accent">{master.avatar}</span>
                      <span className="min-w-0"><span className="block truncate text-sm font-extrabold text-ink">{master.name}</span><span className="block truncate text-xs text-slate-500">{master.specialization}</span></span>
                    </div>
                  ))}
                  <div className="sticky left-0 z-20 border-r border-slate-200 bg-surface" style={{ height: calendarHeight }}>
                    {slots.map((minute) => (
                      <div
                        key={minute}
                        className={`flex items-center justify-end border-b pr-3 text-xs ${(minute + CALENDAR_SLOT_MINUTES) % 60 === 0 ? "border-slate-300/80" : "border-slate-200/70"} ${minute % 60 === 0 ? "font-bold text-slate-500" : "font-medium text-slate-600"}`}
                        style={{ height: CALENDAR_SLOT_HEIGHT }}
                      >
                        {minutesToTime(minute)}
                      </div>
                    ))}
                  </div>
                  {visibleMasters.map((master) => {
                    const masterAppointments = dayAppointments.filter((appointment) => appointment.masterId === master.id);

                    return (
                      <div key={master.id} className="relative border-r border-slate-200 last:border-r-0" style={{ height: calendarHeight }}>
                        {slots.map((minute) => {
                          const startTime = minutesToTime(minute);
                          return <CalendarTimeSlot key={minute} masterId={master.id} startMinutes={minute} isOccupied={!isSlotAvailable(master.id, startTime)} onCreate={(masterId, slotTime) => setCreatePanel({ masterId, startTime: slotTime })} />;
                        })}
                        {masterAppointments.map((appointment) => (
                          <AppointmentBlock
                            key={appointment.id}
                            appointment={appointment}
                            clientName={clients.find((client) => client.id === appointment.clientId)?.name ?? "Клиент"}
                            serviceName={services.find((service) => service.id === appointment.serviceId)?.name ?? "Услуга"}
                            onSelect={setSelectedAppointmentId}
                          />
                        ))}
                        {masterAppointments.length === 0 ? (
                          <EmptyState
                            icon={CalendarX}
                            compact
                            title="Нет записей на этот день"
                            description="Нажмите на слот времени, чтобы создать запись."
                            className="pointer-events-none absolute inset-x-3 top-24 z-10 rounded-xl border border-ink/10 bg-surface/95 px-3 shadow-sm backdrop-blur-sm"
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
              ) : (
                <WeekCalendar
                  selectedDate={selectedDate}
                  appointments={appointments}
                  clients={clients}
                  masters={masters}
                  services={services}
                  selectedMasterIds={selectedMasterIds}
                  onSelectAppointment={setSelectedAppointmentId}
                />
              )
            ) : (
              <EmptyState
                icon={UserRoundSearch}
                title="Выберите хотя бы одного мастера"
                description="Откройте фильтр и включите нужные колонки."
              />
            )}
          </motion.div>
        </AnimatePresence>
      </DndContext>
      <p className="mt-3 text-sm leading-5 text-slate-500">
        {viewMode === "day" ? (
          <><span className="font-semibold text-ink/70 sm:hidden">Проведите по календарю вбок, чтобы увидеть всех мастеров. </span>Нажмите на пустой слот, чтобы создать запись. Перетащите запись, чтобы изменить время или мастера.</>
        ) : (
          <><span className="font-semibold text-ink/70 sm:hidden">Проведите по календарю вбок, чтобы увидеть всю неделю. </span>Нажмите на запись, чтобы открыть подробности.</>
        )}
      </p>

      <AnimatePresence>
        {selectedAppointment ? <AppointmentDetailsPanel key="details" appointment={selectedAppointment} client={clients.find((client) => client.id === selectedAppointment.clientId)} master={masters.find((master) => master.id === selectedAppointment.masterId)} service={services.find((service) => service.id === selectedAppointment.serviceId)} onClose={() => setSelectedAppointmentId(null)} onStatusChange={updateAppointmentStatus} /> : null}
        {createPanel ? <CreateAppointmentPanel key={`${createPanel.masterId}-${createPanel.startTime}`} date={selectedDate} initialMasterId={createPanel.masterId} initialStartTime={createPanel.startTime} clients={clients} masters={masters} services={services} isSlotAvailable={isSlotAvailable} onClose={() => setCreatePanel(null)} onCreate={(appointment) => { setAppointments((current) => [...current, appointment]); setCreatePanel(null); setSelectedAppointmentId(appointment.id); }} /> : null}
      </AnimatePresence>
    </section>
  );
}
