import { Camera, MessageCircle, Send } from "lucide-react";

import { BrandMark } from "@/components/ui/BrandMark";

const productLinks = [
  { href: "#features", label: "Возможности" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#how-it-works", label: "Как это работает" },
];

const companyLinks = ["О нас", "Блог", "Контакты"];
const legalLinks = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/terms", label: "Пользовательское соглашение" },
  { href: "/personal-data-consent", label: "Согласие на обработку данных" },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
          <div className="max-w-xs sm:col-span-2 lg:col-span-1">
            <a
              href="#header"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label="Linta — на главную"
            >
              <BrandMark className="h-9 w-9" />
              <span className="text-2xl font-extrabold tracking-tight text-white">Linta</span>
            </a>
            <p className="mt-5 text-sm leading-6 text-white/50">
              Меньше переписок. Больше записей.
            </p>
          </div>

          <nav aria-labelledby="footer-product-title">
            <h2 id="footer-product-title" className="text-sm font-bold text-white">
              Продукт
            </h2>
            <ul className="mt-5 space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/50 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-title">
            <h2 id="footer-company-title" className="text-sm font-bold text-white">
              Компания
            </h2>
            <ul className="mt-5 space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#footer"
                    className="inline-flex min-h-11 items-center text-sm text-white/50 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal-title">
            <h2 id="footer-legal-title" className="text-sm font-bold text-white">
              Документы
            </h2>
            <ul className="mt-5 space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/50 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">© 2026 Linta. Все права защищены.</p>
          <div className="flex items-center gap-2" aria-label="Социальные сети">
            <a
              href="#footer"
              aria-label="Telegram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Send aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
            <a
              href="#footer"
              aria-label="ВКонтакте"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <MessageCircle aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
            <a
              href="#footer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Camera aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
