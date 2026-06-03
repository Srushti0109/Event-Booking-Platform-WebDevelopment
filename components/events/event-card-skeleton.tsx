import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card card-shadow">
      <Skeleton className="aspect-[16/10] w-full rounded-none skeleton-shimmer" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-4/5 skeleton-shimmer" />
        <Skeleton className="h-4 w-full skeleton-shimmer" />
        <Skeleton className="h-4 w-2/3 skeleton-shimmer" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-7 w-24 rounded-md skeleton-shimmer" />
          <Skeleton className="h-7 w-20 rounded-md skeleton-shimmer" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border/60">
          <Skeleton className="h-6 w-28 rounded-full skeleton-shimmer" />
          <Skeleton className="h-9 w-24 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
