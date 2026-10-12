"use client";

import { useDroppable } from "@dnd-kit/core";

import { CALENDAR_SLOT_HEIGHT, minutesToTime } from "@/lib/calendar";

interface CalendarTimeSlotProps {
  masterId: string;
  startMinutes: number;
  isOccupied: boolean;
  onCreate: (masterId: string, startTime: string) => void;
}

export function CalendarTimeSlot({
  masterId,
  startMinutes,
  isOccupied,
  onCreate,
}: CalendarTimeSlotProps) {
  const startTime = minutesToTime(startMinutes);
  const id = `slot:${masterId}:${startMinutes}`;
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { masterId, startMinutes },
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`block w-full border-b text-left transition-colors ${(startMinutes + 30) % 60 === 0 ? "border-slate-300/80" : "border-slate-200/70"} ${isOver ? "bg-accent/15" : isOccupied ? "cursor-not-allowed bg-slate-50/70" : "bg-transparent hover:bg-accent/5 focus-visible:bg-accent/10"}`}
      style={{ height: CALENDAR_SLOT_HEIGHT }}
      onClick={() => {
        if (!isOccupied) onCreate(masterId, startTime);
      }}
      aria-label={isOccupied ? `Время ${startTime} занято` : `Создать запись на ${startTime}`}
    />
  );
}
