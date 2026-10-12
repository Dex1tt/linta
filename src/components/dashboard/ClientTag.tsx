interface ClientTagProps {
  tag: string;
}

export function ClientTag({ tag }: ClientTagProps) {
  const isVip = tag.toLowerCase() === "vip";
  const isNew = tag.toLowerCase().includes("новый");

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
        isVip
          ? "bg-accent/10 text-accent"
          : isNew
            ? "bg-status-confirmed/10 text-status-confirmed"
            : "bg-status-paid/10 text-status-paid"
      }`}
    >
      {tag}
    </span>
  );
}
