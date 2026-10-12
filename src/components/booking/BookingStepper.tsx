import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: number;
}

const steps = ["Услуга", "Мастер", "Время", "Контакты"];

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="grid grid-cols-4 gap-2" aria-label={`Шаг ${currentStep} из 4`}>
      {steps.map((label, index) => {
        const step = index + 1;
        const isComplete = step < currentStep;
        const isCurrent = step === currentStep;
        return (
          <div key={label} className="min-w-0">
            <div className={`h-1.5 rounded-full transition-colors ${step <= currentStep ? "bg-accent" : "bg-slate-200"}`} />
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-extrabold ${isComplete || isCurrent ? "bg-accent text-white" : "bg-slate-100 text-slate-600"}`}>
                {isComplete ? <Check className="h-3 w-3" /> : step}
              </span>
              <span className={`hidden truncate text-[11px] font-semibold sm:block ${isCurrent ? "text-ink" : "text-slate-600"}`}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
