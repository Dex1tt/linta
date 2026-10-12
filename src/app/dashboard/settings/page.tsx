import type { Metadata } from "next";

import { SettingsDashboard } from "@/components/dashboard/SettingsDashboard";
import { masters } from "@/data/masters";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Настройки — Linta",
  description: "Настройки студии, команды и услуг в демо-приложении Linta.",
};

export default function SettingsPage() {
  return <SettingsDashboard masters={masters} services={services} />;
}
