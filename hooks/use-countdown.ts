"use client";

import { useEffect, useState } from "react";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateCountdown(targetDate: Date): CountdownValues {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    isExpired: false,
  };
}

const PLACEHOLDER: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
};

export function useCountdown(targetDateString: string): CountdownValues & { mounted: boolean } {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownValues>(PLACEHOLDER);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDateString);
    const tick = () => setCountdown(calculateCountdown(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  return { ...(mounted ? countdown : PLACEHOLDER), mounted };
}
