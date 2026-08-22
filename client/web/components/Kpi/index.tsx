"use client";

import { useId, useMemo, useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";

import {
  ACCENTS,
  formatCompact,
  MetricChart,
  SERIES_COLORS,
  type ChartSeries,
  type ChartView,
  type MetricAccent,
  type MetricSeries,
  type SeriesPoint,
} from "./metric-chart";

import { PeriodSelect, ViewToggle, type PeriodOption } from "./metric-controls";

export type {
  SeriesPoint,
  MetricSeries,
  MetricAccent,
  ChartView,
  PeriodOption,
};

export type CardSize = "sm" | "md" | "lg";

export interface ProgressMetricCardProps {
  title: string;

  total?: string | number;

  delta?: string;

  deltaLabel?: string;

  percent?: string;

  trend?: "up" | "down";

  unit?: string;

  period?: string;

  periodOptions?: PeriodOption[];

  onPeriodChange?: (option: PeriodOption) => void;

  defaultView?: ChartView;

  accent?: MetricAccent;

  data?: SeriesPoint[];

  series?: MetricSeries[];

  defaultIndex?: number;

  size?: CardSize;

  showStats?: boolean;

  valueFormatter?: (value: number) => string;

  dateFormatter?: (date: string) => string;

  loading?: boolean;

  className?: string;
}

const DEFAULT_PERIODS: PeriodOption[] = [
  {
    label: "Últimos 7 dias",
    points: 7,
  },
  {
    label: "Últimos 14 dias",
    points: 14,
  },
  {
    label: "Últimos 30 dias",
    points: 30,
  },
];

const REGION_W = 65;

const NEUTRAL_PCT = 0.5;

const SIZES: Record<
  CardSize,
  {
    minH: string;
    pad: string;
    footer: string;
    title: string;
    headline: string;
  }
> = {
  sm: {
    minH: "h-[230px]",
    pad: "p-4",
    footer: "px-6 py-3",
    title: "text-[13px]",
    headline: "text-[46px]",
  },

  md: {
    minH: "min-h-[380px]",
    pad: "px-8 pt-7",
    footer: "px-8 py-4",
    title: "text-[17px]",
    headline: "text-[72px]",
  },

  lg: {
    minH: "min-h-[460px]",
    pad: "px-10 pt-9",
    footer: "px-10 py-5",
    title: "text-[19px]",
    headline: "text-[88px]",
  },
};

const sliceWindow = (points: SeriesPoint[], n?: number) =>
  n && n < points.length ? points.slice(-n) : points;

export default function ProgressMetricCard({
  title,
  total,
  delta,
  deltaLabel = "hoje",
  percent,
  trend,
  unit,
  period = "Últimos 30 dias",
  periodOptions,
  onPeriodChange,
  defaultView = "curve",
  accent,
  data,
  series,
  defaultIndex,
  size = "md",
  showStats = true,
  valueFormatter,
  dateFormatter,
  loading = false,
  className = "",
}: ProgressMetricCardProps) {
  const gridId = `metric-grid-${useId().replace(/:/g, "")}`;

  const sz = SIZES[size];

  const shell = [
    "relative flex",
    sz.minH,
    "w-full flex-col overflow-hidden",
    "rounded-[10px]",
    "border border-border",
    "bg-card/10",
    "shadow-sm",

    className,
  ].join(" ");

  const periods = periodOptions ?? DEFAULT_PERIODS;

  const [selectedLabel, setSelectedLabel] = useState(period);

  const [view, setView] = useState<ChartView>(defaultView);

  const baseSeries: MetricSeries[] = useMemo(
    () =>
      series?.length
        ? series
        : [
            {
              name: title,
              data: data ?? [],
              accent,
            },
          ],
    [series, data, title, accent],
  );

  const selectedOption =
    periods.find((item) => item.label === selectedLabel) ??
    periods[periods.length - 1];

  const visibleSeries = useMemo(
    () =>
      baseSeries.map((item) => ({
        ...item,
        data: sliceWindow(item.data, selectedOption?.points),
      })),
    [baseSeries, selectedOption],
  );

  const primary = visibleSeries[0];

  const isMulti = visibleSeries.length > 1;

  const hasData = (primary?.data.length ?? 0) >= 2;

  const stats = useMemo(() => {
    const values = primary?.data.map((point) => point.value) ?? [];

    const sum = values.reduce((a, b) => a + b, 0);

    const first = values[0] ?? 0;

    const last = values[values.length - 1] ?? 0;

    const previous = values[values.length - 2] ?? first;

    const net = last - first;

    return {
      sum,
      net,
      pct: first ? (net / first) * 100 : 0,
      step: last - previous,
      peak: values.length ? Math.max(...values) : 0,
      low: values.length ? Math.min(...values) : 0,
      avg: values.length ? sum / values.length : 0,
    };
  }, [primary]);

  const resolvedTrend: "up" | "down" | "flat" =
    trend ??
    (Math.abs(stats.pct) < NEUTRAL_PCT
      ? "flat"
      : stats.net >= 0
        ? "up"
        : "down");

  const resolvedAccent: MetricAccent =
    accent ??
    (resolvedTrend === "up"
      ? "emerald"
      : resolvedTrend === "down"
        ? "rose"
        : "neutral");

  const color = ACCENTS[resolvedAccent];

  const TrendIcon =
    resolvedTrend === "flat"
      ? ArrowRight01Icon
      : resolvedTrend === "down"
        ? ArrowDown01Icon
        : ArrowUp01Icon;

  const fmtCompact = valueFormatter ?? formatCompact;

  const fmtFull =
    valueFormatter ??
    ((value: number) =>
      value.toLocaleString("pt-PT") + (unit ? ` ${unit}` : ""));

  const fmtDate = dateFormatter ?? ((date: string) => date);

  const sign = (value: number) =>
    (value >= 0 ? "+" : "−") + fmtCompact(Math.abs(value));

  const displayTotal = total ?? fmtCompact(stats.sum);

  const displayDelta = delta ?? sign(stats.step);

  const displayPercent = percent ?? `${Math.abs(stats.pct).toFixed(1)}%`;

  const chartSeries: ChartSeries[] = visibleSeries.map((item, index) => ({
    name: item.name,

    data: item.data,

    color: item.accent
      ? ACCENTS[item.accent].stroke
      : isMulti
        ? SERIES_COLORS[index % SERIES_COLORS.length]
        : color.stroke,
  }));

  const lastIndex = (primary?.data.length ?? 1) - 1;

  const fallback = Math.min(defaultIndex ?? lastIndex, lastIndex);

  const handlePeriodChange = (option: PeriodOption) => {
    setSelectedLabel(option.label);

    onPeriodChange?.(option);
  };

  if (loading) {
    return (
      <div className={shell} aria-busy="true">
        <div className={`flex flex-1 flex-col ${sz.pad}`}>
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />

          <div className="mt-6 h-14 w-48 animate-pulse rounded-lg bg-muted" />

          <div className="mt-auto h-24 w-full animate-pulse rounded-lg bg-muted/50" />
        </div>

        <div className={`border-t border-border ${sz.footer}`}>
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className={shell}>
        <div className={`flex flex-1 flex-col ${sz.pad}`}>
          <h3
            className={`${sz.title} font-semibold tracking-tight text-foreground`}
          >
            {title}
          </h3>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium">Sem dados ainda</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Os dados aparecerão quando houver atividade.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div
        className="absolute inset-y-0 right-0 z-0"
        style={{
          width: `${REGION_W}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to left, ${color.stroke}1f, transparent 75%)`,
          }}
        />

        <div
          className="absolute inset-0 text-foreground/[0.10]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 55%)",
            maskImage: "linear-gradient(to right, transparent, black 55%)",
          }}
        >
          <svg className="h-full w-full" aria-hidden>
            <defs>
              <pattern
                id={gridId}
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill={`url(#${gridId})`} />
          </svg>
        </div>

        <MetricChart
          series={chartSeries}
          view={view}
          defaultIndex={fallback}
          valueFormatter={fmtFull}
          dateFormatter={fmtDate}
        />
      </div>

      {/* Main content */}
      <div
        className={`pointer-events-none relative z-10 flex flex-1 flex-col ${sz.pad}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3
              className={`${sz.title} font-semibold tracking-tight text-foreground`}
            >
              {title}
            </h3>

            <ViewToggle value={view} onChange={() => {}} />
          </div>

          <div className="flex items-center gap-3"></div>
        </div>

        {isMulti && (
          <div className="mt-3 flex flex-wrap gap-4">
            {chartSeries.map((item) => (
              <span
                key={item.name}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className="size-2 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                {item.name}
              </span>
            ))}
          </div>
        )}

        <div
          className={`mt-6 ${sz.headline} font-medium leading-none tracking-tight text-foreground`}
        >
          {displayTotal}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`relative z-10 flex items-center justify-between gap-4 border-t border-border bg-background ${sz.footer} text-sm`}
      >
        <div className="flex gap-1">
          <span
            className="font-medium"
            style={{
              color: color.text,
            }}
          >
            {displayDelta}
          </span>
          <span className="text-muted-foreground">{deltaLabel}</span>
        </div>

        {showStats && (
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <span>
              <strong className="text-foreground/80">
                {fmtCompact(stats.peak)}
              </strong>{" "}
              max
            </span>

            <span className="opacity-40">·</span>

            <span>
              <strong className="text-foreground/80">
                {fmtCompact(stats.low)}
              </strong>{" "}
              min
            </span>

            <span className="opacity-40">·</span>

            <span>
              <strong className="text-foreground/80">
                {fmtCompact(Math.round(stats.avg))}
              </strong>{" "}
              avg
            </span>
            <span
              className="flex items-center gap-1 text-sm font-medium"
              style={{
                color: color.text,
              }}
            >
              <HugeiconsIcon icon={TrendIcon} size={15} strokeWidth={2.5} />

              {displayPercent}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
