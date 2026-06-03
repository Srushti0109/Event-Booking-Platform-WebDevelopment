import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        actionLabel="Go home"
        actionHref="/"
      />
      <div className="flex justify-center mt-6">
        <Button asChild variant="outline">
          <Link href="/events">Browse events</Link>
        </Button>
      </div>
    </div>
  );
}
