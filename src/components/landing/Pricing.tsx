import { Check } from "lucide-react";

const plans = [
  {
    name: "Старт",
    audience: "Мастер-одиночка",
    price: "₽1 900",
    features: ["Онлайн-запись", "Личный календарь", "CRM клиентов", "Напоминания"],
    featured: false,
  },
  {
    name: "Команда",
    audience: "Команда до 10 человек",
    price: "₽4 900",
    features: [
      "Всё из «Старта»",
      "Несколько мастеров",
      "Депозиты и предоплаты",
      "Аналитика команды",
    ],
    featured: true,
  },
  {
    name: "Сеть",
    audience: "Несколько локаций",
    price: "₽9 900",
    features: [
      "Всё из «Команды»",
      "Несколько локаций",
      "Расширенная аналитика",
      "Приоритетная поддержка",
    ],
    featured: false,
  },
];

const orderedPlans = [plans[1], plans[0], plans[2]];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.65fr]">
          <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Понятная подписка
          </p>
          <h2
            id="pricing-title"
            className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl"
          >
            Платите за масштаб, а не за сложность.
          </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink/70 sm:text-lg lg:pb-1">
            Во всех тарифах доступен полный рабочий процесс. Выберите размер команды — остальное уже включено.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-5 sm:mt-16 lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-2">
          {orderedPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl bg-surface p-7 sm:p-8 ${
                plan.featured
                  ? "min-h-[34rem] border-2 border-accent shadow-lg lg:row-span-2 lg:min-h-[46rem] lg:p-10"
                  : "min-h-[25rem] border border-ink/[0.09] shadow-sm"
              }`}
            >
              {plan.featured ? (
                <span className="mb-8 w-fit rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                  Выбор растущих студий
                </span>
              ) : null}

              <div>
                <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-ink">{plan.name}</h3>
                <p className="mt-2 text-sm text-ink/70">{plan.audience}</p>
              </div>

              <div className={`${plan.featured ? "mt-10" : "mt-6"} flex items-end gap-2 border-b border-ink/10 pb-7`}>
                <p className={`${plan.featured ? "text-5xl sm:text-6xl" : "text-4xl"} font-extrabold tracking-[-0.04em] text-ink`}>
                  {plan.price}
                </p>
                <p className="pb-1 text-sm text-ink/70">в месяц</p>
              </div>

              <ul className={`${plan.featured ? "mt-9 space-y-5" : "mt-6 space-y-3"}`} aria-label={`В тариф ${plan.name} входит`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-ink/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-status-confirmed/10 text-status-confirmed">
                      <Check aria-hidden="true" size={13} strokeWidth={2.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#final-cta"
                className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-full px-6 pt-0.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  plan.featured
                    ? "bg-accent text-white shadow-sm hover:bg-accent/90"
                    : "border border-ink/15 bg-transparent text-ink hover:bg-ink/5"
                }`}
              >
                Начать бесплатно
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-ink/70">
          14 дней бесплатно · без привязки карты · отмена в любой момент
        </p>
      </div>
    </section>
  );
}
