import { BookingWizard } from "@/components/booking/BookingWizard";
import { appointments } from "@/data/appointments";
import { masters } from "@/data/masters";
import { services } from "@/data/services";

export default function BookPage() {
  const startDate = appointments.map((appointment) => appointment.date).sort()[0];

  return (
    <BookingWizard
      services={services}
      masters={masters}
      appointments={appointments}
      startDate={startDate}
    />
  );
}
