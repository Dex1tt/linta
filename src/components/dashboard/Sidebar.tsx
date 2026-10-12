"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CalendarDays, ChartNoAxesCombined, LayoutDashboard, Menu, Settings, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/ui/BrandMark";
import { useFocusTrap } from "@/lib/useFocusTrap";

const navigation = [
  { href: "/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/dashboard/calendar", label: "Календарь", icon: CalendarDays },
  { href: "/dashboard/clients", label: "Клиенты", icon: Users },
  { href: "/dashboard/analytics", label: "Аналитика", icon: ChartNoAxesCombined },
  { href: "/dashboard/settings", label: "Настройки", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const firstSidebarLinkRef = useRef<HTMLAnchorElement>(null);
  const sidebarRef = useFocusTrap<HTMLElement>(() => setIsOpen(false), isOpen && !isDesktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMode = () => setIsDesktop(mediaQuery.matches);
    updateMode();
    mediaQuery.addEventListener("change", updateMode);
    return () => mediaQuery.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isDesktop) return;
    const focusFrame = window.requestAnimationFrame(() => firstSidebarLinkRef.current?.focus());
    return () => window.cancelAnimationFrame(focusFrame);
  }, [isDesktop, isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        aria-controls="dashboard-sidebar"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed left-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-xl border border-ink/10 bg-surface text-ink shadow-md transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
      >
        {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Закрыть меню"
        onClick={() => setIsOpen(false)}
        className={`fixed bottom-0 right-0 top-0 z-40 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ left: "min(17.5rem, calc(100vw - 3rem))" }}
      />
      <aside
        ref={sidebarRef}
        id="dashboard-sidebar"
        tabIndex={-1}
        inert={!isDesktop && !isOpen}
        aria-hidden={!isDesktop && !isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(17.5rem,calc(100vw-3rem))] flex-col border-r border-ink/[0.08] bg-surface px-4 py-5 shadow-2xl transition-transform duration-300 ease-out md:w-20 md:translate-x-0 md:px-3 md:shadow-none lg:w-64 lg:px-4 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
      <Link
        ref={firstSidebarLinkRef}
        href="/dashboard"
        onClick={() => setIsOpen(false)}
        aria-label="Linta — дашборд"
        className="flex h-12 items-center gap-2.5 rounded-xl pl-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:justify-center md:p-0 lg:justify-start lg:px-2"
      >
        <BrandMark className="h-9 w-9 shrink-0" />
        <span className="text-xl font-extrabold tracking-tight text-ink md:hidden lg:inline">Linta</span>
      </Link>

      <nav className="mt-9 flex flex-1 flex-col gap-1.5" aria-label="Навигация дашборда">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            normalizedPathname === item.href ||
            (item.href !== "/dashboard" && normalizedPathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              title={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:justify-center lg:justify-start ${
                isActive
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              <Icon aria-hidden="true" className="shrink-0" size={20} strokeWidth={1.9} />
              <span className="md:hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink/[0.08] pt-4">
        <div className="flex items-center gap-3 rounded-xl md:justify-center md:py-2 lg:justify-start lg:px-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-extrabold text-accent">
            АП
          </span>
          <div className="min-w-0 md:hidden lg:block">
            <p className="truncate text-sm font-bold text-ink">Анна</p>
            <p className="truncate text-xs text-ink/70">Администратор</p>
          </div>
        </div>
        <Link
          href="/demo"
          onClick={() => setIsOpen(false)}
          title="Выйти из демо"
          className="mt-3 flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:justify-center lg:justify-start"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          <span className="md:hidden lg:inline">Выйти из демо</span>
        </Link>
      </div>
      </aside>
    </>
  );
}
