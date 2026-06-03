"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { EventCategory } from "@/types/event";
import { CATEGORIES } from "@/lib/constants";
import { cn, formatNumber } from "@/lib/utils";

interface CategoryCardProps {
  name: EventCategory;
  index?: number;
}

export function CategoryCard({ name, index = 0 }: CategoryCardProps) {
  const category = CATEGORIES.find((c) => c.name === name);
  if (!category) return null;

  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/events?category=${encodeURIComponent(name)}`}
        className="group relative flex flex-col rounded-2xl border bg-card p-6 card-shadow overflow-hidden transition-all duration-300 hover:card-shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Browse ${name} events`}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 bg-gradient-to-br",
            category.gradient
          )}
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
              category.gradient
            )}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h3 className="relative font-semibold text-lg mt-5 mb-2 tracking-tight group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="relative text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {category.description}
        </p>
        <p className="relative mt-4 text-xs font-semibold text-primary">
          {formatNumber(category.eventCount)} events
        </p>
      </Link>
    </motion.div>
  );
}
