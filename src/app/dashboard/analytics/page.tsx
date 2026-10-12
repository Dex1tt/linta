import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { analyticsAppointments } from "@/data/appointments";
import { clients } from "@/data/clients";
import { masters } from "@/data/masters";
import { services } from "@/data/services";

export default function AnalyticsPage() {
  return (
    <AnalyticsDashboard
      appointments={analyticsAppointments}
      clients={clients}
      masters={masters}
      services={services}
    />
  );
}
