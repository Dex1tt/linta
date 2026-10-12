import { BookingCalendar } from "@/components/dashboard/BookingCalendar";
import { appointments } from "@/data/appointments";
import { clients } from "@/data/clients";
import { masters } from "@/data/masters";
import { services } from "@/data/services";

export default function CalendarPage() {
  return (
    <BookingCalendar
      initialAppointments={appointments}
      clients={clients}
      masters={masters}
      services={services}
    />
  );
}
