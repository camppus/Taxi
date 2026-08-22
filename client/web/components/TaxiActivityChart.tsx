"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CarFront } from "lucide-react";

type ActivityDay = {
  date: string;
  trips: number;
  completed: number;
  cancelled: number;
  activeDrivers: number;
  revenue: number;
};

type TaxiActivityChartProps = {
  data?: ActivityDay[];
  startYear?: number;
};

const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function generateMockData(year: number): ActivityDay[] {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  const result: ActivityDay[] = [];

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDay();

    // Simulação de volume
    const base = Math.floor(Math.random() * 120);

    const weekendMultiplier = day === 0 || day === 6 ? 1.25 : 1;

    const trips = Math.floor(base * weekendMultiplier);

    const completed = Math.floor(trips * 0.84);
    const cancelled = Math.floor(trips * 0.07);

    result.push({
      date: date.toISOString().split("T")[0],
      trips,
      completed,
      cancelled,
      activeDrivers: Math.floor(30 + Math.random() * 80),
      revenue: trips * Math.floor(1200 + Math.random() * 800),
    });
  }

  return result;
}

function getIntensity(trips: number, maxTrips: number) {
  if (trips === 0) return "bg-muted/30";

  const ratio = trips / maxTrips;

  if (ratio < 0.2) return "bg-emerald-500/15";
  if (ratio < 0.4) return "bg-emerald-500/30";
  if (ratio < 0.6) return "bg-emerald-500/50";
  if (ratio < 0.8) return "bg-emerald-500/70";

  return "bg-emerald-500";
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-AO").format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function TaxiActivityChart({
  data,
  startYear = 2023,
}: TaxiActivityChartProps) {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);

  const activity = useMemo(() => data ?? generateMockData(year), [data, year]);

  const dataMap = useMemo(() => {
    return new Map(activity.map((item) => [item.date, item]));
  }, [activity]);

  const maxTrips = useMemo(() => {
    return Math.max(...activity.map((item) => item.trips), 1);
  }, [activity]);

  const weeks = useMemo(() => {
    const firstDay = new Date(year, 0, 1);

    // Começa no domingo
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - firstDay.getDay());

    const lastDay = new Date(year, 11, 31);

    const end = new Date(lastDay);
    end.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    const result: ActivityDay[][] = [];

    let current = new Date(start);

    while (current <= end) {
      const week: ActivityDay[] = [];

      for (let day = 0; day < 7; day++) {
        const date = current.toISOString().split("T")[0];

        week.push(
          dataMap.get(date) ?? {
            date,
            trips: 0,
            completed: 0,
            cancelled: 0,
            activeDrivers: 0,
            revenue: 0,
          },
        );

        current.setDate(current.getDate() + 1);
      }

      result.push(week);
    }

    return result;
  }, [year, dataMap]);

  const monthPositions = useMemo(() => {
    return MONTHS.map((month, index) => {
      const date = new Date(year, index, 1);

      const firstDay = new Date(year, 0, 1);

      const diff =
        Math.floor(
          (date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24),
        ) + firstDay.getDay();

      return {
        month,
        position: Math.floor(diff / 7),
      };
    });
  }, [year]);

  const previousYear = () => {
    setYear((current) => Math.max(startYear, current - 1));
  };

  const nextYear = () => {
    setYear((current) => Math.min(currentYear, current + 1));
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-border/50 bg-background/70 p-6 shadow-2xl backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Atividades</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              Volume diário de viagens da plataforma
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-muted/30 p-1 backdrop-blur-md">
            <button
              onClick={previousYear}
              disabled={year === startYear}
              className="rounded-lg p-2 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="min-w-20 text-center text-sm font-medium">
              {year}
            </div>

            <button
              onClick={nextYear}
              disabled={year === currentYear}
              className="rounded-lg p-2 transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className=" pb-3">
          <div className="w-full">
            <div className="relative ml-12 mb-2 h-5">
              {monthPositions.map((item) => (
                <span
                  key={item.month}
                  className="absolute text-xs text-muted-foreground"
                  style={{
                    left: `${item.position * 18}px`,
                  }}
                >
                  {item.month}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {/* Weekday labels */}
              <div className="flex w-9 flex-col justify-between py-[2px]">
                {WEEKDAYS.map((day, index) => (
                  <span
                    key={day}
                    className="h-[14px] text-[10px] leading-[14px] text-muted-foreground"
                  >
                    {index % 2 === 1 ? day : ""}
                  </span>
                ))}
              </div>

              <div className="flex gap-1.5">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1.5">
                    {week.map((day) => {
                      const isCurrentYear =
                        new Date(day.date).getFullYear() === year;

                      return (
                        <ActivityCell
                          key={day.date}
                          day={day}
                          maxTrips={maxTrips}
                          disabled={!isCurrentYear}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-border/40 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {formatNumber(activity.filter((x) => x.trips > 0).length)} dias com
            atividade
          </span>

          <div className="flex items-center gap-2">
            <span>Menos</span>

            <div className="flex gap-1">
              <Legend className="bg-muted/30" />
              <Legend className="bg-emerald-500/15" />
              <Legend className="bg-emerald-500/30" />
              <Legend className="bg-emerald-500/50" />
              <Legend className="bg-emerald-500/70" />
              <Legend className="bg-emerald-500" />
            </div>

            <span>Mais</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCell({
  day,
  maxTrips,
  disabled,
}: {
  day: ActivityDay;
  maxTrips: number;
  disabled: boolean;
}) {
  return (
    <div className="group relative">
      <div
        className={`
          h-4 w-4 rounded-[3px]
          border border-emerald-500/10
          transition-all duration-200
          hover:scale-125
          hover:border-emerald-400/50
          hover:shadow-lg
          hover:shadow-emerald-500/20
          ${getIntensity(day.trips, maxTrips)}
          ${disabled ? "opacity-0" : ""}
        `}
      />

      {/* Tooltip */}
      {!disabled && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-52 -translate-x-1/2 group-hover:block">
          <div className="rounded-xl border border-border/60 bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {formatDate(day.date)}
            </p>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trips</span>

              <span className="font-semibold text-emerald-500">
                {formatNumber(day.trips)}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Concluídas</span>

                <span>{day.completed}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Canceladas</span>

                <span>{day.cancelled}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Motoristas ativos</span>

                <span>{day.activeDrivers}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Receita</span>

                <span>{formatNumber(day.revenue)} Kz</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Legend({ className }: { className: string }) {
  return <span className={`h-3 w-3 rounded-[3px] ${className}`} />;
}
