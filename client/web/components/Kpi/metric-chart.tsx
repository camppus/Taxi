"use client";

import { useId, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export interface SeriesPoint {
  value: number;
  date: string;
}

export type MetricAccent =
  | "emerald"
  | "blue"
  | "violet"
  | "amber"
  | "rose"
  | "neutral";

export interface MetricSeries {
  name: string;
  data: SeriesPoint[];
  accent?: MetricAccent;
}

export type ChartView = "curve" | "bar";

export interface ChartSeries {
  name: string;
  data: SeriesPoint[];
  color: string;
}

export const ACCENTS: Record<
  MetricAccent,
  {
    stroke: string;
    text: string;
    soft: string;
  }
> = {
  emerald: {
    stroke: "#10b981",
    text: "#10b981",
    soft: "#10b981",
  },
  blue: {
    stroke: "#3b82f6",
    text: "#3b82f6",
    soft: "#3b82f6",
  },
  violet: {
    stroke: "#8b5cf6",
    text: "#8b5cf6",
    soft: "#8b5cf6",
  },
  amber: {
    stroke: "#f59e0b",
    text: "#f59e0b",
    soft: "#f59e0b",
  },
  rose: {
    stroke: "#f43f5e",
    text: "#f43f5e",
    soft: "#f43f5e",
  },
  neutral: {
    stroke: "#737373",
    text: "#737373",
    soft: "#737373",
  },
};

export const SERIES_COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#f43f5e",
];

export function formatCompact(value: number) {
  const absolute = Math.abs(value);

  if (absolute >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (absolute >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return new Intl.NumberFormat("pt-PT").format(value);
}

interface MetricChartProps {
  series: ChartSeries[];
  view: ChartView;
  defaultIndex?: number;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string) => string;
}

export function MetricChart({
  series,
  view,
  defaultIndex,
  valueFormatter = formatCompact,
  dateFormatter = (date) => date,
}: MetricChartProps) {
  const gradientId = `metric-gradient-${useId().replace(/:/g, "")}`;
  const [isHovered, setIsHovered] = useState(false);
  const maxLength = Math.max(...series.map((item) => item.data.length), 0);

  const [activeIndex, setActiveIndex] = useState(
    Math.min(defaultIndex ?? maxLength - 1, maxLength - 1),
  );

  const chartWidth = 900;
  const chartHeight = 280;
  const paddingX = 20;
  const paddingY = 30;

  const values = useMemo(
    () => series.flatMap((item) => item.data.map((point) => point.value)),
    [series],
  );

  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const range = max - min || 1;

  const getX = (index: number, length: number) => {
    if (length <= 1) return chartWidth / 2;

    return paddingX + (index / (length - 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (value: number) => {
    return (
      chartHeight -
      paddingY -
      ((value - min) / range) * (chartHeight - paddingY * 2)
    );
  };

  const createPath = (data: SeriesPoint[]) => {
    if (!data.length) return "";

    return data
      .map((point, index) => {
        const x = getX(index, data.length);
        const y = getY(point.value);

        if (index === 0) {
          return `M ${x} ${y}`;
        }

        const previous = data[index - 1];

        const previousX = getX(index - 1, data.length);
        const previousY = getY(previous.value);

        const controlX = (previousX + x) / 2;

        return `
          C
          ${controlX} ${previousY},
          ${controlX} ${y},
          ${x} ${y}
        `;
      })
      .join(" ");
  };

  if (!series.length || !series[0]?.data.length) {
    return null;
  }

  const primary = series[0];

  const safeActiveIndex = Math.max(
    0,
    Math.min(activeIndex, primary.data.length - 1),
  );

  const activePoint = primary.data[safeActiveIndex];

  const activeX = getX(safeActiveIndex, primary.data.length);

  const activeY = getY(activePoint.value);

  const previousIndex =
    safeActiveIndex > 0 ? safeActiveIndex - 1 : safeActiveIndex;

  const previousPoint = primary.data[previousIndex];

  const change =
    previousPoint.value === 0
      ? 0
      : ((activePoint.value - previousPoint.value) /
          Math.abs(previousPoint.value)) *
        100;

  const isAtStart = safeActiveIndex <= 0;
  const isAtEnd = safeActiveIndex >= primary.data.length - 1;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute inset-0"
    >
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primary.color} stopOpacity="0.28" />

            <stop offset="100%" stopColor={primary.color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {view === "curve" &&
          series.map((item) => {
            const path = createPath(item.data);

            const areaPath = `
              ${path}
              L ${getX(item.data.length - 1, item.data.length)} ${
                chartHeight - paddingY
              }
              L ${getX(0, item.data.length)} ${chartHeight - paddingY}
              Z
            `;

            return (
              <g key={item.name}>
                {item === primary && (
                  <path d={areaPath} fill={`url(#${gradientId})`} />
                )}

                <path
                  d={path}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}

        {view === "bar" &&
          primary.data.map((point, index) => {
            const barWidth =
              ((chartWidth - paddingX * 2) / primary.data.length) * 0.55;

            const x = getX(index, primary.data.length) - barWidth / 2;

            const y = getY(point.value);

            const baseY = chartHeight - paddingY;

            return (
              <rect
                key={`${point.date}-${index}`}
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(baseY - y, 2)}
                rx="5"
                fill={primary.color}
                opacity={index === safeActiveIndex ? 1 : 0.35}
              />
            );
          })}

        {/* Active point */}
        {view === "curve" && (
          <>
            <line
              x1={activeX}
              x2={activeX}
              y1={paddingY}
              y2={chartHeight - paddingY}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="4 5"
              vectorEffect="non-scaling-stroke"
            />

            <circle
              cx={activeX}
              cy={activeY}
              r="7"
              fill="var(--card)"
              stroke={primary.color}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>

      {/* Interação */}
      <div className="absolute inset-x-4 bottom-5 top-5 flex">
        {primary.data.map((point, index) => (
          <button
            key={`${point.date}-${index}`}
            type="button"
            aria-label={`Ver ${dateFormatter(point.date)}`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            className="h-full flex-1 cursor-crosshair"
          />
        ))}
      </div>

      {isHovered && (
        <div
          className="pointer-events-none absolute z-20 min-w-[120px] -translate-x-1/2 rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-lg"
          style={{
            left: `${(safeActiveIndex / Math.max(primary.data.length - 1, 1)) * 100}%`,
            top: "12%",
          }}
        >
          <p className="text-[10px] text-muted-foreground">
            {dateFormatter(activePoint.date)}
          </p>

          <p className="mt-0.5 font-semibold text-foreground">
            {valueFormatter(activePoint.value)}
          </p>

          <p
            className="mt-0.5 font-medium"
            style={{
              color: change >= 0 ? ACCENTS.emerald.text : ACCENTS.rose.text,
            }}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </p>
        </div>
      )}

      {/* Navegação */}
      <div className="pointer-events-none absolute bottom-2 right-3 flex items-center gap-1">
        <div className="pointer-events-auto flex items-center rounded-lg border border-border/60 bg-card/70 backdrop-blur">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) => Math.max(current - 1, 0))
            }
            className="p-1.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) =>
                Math.min(current + 1, primary.data.length - 1),
              )
            }
            className="p-1.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
