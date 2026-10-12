import { Check, UsersRound } from "lucide-react";

import type { Master } from "@/types/master";

interface MasterStepProps {
  masters: Master[];
  selectedMasterId: string;
  onSelect: (masterId: string) => void;
}

export function MasterStep({ masters, selectedMasterId, onSelect }: MasterStepProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-accent">Шаг 2 из 4</p>
      <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">Выберите мастера</h1>
      <p className="mt-2 text-sm text-slate-500">Показываем мастеров, которые оказывают выбранную услугу.</p>
      <div className="mt-6 space-y-3">
        <button type="button" aria-pressed={selectedMasterId === "any"} onClick={() => onSelect("any")} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${selectedMasterId === "any" ? "border-accent bg-accent/[0.06] ring-1 ring-accent" : "border-slate-200 hover:border-accent/30 hover:shadow-sm"}`}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><UsersRound className="h-5 w-5" /></span>
          <span className="min-w-0 flex-1"><span className="block font-extrabold text-ink">Любой свободный мастер</span><span className="mt-0.5 block text-sm text-slate-500">Подберём того, кто свободен в удобное время</span></span>
          {selectedMasterId === "any" ? <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white"><Check className="h-3.5 w-3.5" /></span> : null}
        </button>
        <div className="grid gap-3 sm:grid-cols-2">
          {masters.map((master) => {
            const isSelected = selectedMasterId === master.id;
            return (
              <button key={master.id} type="button" aria-pressed={isSelected} onClick={() => onSelect(master.id)} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${isSelected ? "border-accent bg-accent/[0.06] ring-1 ring-accent" : "border-slate-200 hover:border-accent/30 hover:shadow-sm"}`}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-sm font-extrabold text-accent">{master.avatar}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-extrabold text-ink">{master.name}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{master.specialization}</span></span>
                {isSelected ? <Check className="h-4 w-4 shrink-0 text-accent" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
