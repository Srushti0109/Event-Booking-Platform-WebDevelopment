"use client";

import type { EventCategory, EventFilters, SortOption } from "@/types/event";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";
import { SlidersHorizontal } from "lucide-react";

interface FilterPanelProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "date-asc", label: "Date (Earliest)" },
  { value: "date-desc", label: "Date (Latest)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "popular", label: "Most Popular" },
];

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const update = (partial: Partial<EventFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  return (
    <aside
      className="space-y-5 rounded-2xl border bg-card/80 backdrop-blur-sm p-5 card-shadow lg:sticky lg:top-24"
      aria-label="Event filters"
    >
      <div className="flex items-center gap-2 pb-1 border-b border-border/60">
        <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
        <h2 className="font-semibold text-sm tracking-wide">Filters</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-filter" className="text-xs uppercase tracking-wider text-muted-foreground">
          Category
        </Label>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            update({ category: value as EventCategory | "all" })
          }
        >
          <SelectTrigger id="category-filter" className="rounded-xl" aria-label="Filter by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="date-from" className="text-xs uppercase tracking-wider text-muted-foreground">
            From Date
          </Label>
          <Input
            id="date-from"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => update({ dateFrom: e.target.value })}
            className="rounded-xl"
            aria-label="Filter events from date"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date-to" className="text-xs uppercase tracking-wider text-muted-foreground">
            To Date
          </Label>
          <Input
            id="date-to"
            type="date"
            value={filters.dateTo}
            onChange={(e) => update({ dateTo: e.target.value })}
            className="rounded-xl"
            aria-label="Filter events to date"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort-by" className="text-xs uppercase tracking-wider text-muted-foreground">
          Sort By
        </Label>
        <Select
          value={filters.sort}
          onValueChange={(value) => update({ sort: value as SortOption })}
        >
          <SelectTrigger id="sort-by" className="rounded-xl" aria-label="Sort events">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
