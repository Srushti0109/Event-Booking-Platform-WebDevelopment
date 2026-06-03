import { Badge } from "@/components/ui/badge";
import { getAvailabilityStatus, getTicketsRemaining } from "@/lib/utils";

interface AvailabilityBadgeProps {
  totalTickets: number;
  ticketsSold: number;
}

export function AvailabilityBadge({ totalTickets, ticketsSold }: AvailabilityBadgeProps) {
  const status = getAvailabilityStatus(totalTickets, ticketsSold);
  const remaining = getTicketsRemaining(totalTickets, ticketsSold);

  const config = {
    available: { variant: "success" as const, label: `${remaining} tickets left` },
    low: { variant: "warning" as const, label: `Only ${remaining} left!` },
    "sold-out": { variant: "destructive" as const, label: "Sold Out" },
  };

  const { variant, label } = config[status];

  return (
    <Badge variant={variant} aria-label={`Ticket availability: ${label}`}>
      {label}
    </Badge>
  );
}
