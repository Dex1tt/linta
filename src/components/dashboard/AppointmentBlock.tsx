"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import { CALENDAR_SLOT_HEIGHT, getAppointmentPosition } from "@/lib/calendar";
import type { Appointment } from "@/types/appointment";

interface AppointmentBlockProps {
  appointment: Appointment;
  clientName: string;
  serviceName: string;
  onSelect: (appointmentId: string) => void;
}

const statusStyles: Record<Appointment["status"], string> = {
  confirmed:
    "border-status-confirmed/35 bg-status-confirmed/15 text-emerald-950",
  pending: "border-status-pending/40 bg-status-pending/20 text-amber-950",
  cancelled:
    "border-status-cancelled/30 bg-status-cancelled/10 text-red-950 opacity-70",
  paid: "border-status-paid/35 bg-status-paid/15 text-blue-950",
};

export function AppointmentBlock({
  appointment,
  clientName,
  serviceName,
  onSelect,
}: AppointmentBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: appointment.id,
      data: { appointmentId: appointment.id },
    });
  const { top } = getAppointmentPosition(
    appointment.startTime,
    appointment.endTime,
  );

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`absolute inset-x-1 z-10 flex items-center gap-2 overflow-hidden rounded-lg border px-2.5 text-left shadow-sm transition-shadow hover:z-20 hover:shadow-md focus-visible:z-30 ${statusStyles[appointment.status]} ${isDragging ? "z-50 cursor-grabbing opacity-80 shadow-lg" : "cursor-grab"}`}
      style={{
        top: top + 2,
        height: CALENDAR_SLOT_HEIGHT - 4,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(appointment.id);
      }}
      aria-label={`${appointment.startTime}, ${clientName}, ${serviceName}`}
      {...listeners}
      {...attributes}
    >
      <span className="shrink-0 text-[11px] font-extrabold">{appointment.startTime}</span>
      <span className="min-w-0 flex-1 truncate text-xs font-semibold">{clientName}</span>
      <GripVertical aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-45" />
    </button>
  );
}
