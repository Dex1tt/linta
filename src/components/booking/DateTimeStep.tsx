import { CalendarDays, CalendarX, Clock3 } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { getAvailableBookingSlots } from "@/lib/bookingAvailability";
import type { Appointment } from "@/types/appointment";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";

interface DateTimeStepProps {
  dates: string[];
  selectedDate: string;
  selectedTime: string;
  service: Service;
  selectedMasterIds: string[];
  masters: Master[];
  appointments: Appointment[];
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

const weekdayFormatter = new Intl.DateTimeFormat("ru-RU", { weekday: "short" });
const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" });

export function DateTimeStep({ dates, selectedDate, selectedTime, service, selectedMasterIds, masters, appointments, onSelectDate, onSelectTime }: DateTimeStepProps) {
  const availableSlots = selectedDate
    ? getAvailableBookingSlots({ date: selectedDate, service, masterIds: selectedMasterIds, masters, appointments })
    : [];

  return (
    <div>
      <p className="text-sm font-semibold text-accent">Шаг 3 из 4</p>
      <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">Выберите дату и время</h1>
      <p className="mt-2 text-sm text-slate-500">Показываем только свободные интервалы подходящей длительности.</p>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><CalendarDays className="h-4 w-4 text-accent" />Дата</div>
        <div className="grid grid-cols-3 gap-2 min-[420px]:grid-cols-4 sm:grid-cols-7">
          {dates.map((date) => {
            const isSelected = selectedDate === date;
            const value = new Date(`${date}T12:00:00Z`);
            return (
              <button key={date} type="button" aria-pressed={isSelected} onClick={() => onSelectDate(date)} className={`min-h-14 rounded-xl border px-2 py-3 text-center transition-colors ${isSelected ? "border-accent bg-accent text-white shadow-sm" : "border-slate-200 bg-surface text-ink hover:border-accent/40"}`}>
                <span className={`block text-[11px] font-semibold uppercase ${isSelected ? "text-white/75" : "text-slate-600"}`}>{weekdayFormatter.format(value).replaceAll(".", "")}</span>
                <span className="mt-1 block text-sm font-extrabold">{dateFormatter.format(value).replaceAll(".", "")}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink"><Clock3 className="h-4 w-4 text-accent" />Свободное время</div>
        {availableSlots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {availableSlots.map((time) => (
              <button key={time} type="button" aria-pressed={selectedTime === time} onClick={() => onSelectTime(time)} className={`min-h-11 rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${selectedTime === time ? "border-accent bg-accent text-white" : "border-slate-200 bg-surface text-ink hover:border-accent/40 hover:text-accent"}`}>{time}</button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-ink/15 bg-background">
            <EmptyState
              icon={CalendarX}
              compact
              title={selectedDate ? "На эту дату свободных слотов нет" : "Выберите дату"}
              description={selectedDate ? "Попробуйте выбрать другую дату." : "После выбора даты здесь появится доступное время."}
            />
          </div>
        )}
      </div>
    </div>
  );
}
