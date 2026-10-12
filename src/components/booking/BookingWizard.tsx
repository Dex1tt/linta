"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { findAvailableMaster, getBookingDates } from "@/lib/bookingAvailability";
import { formatRussianPhone, isCompleteRussianPhone } from "@/lib/formatPhone";
import type { Appointment } from "@/types/appointment";
import type { Master } from "@/types/master";
import type { Service } from "@/types/service";
import { BookingStepper } from "./BookingStepper";
import { BookingSuccess } from "./BookingSuccess";
import { ConfirmationStep } from "./ConfirmationStep";
import { DateTimeStep } from "./DateTimeStep";
import { MasterStep } from "./MasterStep";
import { ServiceStep } from "./ServiceStep";

interface BookingWizardProps {
  services: Service[];
  masters: Master[];
  appointments: Appointment[];
  startDate: string;
}

interface BookingFormState {
  step: 1 | 2 | 3 | 4;
  direction: 1 | -1;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  consent: boolean;
  error: string;
  isSuccess: boolean;
}

const initialState: BookingFormState = {
  step: 1,
  direction: 1,
  serviceId: "",
  masterId: "",
  date: "",
  time: "",
  name: "",
  phone: "+7 ",
  consent: false,
  error: "",
  isSuccess: false,
};

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -36 : 36 }),
};

export function BookingWizard({ services, masters, appointments, startDate }: BookingWizardProps) {
  const [form, setForm] = useState<BookingFormState>(initialState);
  const bookingDates = useMemo(() => getBookingDates(startDate, 7), [startDate]);
  const selectedService = services.find((service) => service.id === form.serviceId);
  const eligibleMasters = selectedService
    ? masters.filter((master) => master.servicesIds.includes(selectedService.id))
    : [];
  const selectedMasterIds = form.masterId === "any"
    ? eligibleMasters.map((master) => master.id)
    : form.masterId
      ? [form.masterId]
      : [];
  const resolvedMaster = selectedService && form.date && form.time
    ? findAvailableMaster(
        form.date,
        form.time,
        selectedService,
        selectedMasterIds,
        masters,
        appointments,
      )
    : undefined;

  function updateForm(values: Partial<BookingFormState>) {
    setForm((current) => ({ ...current, ...values }));
  }

  function goNext() {
    if (form.step < 4) {
      updateForm({ step: (form.step + 1) as BookingFormState["step"], direction: 1, error: "" });
    }
  }

  function goBack() {
    if (form.step > 1) {
      updateForm({ step: (form.step - 1) as BookingFormState["step"], direction: -1, error: "" });
    }
  }

  function confirmBooking() {
    if (!form.name.trim()) {
      updateForm({ error: "Укажите ваше имя." });
      return;
    }
    if (!isCompleteRussianPhone(form.phone)) {
      updateForm({ error: "Укажите корректный номер телефона." });
      return;
    }
    if (!form.consent) {
      updateForm({ error: "Нужно согласие на обработку персональных данных." });
      return;
    }
    if (!resolvedMaster) {
      updateForm({ error: "Выбранный слот уже недоступен. Вернитесь назад и выберите другое время." });
      return;
    }
    updateForm({ isSuccess: true, error: "" });
    toast.success("Запись успешно создана!");
  }

  const canContinue =
    (form.step === 1 && Boolean(form.serviceId)) ||
    (form.step === 2 && Boolean(form.masterId)) ||
    (form.step === 3 && Boolean(form.date && form.time && resolvedMaster));

  if (form.isSuccess) {
    return <BookingSuccess />;
  }

  return (
    <div>
      <BookingStepper currentStep={form.step} />
      <div className="mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={form.direction}>
          <motion.div key={form.step} custom={form.direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.24, ease: "easeOut" }}>
            {form.step === 1 ? (
              <ServiceStep services={services} selectedServiceId={form.serviceId} onSelect={(serviceId) => updateForm({ serviceId, masterId: "", date: "", time: "", error: "" })} />
            ) : null}
            {form.step === 2 ? (
              <MasterStep masters={eligibleMasters} selectedMasterId={form.masterId} onSelect={(masterId) => updateForm({ masterId, date: "", time: "", error: "" })} />
            ) : null}
            {form.step === 3 && selectedService ? (
              <DateTimeStep dates={bookingDates} selectedDate={form.date} selectedTime={form.time} service={selectedService} selectedMasterIds={selectedMasterIds} masters={masters} appointments={appointments} onSelectDate={(date) => updateForm({ date, time: "", error: "" })} onSelectTime={(time) => updateForm({ time, error: "" })} />
            ) : null}
            {form.step === 4 && selectedService && resolvedMaster ? (
              <ConfirmationStep service={selectedService} master={resolvedMaster} date={form.date} time={form.time} name={form.name} phone={form.phone} consent={form.consent} error={form.error} onNameChange={(name) => updateForm({ name, error: "" })} onPhoneChange={(phone) => updateForm({ phone: formatRussianPhone(phone), error: "" })} onConsentChange={(consent) => updateForm({ consent, error: "" })} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-slate-200 pt-5 min-[420px]:flex-row min-[420px]:items-center">
        {form.step > 1 ? (
          <button type="button" onClick={goBack} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent min-[420px]:w-auto"><ArrowLeft className="h-4 w-4" />Назад</button>
        ) : <span />}
        {form.step < 4 ? (
          <button type="button" onClick={goNext} disabled={!canContinue} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-slate-300 min-[420px]:w-auto">Далее<ArrowRight className="h-4 w-4" /></button>
        ) : (
          <button type="button" onClick={confirmBooking} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/90 min-[420px]:w-auto"><Check className="h-4 w-4" />Подтвердить запись</button>
        )}
      </div>
    </div>
  );
}
