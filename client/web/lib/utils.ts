import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const driverStatusConfig = {
  online: {
    label: "Online",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  },
  offline: {
    label: "Offline",
    className: "border-muted bg-muted/50 text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  suspended: {
    label: "Suspenso",
    className: "border-red-500/20 bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
  pending: {
    label: "Pendente",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-500",
    dot: "bg-amber-500",
  },
};
