import { ArrowLeft, FileWarning } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/ui/BrandMark";

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  showOperatorNotice?: boolean;
}

export function LegalDocument({ eyebrow, title, description, children, showOperatorNotice = true }: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-ink/10 bg-surface">
        <div className="mx-auto flex min-h-20 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 rounded-lg" aria-label="Linta — на главную">
            <BrandMark className="h-9 w-9" />
            <span className="text-xl font-extrabold text-ink">Linta</span>
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            На главную
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
        <p className="mt-3 text-sm font-semibold text-slate-600">Редакция от 12 октября 2026 года</p>

        {showOperatorNotice ? (
          <aside className="mt-8 flex gap-3 rounded-xl border border-status-pending/40 bg-status-pending/10 p-4 text-sm leading-6 text-ink" aria-label="Важно перед публикацией">
            <FileWarning aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-status-pending" />
            <p>
              <strong>Перед коммерческим запуском</strong> мы заменим все отмеченные данные: укажем фактическое наименование оператора, адрес, контактный e-mail, реальных подрядчиков и место хранения данных.
            </p>
          </aside>
        ) : null}

        <article className="mt-8 space-y-8 rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-8 legal-content">
          {children}
        </article>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-accent" aria-label="Правовые документы">
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/personal-data-consent">Согласие на обработку данных</Link>
          <Link href="/terms">Пользовательское соглашение</Link>
        </nav>
      </main>
    </div>
  );
}
