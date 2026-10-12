import Link from "next/link";
import { ArrowUpRight, Braces, Layers3, MousePointerClick } from "lucide-react";

const chapters = [
  {
    number: "01",
    title: "Проблема",
    description: "Администратор держит записи, переписки, подтверждения и оплаты в разных местах — и весь день реагирует на хаос.",
  },
  {
    number: "02",
    title: "Идея",
    description: "Собрать не просто данные, а рабочий ритм: показать команде, что происходит сейчас и какое действие важнее следующего.",
  },
  {
    number: "03",
    title: "Прототип",
    description: "Два связанных опыта: операционная панель студии и самостоятельная запись клиента с общей системой данных.",
  },
];

export function ProjectConcept() {
  return (
    <section id="project-concept" aria-labelledby="project-concept-title" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface shadow-sm">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative overflow-hidden bg-accent px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-12 lg:py-20">
              <div aria-hidden="true" className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-[52px] border-white/[0.06]" />
              <div className="relative">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                  <Braces aria-hidden="true" size={17} />
                  Portfolio case · 2026
                </div>
                <h2 id="project-concept-title" className="mt-6 max-w-xl text-balance text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  Не просто интерфейс. Сценарий целого рабочего дня.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                  Linta — самостоятельный продуктовый концепт с демонстрационными данными. Проект показывает путь от исследования задачи до работающего адаптивного прототипа.
                </p>

                <div className="mt-10 flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((technology) => (
                    <span key={technology} className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/80">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
              <div className="divide-y divide-ink/10">
                {chapters.map((chapter) => (
                  <article key={chapter.number} className="grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[64px_150px_1fr] sm:gap-5">
                    <span className="text-sm font-extrabold text-accent">{chapter.number}</span>
                    <h3 className="text-lg font-extrabold text-ink">{chapter.title}</h3>
                    <p className="text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">{chapter.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm font-semibold text-ink/70">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-warm/20 text-ink">
                    <Layers3 aria-hidden="true" size={18} />
                  </span>
                  Лендинг + кабинет + клиентская запись
                </div>
                <Link href="/demo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-extrabold text-white transition-colors hover:bg-accent">
                  <MousePointerClick aria-hidden="true" size={17} />
                  Исследовать прототип
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
