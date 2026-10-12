"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SearchX, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import type { Client } from "@/types/client";
import { EmptyState } from "@/components/ui/EmptyState";
import { ClientTag } from "./ClientTag";

export interface ClientListItem extends Client {
  lastVisit: string | null;
}

interface ClientsListProps {
  clients: ClientListItem[];
}

export function ClientsList({ clients }: ClientsListProps) {
  const [query, setQuery] = useState("");
  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");
    if (!normalizedQuery) return clients;

    return clients.filter(
      (client) =>
        client.name.toLocaleLowerCase("ru-RU").includes(normalizedQuery) ||
        client.phone.replaceAll(" ", "").includes(normalizedQuery.replaceAll(" ", "")),
    );
  }, [clients, query]);

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Клиентская база</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Клиенты</h1>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent/90 sm:w-auto"
          onClick={() => toast.info("Функция добавления клиента в разработке")}
        >
          <UserPlus className="h-4 w-4" />
          Добавить клиента
        </button>
      </div>

      <div className="relative mt-7 max-w-xl">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск по имени или телефону"
          className="w-full rounded-xl border border-slate-200 bg-surface py-3.5 pl-12 pr-4 text-sm text-ink shadow-sm transition focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10"
        />
      </div>

      <div className={`mt-6 ${filteredClients.length > 0 ? "lg:overflow-hidden lg:rounded-xl lg:border lg:border-slate-200 lg:bg-surface lg:shadow-sm" : "overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-sm"}`}>
        <div className="hidden grid-cols-[minmax(240px,2fr)_minmax(155px,1fr)_minmax(150px,1fr)_100px_130px_130px] gap-4 border-b border-slate-200 bg-background/70 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-slate-600 lg:grid">
          <span>Клиент</span><span>Телефон</span><span>Теги</span><span>Визиты</span><span>Покупки</span><span>Последний визит</span>
        </div>

        {filteredClients.length > 0 ? (
          <div className="space-y-3 lg:space-y-0 lg:divide-y lg:divide-slate-200">
            {filteredClients.map((client) => (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="grid min-h-11 gap-3 rounded-xl border border-slate-200 bg-surface px-4 py-4 shadow-sm transition-colors hover:bg-accent/[0.035] focus-visible:bg-accent/[0.06] sm:grid-cols-[minmax(220px,1fr)_auto] sm:items-center lg:grid-cols-[minmax(240px,2fr)_minmax(155px,1fr)_minmax(150px,1fr)_100px_130px_130px] lg:gap-4 lg:rounded-none lg:border-0 lg:px-5 lg:shadow-none"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-extrabold text-accent">{client.avatar}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink">{client.name}</span>
                    <span className="mt-0.5 block text-xs text-slate-500 lg:hidden">{client.phone}</span>
                  </span>
                </span>
                <span className="hidden text-sm text-ink/70 lg:block">{client.phone}</span>
                <span className="flex flex-wrap gap-1.5">
                  {client.tags.length > 0 ? client.tags.map((tag) => <ClientTag key={tag} tag={tag} />) : <span className="text-sm text-slate-600">—</span>}
                </span>
                <span className="hidden text-sm font-semibold text-ink lg:block">{client.visitsCount}</span>
                <span className="hidden text-sm font-semibold text-ink lg:block">{formatPrice(client.totalSpent)}</span>
                <span className="hidden text-sm text-slate-600 lg:block">{client.lastVisit ? formatDate(client.lastVisit) : "Нет данных"}</span>
                <span className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:block sm:border-0 sm:pt-0 sm:text-right lg:hidden">
                  <span>{client.visitsCount} визитов · {formatPrice(client.totalSpent)}</span>
                  <span className="text-right sm:ml-2">{client.lastVisit ? `Последний: ${formatDate(client.lastVisit)}` : "Визитов ещё нет"}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={SearchX}
            title={query.trim() ? `Никого не нашлось по запросу «${query.trim()}»` : "Клиентская база пока пуста"}
            description={query.trim() ? "Проверьте имя или номер телефона либо очистите строку поиска." : "Добавьте первого клиента, чтобы его данные появились здесь."}
            action={query.trim() ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/15 bg-surface px-5 text-sm font-bold text-ink transition-colors hover:border-accent/30 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Сбросить поиск
              </button>
            ) : null}
          />
        )}
      </div>
      <p className="mt-3 text-sm text-slate-500">Показано: {filteredClients.length} из {clients.length}</p>
    </section>
  );
}
