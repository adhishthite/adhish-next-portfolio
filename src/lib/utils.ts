import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a YYYY-MM-DD date as "Feb 20, 2026". Pinned to UTC so a date-only
 * string never shifts a day depending on the build machine's timezone.
 */
export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
) {
  const iso = date.includes("T") ? date : `${date}T00:00:00Z`;
  return new Date(iso).toLocaleDateString("en-US", {
    ...options,
    timeZone: "UTC",
  });
}
