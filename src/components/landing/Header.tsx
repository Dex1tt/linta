"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BrandMark } from "@/components/ui/BrandMark";
import { useFocusTrap } from "@/lib/useFocusTrap";

const navigation = [
  { href: "#how-it-works", label: "Как это работает" },
  { href: "#studio-pulse", label: "Пульс Linta" },
  { href: "#features", label: "Возможности" },
  { href: "#pricing", label: "Тарифы" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useFocusTrap<HTMLElement>(() => setIsMenuOpen(false), isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header
      id="header"
      className="fixed inset-x-0 top-0 z-50 px-3"
    >
      <div className={`mx-auto mt-3 flex h-16 max-w-6xl items-center gap-4 rounded-2xl border bg-background/95 px-4 backdrop-blur-md transition-shadow duration-300 sm:px-5 ${isScrolled || isMenuOpen ? "border-ink/10 shadow-md" : "border-white/10 shadow-sm"}`}>
        <a
          href="#hero"
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="Linta — на главную"
        >
          <BrandMark />
          <span className="text-xl font-extrabold tracking-tight text-ink">Linta</span>
        </a>

        <nav className="mx-auto hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-md text-sm font-medium text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <Link
            href="/dashboard"
            className="hidden min-h-11 items-center rounded-md px-2 py-2 text-sm font-semibold text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
          >
            Войти
          </Link>
          <Link
            href="/demo"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
          >
            <span className="sm:hidden">Попробовать</span>
            <span className="hidden sm:inline">Попробовать бесплатно</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isMenuOpen ? (
                <path d="M6 6L18 18M18 6L6 18" />
              ) : (
                <path d="M4 7H20M4 12H20M4 17H20" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          tabIndex={-1}
          className="absolute inset-x-3 top-[5.25rem] h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-ink/10 bg-background px-4 py-6 shadow-xl lg:hidden"
          aria-label="Мобильная навигация"
        >
          <div className="mx-auto flex min-h-full max-w-7xl flex-col">
            <div className="flex flex-col gap-1">
              {navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  autoFocus={index === 0}
                  className="flex min-h-14 items-center rounded-xl px-3 text-lg font-bold text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/dashboard"
                className="flex min-h-14 items-center rounded-xl px-3 text-lg font-bold text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Войти
              </Link>
            </div>
            <div className="mt-auto border-t border-ink/10 pt-6">
              <Link
                href="/demo"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-accent px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Попробовать бесплатно
              </Link>
              <p className="mt-3 text-center text-sm text-ink/70">14 дней бесплатно · без карты</p>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
