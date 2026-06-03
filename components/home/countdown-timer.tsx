"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xl sm:text-2xl font-bold tabular-nums tracking-tight"
        aria-label={`${value} ${label}`}
        suppressHydrationWarning
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired, mounted } = useCountdown(targetDate);

  if (!mounted) {
    return (
      <div
        className={cn("flex gap-2 sm:gap-3", className)}
        aria-hidden="true"
      >
        {(["Days", "Hours", "Min", "Sec"] as const).map((label) => (
          <TimeUnit key={label} value={0} label={label} />
        ))}
      </div>
    );
  }

  if (isExpired) {
    return (
      <p className="text-white/90 font-medium" role="status">
        Event has started!
      </p>
    );
  }

  return (
    <div
      className={cn("flex gap-2 sm:gap-3", className)}
      role="timer"
      aria-live="polite"
      aria-label="Countdown to featured event"
      suppressHydrationWarning
    >
      <TimeUnit value={days} label="Days" />
      <TimeUnit value={hours} label="Hours" />
      <TimeUnit value={minutes} label="Min" />
      <TimeUnit value={seconds} label="Sec" />
    </div>
  );
}
