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
    ring: "ring-blue-500/20",
    trend: "#3b82f6",
    glow: "from-blue-500/10",
  },
  success: {
    icon: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
    trend: "#10b981",
    glow: "from-emerald-500/10",
  },
  warning: {
    icon: "text-amber-500",
    iconBg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
    trend: "#f59e0b",
    glow: "from-amber-500/10",
  },
  error: {
    icon: "text-red-500",
    iconBg: "bg-red-500/10",
    ring: "ring-red-500/20",
    trend: "#ef4444",
    glow: "from-red-500/10",
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
  if (points.length < 2) return null;

  const width = 72;
  const height = 28;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const areaPoints = `0,${height} ${coords.join(" ")} ${width},${height}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <polygon points={areaPoints} fill={stroke} opacity={0.08} />
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
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
        "group relative overflow-hidden rounded-lg",
        "border border-border/60",

        "p-3",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/5 h-43",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br blur-2xl",
          "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          styles.glow,
          "to-transparent",
        ].join(" ")}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={[
            "flex size-9 shrink-0 items-center justify-center rounded-xl ring-1",
            styles.iconBg,
            styles.icon,
            styles.ring,
          ].join(" ")}
        >
          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />
        </div>

        {trend && <MiniTrend points={trend} stroke={styles.trend} />}
      </div>

      <div className="relative mt-4">
        <p className="text-[13px] font-medium text-muted-foreground">{label}</p>

        <p className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-foreground tabular-nums">
          {value}
        </p>

        {(delta || description) && (
          <div className="mt-2 flex items-center gap-1.5">
            {delta && (
              <span
                className={[
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5",
                  "text-[11px] font-semibold",
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500",
                ].join(" ")}
              >
                <HugeiconsIcon icon={DeltaIcon} size={11} strokeWidth={2.2} />
                {delta}
              </span>
            )}

            {description && (
              <span className="text-[11px] text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </div>

      {href && (
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={13}
          strokeWidth={1.8}
          className="absolute right-4 top-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      )}
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {content}
    </a>
  );
}
