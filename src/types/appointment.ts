export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "paid";

export interface Appointment {
  id: string;
  clientId: string;
  masterId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  depositPaid: boolean;
  notes: string;
}
