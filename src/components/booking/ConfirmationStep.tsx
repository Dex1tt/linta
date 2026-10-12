import { CalendarDays, Clock3, Scissors, UserRound } from "lucide-react";
import Link from "next/link";

import { formatShortDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";

interface ConfirmationStepProps {
  service: Service;
  master: Master;
  date: string;
  time: string;
  name: string;
  phone: string;
  consent: boolean;
  error: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onConsentChange: (consent: boolean) => void;
}

export function ConfirmationStep({ service, master, date, time, name, phone, consent, error, onNameChange, onPhoneChange, onConsentChange }: ConfirmationStepProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-accent">Шаг 4 из 4</p>
      <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">Подтвердите запись</h1>
      <p className="mt-2 text-sm text-slate-500">Проверьте детали и оставьте контактный номер.</p>

      <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-background p-4 sm:grid-cols-2">
        <div className="flex items-center gap-3"><Scissors className="h-4 w-4 shrink-0 text-accent" /><div><p className="text-xs text-slate-600">Услуга</p><p className="text-sm font-bold text-ink">{service.name}</p></div></div>
        <div className="flex items-center gap-3"><UserRound className="h-4 w-4 shrink-0 text-accent" /><div><p className="text-xs text-slate-600">Мастер</p><p className="text-sm font-bold text-ink">{master.name}</p></div></div>
        <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 shrink-0 text-accent" /><div><p className="text-xs text-slate-600">Дата</p><p className="text-sm font-bold text-ink">{formatShortDate(date)}</p></div></div>
        <div className="flex items-center gap-3"><Clock3 className="h-4 w-4 shrink-0 text-accent" /><div><p className="text-xs text-slate-600">Время и стоимость</p><p className="text-sm font-bold text-ink">{time} · {formatPrice(service.price)}</p></div></div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-2 block text-sm font-bold text-ink">Ваше имя</span><input type="text" value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Анна" autoComplete="name" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-500 transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10" /></label>
        <label className="block"><span className="mb-2 block text-sm font-bold text-ink">Телефон</span><input type="tel" value={phone} onChange={(event) => onPhoneChange(event.target.value)} placeholder="+7 913-167-49-23" autoComplete="tel" inputMode="tel" maxLength={16} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-500 transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10" /></label>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 p-4">
        <input id="booking-personal-data-consent" type="checkbox" checked={consent} onChange={(event) => onConsentChange(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-accent" />
        <div className="text-xs leading-5 text-slate-600">
          <label htmlFor="booking-personal-data-consent" className="cursor-pointer">
            Даю согласие на обработку имени и телефона для оформления и подтверждения записи.
          </label>{" "}
          <Link href="/personal-data-consent" target="_blank" className="font-bold text-accent underline underline-offset-2">
            Текст согласия
          </Link>{" "}
          и{" "}
          <Link href="/privacy" target="_blank" className="font-bold text-accent underline underline-offset-2">
            политика конфиденциальности
          </Link>.
        </div>
      </div>
      {error ? <p role="alert" className="mt-4 rounded-xl bg-status-cancelled/10 px-4 py-3 text-sm font-semibold text-status-cancelled">{error}</p> : null}
    </div>
  );
}
