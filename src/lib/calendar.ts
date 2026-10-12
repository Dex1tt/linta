export const CALENDAR_START_MINUTES = 9 * 60;
export const CALENDAR_END_MINUTES = 21 * 60;
export const CALENDAR_SLOT_MINUTES = 30;
export const CALENDAR_SLOT_HEIGHT = 48;

export function timeToMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getAppointmentPosition(startTime: string, endTime: string) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return {
    top:
      ((startMinutes - CALENDAR_START_MINUTES) / CALENDAR_SLOT_MINUTES) *
      CALENDAR_SLOT_HEIGHT,
    height: Math.max(
      ((endMinutes - startMinutes) / CALENDAR_SLOT_MINUTES) *
        CALENDAR_SLOT_HEIGHT,
      CALENDAR_SLOT_HEIGHT - 4,
    ),
  };
}

export function shiftIsoDate(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);

  return value.toISOString().slice(0, 10);
}

export function getIsoWeekStart(date: string): string {
  const value = new Date(`${date}T12:00:00Z`);
  const day = value.getUTCDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;

  return shiftIsoDate(date, -daysFromMonday);
}

export function getIsoWeekDates(date: string): string[] {
  const weekStart = getIsoWeekStart(date);

  return Array.from({ length: 7 }, (_, index) => shiftIsoDate(weekStart, index));
}

export function getLocalIsoDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatWeekRange(date: string): string {
  const [startDate, , , , , , endDate] = getIsoWeekDates(date);
  const start = new Date(`${startDate}T12:00:00Z`);
  const end = new Date(`${endDate}T12:00:00Z`);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const monthFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

  if (sameMonth) {
    const month = monthFormatter
      .formatToParts(end)
      .find((part) => part.type === "month")?.value;

    return `${start.getUTCDate()}–${end.getUTCDate()} ${month}`;
  }

  const startFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" as const }),
  });
  const endFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" as const }),
  });

  return `${startFormatter.format(start)} — ${endFormatter.format(end)}`;
}

