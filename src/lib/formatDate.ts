const longDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

export function formatDate(value: string | Date): string {
  return longDateFormatter.format(new Date(value));
}

const shortDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

export function formatShortDate(value: string | Date): string {
  const formatted = shortDateFormatter.format(new Date(value)).replaceAll(".", "");

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
