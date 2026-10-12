interface DashboardSectionPlaceholderProps {
  title: string;
  description: string;
}

export function DashboardSectionPlaceholder({
  title,
  description,
}: DashboardSectionPlaceholderProps) {
  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">{title}</h1>
      <div className="mt-8 rounded-xl border border-ink/[0.08] bg-surface p-8 shadow-sm">
        <p className="max-w-xl text-base leading-7 text-ink/70">{description}</p>
      </div>
    </div>
  );
}
