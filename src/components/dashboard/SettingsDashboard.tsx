"use client";

import { useState, type FormEvent } from "react";
import {
  Building2,
  Clock3,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Scissors,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";

import { formatPrice } from "@/lib/formatPrice";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";

interface SettingsDashboardProps {
  masters: Master[];
  services: Service[];
}

type SettingsTab = "studio" | "masters" | "services";

const tabs: Array<{
  id: SettingsTab;
  label: string;
  icon: typeof Building2;
}> = [
  { id: "studio", label: "Студия", icon: Building2 },
  { id: "masters", label: "Мастера", icon: UsersRound },
  { id: "services", label: "Услуги", icon: Scissors },
];

const dayNames: Record<number, string> = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  7: "Вс",
};

function formatWorkingHours(master: Master): string {
  const days = master.workingHours.daysOfWeek.map((day) => dayNames[day]).join(", ");
  return `${days} · ${master.workingHours.start}–${master.workingHours.end}`;
}

export function SettingsDashboard({ masters, services }: SettingsDashboardProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("studio");
  const [studio, setStudio] = useState({
    name: "Студия «Тёплый дом»",
    address: "Красноярск, ул. Мира, 42",
    phone: "+7 913-167-49-23",
    weekdays: "09:00–21:00",
    weekends: "10:00–20:00",
  });

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Настройки сохранены");
  }

  function showDevelopmentToast() {
    toast.info("Функция в разработке");
  }

  return (
    <section className="min-w-0">
      <div>
        <p className="text-sm font-semibold text-accent">Управление студией</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Настройки
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Основные данные студии, команда и каталог услуг в одном месте.
        </p>
      </div>

      <div className="mt-7 overflow-x-auto rounded-xl border border-slate-200 bg-surface p-1.5 shadow-sm">
        <div className="flex min-w-max gap-1" role="tablist" aria-label="Разделы настроек">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`settings-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`settings-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold transition-colors sm:px-5 ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "text-slate-600 hover:bg-background hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "studio" ? (
        <div
          id="settings-panel-studio"
          role="tabpanel"
          aria-labelledby="settings-tab-studio"
          className="mt-5 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-7"
        >
          <div>
            <h2 className="text-xl font-extrabold text-ink">Данные студии</h2>
            <p className="mt-1 text-sm text-slate-600">
              Эти данные отображаются для клиентов при онлайн-записи.
            </p>
          </div>

          <form className="mt-7" onSubmit={handleSave}>
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <Building2 aria-hidden="true" className="h-4 w-4 text-accent" />
                  Название студии
                </span>
                <input
                  value={studio.name}
                  onChange={(event) => setStudio((current) => ({ ...current, name: event.target.value }))}
                  autoComplete="organization"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink transition-colors focus-visible:border-accent"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <Phone aria-hidden="true" className="h-4 w-4 text-accent" />
                  Телефон
                </span>
                <input
                  type="tel"
                  value={studio.phone}
                  onChange={(event) => setStudio((current) => ({ ...current, phone: event.target.value }))}
                  autoComplete="tel"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink transition-colors focus-visible:border-accent"
                />
              </label>

              <label className="block lg:col-span-2">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-accent" />
                  Адрес
                </span>
                <input
                  value={studio.address}
                  onChange={(event) => setStudio((current) => ({ ...current, address: event.target.value }))}
                  autoComplete="street-address"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink transition-colors focus-visible:border-accent"
                />
              </label>
            </div>

            <fieldset className="mt-7 rounded-xl border border-slate-200 bg-background p-4 sm:p-5">
              <legend className="px-2 text-sm font-extrabold text-ink">Часы работы</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Clock3 aria-hidden="true" className="h-4 w-4" />
                    Понедельник — пятница
                  </span>
                  <input
                    value={studio.weekdays}
                    onChange={(event) => setStudio((current) => ({ ...current, weekdays: event.target.value }))}
                    aria-label="Часы работы с понедельника по пятницу"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink transition-colors focus-visible:border-accent"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Clock3 aria-hidden="true" className="h-4 w-4" />
                    Суббота — воскресенье
                  </span>
                  <input
                    value={studio.weekends}
                    onChange={(event) => setStudio((current) => ({ ...current, weekends: event.target.value }))}
                    aria-label="Часы работы в субботу и воскресенье"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-ink transition-colors focus-visible:border-accent"
                  />
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent/90 sm:w-auto"
            >
              <Save aria-hidden="true" className="h-4 w-4" />
              Сохранить изменения
            </button>
          </form>
        </div>
      ) : null}

      {activeTab === "masters" ? (
        <div
          id="settings-panel-masters"
          role="tabpanel"
          aria-labelledby="settings-tab-masters"
          className="mt-5 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-7"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-ink">Команда</h2>
              <p className="mt-1 text-sm text-slate-600">{masters.length} мастеров подключено к студии</p>
            </div>
            <button
              type="button"
              onClick={showDevelopmentToast}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-white transition-colors hover:bg-accent/90 sm:w-auto"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Добавить мастера
            </button>
          </div>

          <ul className="mt-6 divide-y divide-slate-200">
            {masters.map((master) => (
              <li key={master.id} className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-sm font-extrabold text-accent">
                    {master.avatar}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-extrabold text-ink">{master.name}</h3>
                    <p className="mt-0.5 text-sm text-slate-600">{master.specialization}</p>
                    <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-slate-600">
                      <Clock3 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {formatWorkingHours(master)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={showDevelopmentToast}
                  className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent sm:w-auto"
                >
                  <Pencil aria-hidden="true" className="h-4 w-4" />
                  Редактировать
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {activeTab === "services" ? (
        <div
          id="settings-panel-services"
          role="tabpanel"
          aria-labelledby="settings-tab-services"
          className="mt-5 rounded-xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-7"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-ink">Каталог услуг</h2>
              <p className="mt-1 text-sm text-slate-600">Цены и длительность услуг для онлайн-записи</p>
            </div>
            <button
              type="button"
              onClick={showDevelopmentToast}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-white transition-colors hover:bg-accent/90 sm:w-auto"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Добавить услугу
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="hidden grid-cols-[minmax(0,1fr)_140px_140px] gap-4 bg-background px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 sm:grid">
              <span>Услуга</span>
              <span>Длительность</span>
              <span className="text-right">Цена</span>
            </div>
            <ul className="divide-y divide-slate-200">
              {services.map((service) => (
                <li key={service.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_140px_140px] sm:items-center sm:gap-4 sm:px-5">
                  <h3 className="font-bold text-ink">{service.name}</h3>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock3 aria-hidden="true" className="h-4 w-4 sm:hidden" />
                    {service.duration} мин
                  </p>
                  <p className="text-base font-extrabold text-ink sm:text-right">{formatPrice(service.price)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
