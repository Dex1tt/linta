import { Card } from "@/components/ui/Card";
import type { Client } from "@/types/client";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card>
      <p className="font-semibold">{client.name}</p>
      <p className="mt-1 text-sm text-ink/70">{client.phone}</p>
    </Card>
  );
}
