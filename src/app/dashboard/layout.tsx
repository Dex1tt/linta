import type { Metadata } from "next";

import { Sidebar } from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Дашборд — Linta",
  description: "Панель управления студией Linta.",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="min-h-screen md:pl-20 lg:pl-64">
        <div className="mx-auto max-w-[1600px] px-4 pb-6 pt-20 sm:px-6 md:py-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
