import type { Appointment, AppointmentStatus } from "@/types/appointment";

export function filterAppointmentsByMaster(
  appointments: Appointment[],
  masterId: string,
): Appointment[] {
  return appointments.filter((appointment) => appointment.masterId === masterId);
}

export function filterAppointmentsByDate(
  appointments: Appointment[],
  date: string,
): Appointment[] {
  return appointments.filter((appointment) => appointment.date === date);
}

export function filterAppointmentsByStatus(
  appointments: Appointment[],
  status: AppointmentStatus,
): Appointment[] {
  return appointments.filter((appointment) => appointment.status === status);
}
