import { CalendarSearch, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  variant?: "search" | "default";
}

export function EmptyState({
  title,
  description,
  actionLabel = "Browse all events",
  actionHref = "/events",
  variant = "default",
}: EmptyStateProps) {
  const Icon = variant === "search" ? SearchX : CalendarSearch;

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-gradient-to-b from-muted/30 to-transparent px-6 py-20 text-center"
      role="status"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-150" aria-hidden="true" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border bg-card card-shadow">
          <Icon className="h-9 w-9 text-primary" aria-hidden="true" />
        </div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">{description}</p>
      {actionHref && (
        <Button asChild variant="outline" className="rounded-xl">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
