import { Check, Clock3 } from "lucide-react";

import { formatPrice } from "@/lib/formatPrice";
import type { Service } from "@/types/service";

interface ServiceStepProps {
  services: Service[];
  selectedServiceId: string;
  onSelect: (serviceId: string) => void;
}

export function ServiceStep({ services, selectedServiceId, onSelect }: ServiceStepProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-accent">Шаг 1 из 4</p>
      <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">Выберите услугу</h1>
      <p className="mt-2 text-sm text-slate-500">Начните с процедуры, на которую хотите записаться.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <button key={service.id} type="button" aria-pressed={isSelected} onClick={() => onSelect(service.id)} className={`relative rounded-xl border p-4 text-left transition-all ${isSelected ? "border-accent bg-accent/[0.06] shadow-sm ring-1 ring-accent" : "border-slate-200 bg-surface hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm"}`}>
              {isSelected ? <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-accent text-white"><Check className="h-3.5 w-3.5" /></span> : null}
              <p className="pr-8 text-sm font-extrabold text-ink">{service.name}</p>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{service.duration} мин</span>
                <span className="font-bold text-ink">{formatPrice(service.price)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
