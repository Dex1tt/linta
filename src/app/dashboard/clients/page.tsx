import { ClientsList, type ClientListItem } from "@/components/dashboard/ClientsList";
import { appointments } from "@/data/appointments";
import { clients } from "@/data/clients";

export default function ClientsPage() {
  const clientItems: ClientListItem[] = clients.map((client) => {
    const clientAppointments = appointments.filter(
      (appointment) => appointment.clientId === client.id,
    );
    const lastAppointment = clientAppointments
      .filter((appointment) => appointment.status !== "cancelled")
      .sort((first, second) =>
        `${second.date} ${second.startTime}`.localeCompare(
          `${first.date} ${first.startTime}`,
        ),
      )[0];

    return {
      ...client,
      visitsCount: clientAppointments.length,
      lastVisit: lastAppointment?.date ?? null,
    };
  });

  return <ClientsList clients={clientItems} />;
}
