"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  TrendingDown,
  TrendingUp,
  Ticket01Icon,
} from "@hugeicons/core-free-icons";

const VARIANT_STYLES = {
  info: {
    icon: "text-blue-500",
    iconBg: "bg-blue-500/10",
    trend: "#3b82f6",
  },

  success: {
    icon: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    trend: "#10b981",
  },

  warning: {
    icon: "text-amber-500",
    iconBg: "bg-amber-500/10",
    trend: "#f59e0b",
  },

  error: {
    icon: "text-red-500",
    iconBg: "bg-red-500/10",
    trend: "#ef4444",
  },
} as const;

type StatsCardVariant = keyof typeof VARIANT_STYLES;

type StatsCardIcon = typeof Ticket01Icon;

interface StatsCardProps {
  variant?: StatsCardVariant;
  label: string;
  value: string | number;
  delta?: string;
  description?: string;
  icon?: StatsCardIcon;
  trend?: number[];
  href?: string;
  className?: string;
}

interface MiniTrendProps {
  points: number[];
  stroke: string;
}

function MiniTrend({ points, stroke }: MiniTrendProps) {
  if (points.length < 2) {
    return null;
  }

  const width = 76;
  const height = 30;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;

    const y = height - ((point - min) / range) * (height - 6) - 3;

    return `${x},${y}`;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatsCard({
  variant = "info",
  label,
  value,
  delta,
  description = "vs. semana passada",
  icon = Ticket01Icon,
  trend,
  href,
  className = "",
}: StatsCardProps) {
  const styles = VARIANT_STYLES[variant];

  const isPositive = delta && !delta.trim().startsWith("-");

  const DeltaIcon = isPositive ? TrendingUp : TrendingDown;

  const content = (
    <div
      className={[
        "group relative overflow-hidden rounded-xl",
        "border border-border",
        "bg-card/40",
        "p-5",
        "shadow-sm",
        "transition-all duration-200",
        "hover:border-muted-foreground/25",
        "hover:shadow-md",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="truncate text-[11px] font-medium text-muted-foreground">
          {label}
        </p>

        <div
          className={[
            "flex size-6 shrink-0 items-center justify-center rounded-md",
            styles.iconBg,
            styles.icon,
          ].join(" ")}
        >
          <HugeiconsIcon icon={icon} size={13} strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[35px] font-extrabold leading-none tracking-tight text-foreground tabular-nums">
            {value}
          </p>

          {(delta || description) && (
            <div className="mt-1.5 flex items-center gap-1 whitespace-nowrap">
              {delta && (
                <span
                  className={[
                    "flex items-center gap-0.5",
                    "text-[9px] font-semibold",
                    isPositive ? "text-emerald-500" : "text-red-500",
                  ].join(" ")}
                >
                  <HugeiconsIcon icon={DeltaIcon} size={10} strokeWidth={2} />

                  {delta}
                </span>
              )}

              {description && (
                <span className="text-[9px] text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Trend */}
        {trend && <MiniTrend points={trend} stroke={styles.trend} />}
      </div>

      {/* Hover arrow */}
      {href && (
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={12}
          strokeWidth={1.8}
          className="absolute right-2 top-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a
      href={href}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {content}
    </a>
  );
}
