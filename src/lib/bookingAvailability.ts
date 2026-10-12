import { minutesToTime, timeToMinutes } from "@/lib/calendar";
import type { Appointment } from "@/types/appointment";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";

interface AvailabilityParams {
  date: string;
  service: Service;
  masterIds: string[];
  masters: Master[];
  appointments: Appointment[];
}

function getIsoWeekday(date: string): number {
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  return weekday === 0 ? 7 : weekday;
}

function isMasterAvailable(
  master: Master,
  date: string,
  startMinutes: number,
  duration: number,
  appointments: Appointment[],
): boolean {
  if (!master.workingHours.daysOfWeek.includes(getIsoWeekday(date) as 1 | 2 | 3 | 4 | 5 | 6 | 7)) {
    return false;
  }

  const workStart = timeToMinutes(master.workingHours.start);
  const workEnd = timeToMinutes(master.workingHours.end);
  const endMinutes = startMinutes + duration;

  if (startMinutes < workStart || endMinutes > workEnd) {
    return false;
  }

  return !appointments.some((appointment) => {
    if (
      appointment.masterId !== master.id ||
      appointment.date !== date ||
      appointment.status === "cancelled"
    ) {
      return false;
    }

    const appointmentStart = timeToMinutes(appointment.startTime);
    const appointmentEnd = timeToMinutes(appointment.endTime);
    return startMinutes < appointmentEnd && endMinutes > appointmentStart;
  });
}

export function getAvailableBookingSlots({
  date,
  service,
  masterIds,
  masters,
  appointments,
}: AvailabilityParams): string[] {
  const selectedMasters = masters.filter((master) => masterIds.includes(master.id));
  if (selectedMasters.length === 0) return [];

  const earliestStart = Math.min(
    ...selectedMasters.map((master) => timeToMinutes(master.workingHours.start)),
  );
  const latestEnd = Math.max(
    ...selectedMasters.map((master) => timeToMinutes(master.workingHours.end)),
  );
  const slots: string[] = [];

  for (let startMinutes = earliestStart; startMinutes + service.duration <= latestEnd; startMinutes += 30) {
    if (
      selectedMasters.some((master) =>
        isMasterAvailable(master, date, startMinutes, service.duration, appointments),
      )
    ) {
      slots.push(minutesToTime(startMinutes));
    }
  }

  return slots;
}

export function findAvailableMaster(
  date: string,
  startTime: string,
  service: Service,
  masterIds: string[],
  masters: Master[],
  appointments: Appointment[],
): Master | undefined {
  const startMinutes = timeToMinutes(startTime);

  return masters.find(
    (master) =>
      masterIds.includes(master.id) &&
      isMasterAvailable(master, date, startMinutes, service.duration, appointments),
  );
}

export function getBookingDates(startDate: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(`${startDate}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
}
