"use client";

import * as React from "react";

import {
  AnalyticsUpIcon,
  Car01Icon,
  UserMultiple02Icon,
  Route01Icon,
  Wallet01Icon,
  Calendar03Icon,
  StarIcon,
  Alert02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  CancelCircleIcon,
  Location01Icon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StatsCard from "@/components/StatsCard";
import { ExportCommand } from "@/components/ExportCommand";
import TaxiActivityChart from "@/components/TaxiActivityChart";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Period = "7d" | "30d" | "90d" | "12m";

/* -------------------------------------------------------------------------- */
/* Mock Data                                                                  */
/* -------------------------------------------------------------------------- */

const revenueData = [
  { name: "Seg", revenue: 820000, driver: 754000 },
  { name: "Ter", revenue: 960000, driver: 883000 },
  { name: "Qua", revenue: 910000, driver: 837000 },
  { name: "Qui", revenue: 1080000, driver: 993000 },
  { name: "Sex", revenue: 1240000, driver: 1140000 },
  { name: "Sáb", revenue: 1420000, driver: 1306000 },
  { name: "Dom", revenue: 990000, driver: 911000 },
];

const ridesData = [
  { name: "Seg", completed: 382, cancelled: 31 },
  { name: "Ter", completed: 421, cancelled: 28 },
  { name: "Qua", completed: 404, cancelled: 35 },
  { name: "Qui", completed: 467, cancelled: 29 },
  { name: "Sex", completed: 532, cancelled: 42 },
  { name: "Sáb", completed: 618, cancelled: 47 },
  { name: "Dom", completed: 439, cancelled: 33 },
];

const hourlyData = [
  { hour: "06h", rides: 42 },
  { hour: "07h", rides: 81 },
  { hour: "08h", rides: 126 },
  { hour: "09h", rides: 148 },
  { hour: "10h", rides: 113 },
  { hour: "11h", rides: 102 },
  { hour: "12h", rides: 137 },
  { hour: "13h", rides: 129 },
  { hour: "14h", rides: 118 },
  { hour: "15h", rides: 107 },
  { hour: "16h", rides: 131 },
  { hour: "17h", rides: 169 },
  { hour: "18h", rides: 218 },
  { hour: "19h", rides: 236 },
  { hour: "20h", rides: 192 },
  { hour: "21h", rides: 151 },
  { hour: "22h", rides: 114 },
];

const bookingStatusData = [
  {
    name: "Concluídos",
    value: 68,
  },
  {
    name: "Cancelados",
    value: 14,
  },
  {
    name: "Pendentes",
    value: 6,
  },
  {
    name: "Expirados",
    value: 12,
  },
];

const paymentMethods = [
  {
    name: "Multicaixa",
    value: 48,
  },
  {
    name: "Carteira",
    value: 27,
  },
  {
    name: "Cartão",
    value: 17,
  },
  {
    name: "Dinheiro",
    value: 8,
  },
];

const driverPerformance = [
  {
    name: "Carlos António",
    trips: 184,
    completion: 98,
    rating: 4.94,
    earnings: 428500,
  },
  {
    name: "Mário Francisco",
    trips: 171,
    completion: 96,
    rating: 4.89,
    earnings: 397000,
  },
  {
    name: "Pedro Silva",
    trips: 164,
    completion: 95,
    rating: 4.86,
    earnings: 381500,
  },
  {
    name: "Daniel José",
    trips: 152,
    completion: 93,
    rating: 4.81,
    earnings: 352000,
  },
  {
    name: "João Manuel",
    trips: 148,
    completion: 91,
    rating: 4.76,
    earnings: 337500,
  },
];

const vehiclePerformance = [
  {
    type: "Toyota Corolla",
    vehicles: 84,
    trips: 3820,
    utilization: 87,
    revenue: 9240000,
  },
  {
    type: "Toyota Vitz",
    vehicles: 71,
    trips: 3190,
    utilization: 82,
    revenue: 7410000,
  },
  {
    type: "Hyundai Accent",
    vehicles: 58,
    trips: 2470,
    utilization: 78,
    revenue: 5830000,
  },
  {
    type: "Kia Picanto",
    vehicles: 42,
    trips: 1640,
    utilization: 69,
    revenue: 3890000,
  },
];

const complaintCategories = [
  {
    name: "Comportamento",
    value: 31,
  },
  {
    name: "Pagamento",
    value: 24,
  },
  {
    name: "Viatura",
    value: 19,
  },
  {
    name: "Viagem",
    value: 15,
  },
  {
    name: "Outros",
    value: 11,
  },
];

const ratingDistribution = [
  { rating: "5", value: 61 },
  { rating: "4", value: 24 },
  { rating: "3", value: 9 },
  { rating: "2", value: 4 },
  { rating: "1", value: 2 },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatCurrency = (value: number) => `${value.toLocaleString("pt-AO")} Kz`;

const formatCompactCurrency = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M Kz`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K Kz`;
  }

  return `${value} Kz`;
};

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  fontSize: 12,
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AnalyticsPage() {
  const [period, setPeriod] = React.useState<Period>("7d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
              <HugeiconsIcon
                icon={AnalyticsUpIcon}
                size={19}
                strokeWidth={1.8}
                className="text-secondary"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Analytics
              </h1>

              <p className="text-sm text-muted-foreground">
                Analise o desempenho operacional, financeiro e dos utilizadores.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={period}
            onValueChange={(value) => setPeriod((value ?? "7d") as Period)}
          >
            <SelectTrigger className="h-10 w-[145px] rounded-xl">
              <SelectValue placeholder="Período" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>

              <SelectItem value="30d">Últimos 30 dias</SelectItem>

              <SelectItem value="90d">Últimos 90 dias</SelectItem>

              <SelectItem value="12m">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>

          <ExportCommand
            title="Relatório de Analytics"
            onExport={async () => {
              await new Promise((resolve) => setTimeout(resolve, 800));
            }}
          />
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Receita total"
          value="8,42M Kz"
          delta="+14,8%"
          description="vs. período anterior"
          icon={Wallet01Icon}
          trend={[
            5200000, 5840000, 6100000, 6720000, 7180000, 7820000, 8420000,
          ]}
        />

        <StatsCard
          variant="success"
          label="Viagens concluídas"
          value="3.281"
          delta="+11,6%"
          description="vs. período anterior"
          icon={Route01Icon}
          trend={[2420, 2570, 2710, 2840, 2960, 3130, 3281]}
        />

        <StatsCard
          variant="success"
          label="Motoristas ativos"
          value="684"
          delta="+8,4%"
          description="vs. período anterior"
          icon={UserMultiple02Icon}
          trend={[521, 548, 566, 589, 612, 649, 684]}
        />

        <StatsCard
          variant="warning"
          label="Taxa de cancelamento"
          value="8,7%"
          delta="-2,1%"
          description="vs. período anterior"
          icon={CancelCircleIcon}
          trend={[12, 11.6, 10.8, 10.2, 9.7, 9.1, 8.7]}
        />
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-sm font-semibold">Indicadores operacionais</h2>

          <p className="text-xs text-muted-foreground">
            Métricas importantes para acompanhar a saúde da plataforma.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            icon={Clock01Icon}
            label="Tempo médio de espera"
            value="4m 32s"
            change="-18s"
            positive
          />

          <Metric
            icon={Route01Icon}
            label="Duração média da viagem"
            value="26m 14s"
            change="+1m 12s"
          />

          <Metric
            icon={Location01Icon}
            label="Taxa de aceitação"
            value="91,4%"
            change="+4,2%"
            positive
          />

          <Metric
            icon={Alert02Icon}
            label="Taxa de reclamações"
            value="1,8%"
            change="-0,4%"
            positive
          />
        </div>
      </section>

      {/* Revenue */}
      <section className="rounded-2xl border border-border/60  p-5">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Desempenho financeiro</h2>

            <p className="text-xs text-muted-foreground">
              Receita gerada e valores destinados aos motoristas.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Receita
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              Motoristas
            </div>
          </div>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity={0.2}
                  />

                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-border/40"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={11}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={11}
                tickFormatter={(value) => `${value / 1000}K`}
              />

              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number) => formatCurrency(value)}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="currentColor"
                fill="url(#revenueGradient)"
                strokeWidth={2}
                className="text-primary"
              />

              <Area
                type="monotone"
                dataKey="driver"
                stroke="currentColor"
                fill="transparent"
                strokeWidth={2}
                className="text-emerald-500"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Trips + Bookings */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-2xl border border-border/60  p-5 xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-sm font-semibold">Viagens</h2>

            <p className="text-xs text-muted-foreground">
              Viagens concluídas e canceladas por dia.
            </p>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ridesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-border/40"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={11}
                />

                <YAxis axisLine={false} tickLine={false} fontSize={11} />

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="completed"
                  name="Concluídas"
                  fill="currentColor"
                  radius={[5, 5, 0, 0]}
                  className="text-secondary"
                />

                <Bar
                  dataKey="cancelled"
                  name="Canceladas"
                  fill="currentColor"
                  radius={[5, 5, 0, 0]}
                  className="text-red-500"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60  p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Estado dos bookings</h2>

            <p className="text-xs text-muted-foreground">
              Distribuição dos pedidos.
            </p>
          </div>

          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {bookingStatusData.map((_, index) => (
                    <Cell
                      key={index}
                      className={
                        [
                          "fill-secondary",
                          "fill-red-500",
                          "fill-blue-500",
                          "fill-orange-500",
                        ][index]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {bookingStatusData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-muted-foreground">{item.name}</span>

                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Operational analytics */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Drivers */}
        <section className="rounded-2xl border border-border/60 ">
          <div className="flex items-center justify-between border-b border-border/60 p-5">
            <div>
              <h2 className="text-sm font-semibold">
                Performance dos motoristas
              </h2>

              <p className="text-xs text-muted-foreground">
                Motoristas com melhor desempenho.
              </p>
            </div>

            <HugeiconsIcon
              icon={UserMultiple02Icon}
              size={19}
              className="text-secondary"
            />
          </div>

          <div className="divide-y divide-border/50">
            {driverPerformance.map((driver, index) => (
              <div key={driver.name} className="flex items-center gap-4 p-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-[10px] font-semibold">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">
                    {driver.name}
                  </p>

                  <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{driver.trips} viagens</span>

                    <span>{driver.completion}% conclusão</span>

                    <span className="flex items-center gap-1">
                      <HugeiconsIcon
                        icon={StarIcon}
                        size={11}
                        className="fill-amber-400 text-amber-400"
                      />

                      {driver.rating}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold tabular-nums">
                    {formatCompactCurrency(driver.earnings)}
                  </p>

                  <p className="text-[10px] text-muted-foreground">ganhos</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vehicles */}
        <section className="rounded-2xl border border-border/60 ">
          <div className="flex items-center justify-between border-b border-border/60 p-5">
            <div>
              <h2 className="text-sm font-semibold">
                Performance das viaturas
              </h2>

              <p className="text-xs text-muted-foreground">
                Utilização e receita por modelo.
              </p>
            </div>

            <HugeiconsIcon
              icon={Car01Icon}
              size={19}
              className="text-secondary"
            />
          </div>

          <div className="divide-y divide-border/50">
            {vehiclePerformance.map((vehicle) => (
              <div key={vehicle.type} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">{vehicle.type}</p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {vehicle.vehicles} viaturas • {vehicle.trips} viagens
                    </p>
                  </div>

                  <p className="text-xs font-semibold">
                    {formatCompactCurrency(vehicle.revenue)}
                  </p>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Utilização</span>

                    <span className="font-medium">{vehicle.utilization}%</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{
                        width: `${vehicle.utilization}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Demand */}
      <section className="rounded-2xl border border-border/60  p-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Procura por horário</h2>

            <p className="text-xs text-muted-foreground">
              Volume de viagens ao longo do dia.
            </p>
          </div>

          <HugeiconsIcon
            icon={Clock01Icon}
            size={19}
            className="text-secondary"
          />
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-border/40"
              />

              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                fontSize={10}
              />

              <YAxis axisLine={false} tickLine={false} fontSize={11} />

              <Tooltip contentStyle={tooltipStyle} />

              <Bar
                dataKey="rides"
                name="Viagens"
                fill="currentColor"
                radius={[5, 5, 0, 0]}
                className="text-secondary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Payments + Reviews + Complaints */}
      <div className="grid gap-4 xl:grid-cols-3">
        {/* Payments */}
        <section className="rounded-2xl border border-border/60  p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Pagamentos</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Métodos utilizados pelos passageiros.
              </p>
            </div>

            <HugeiconsIcon
              icon={Wallet01Icon}
              size={19}
              className="text-secondary"
            />
          </div>

          <div className="mt-6 space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {method.name}
                  </span>

                  <span className="text-xs font-semibold">{method.value}%</span>
                </div>

                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{
                      width: `${method.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="rounded-2xl border border-border/60  p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Avaliações</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Distribuição das notas recebidas.
              </p>
            </div>

            <div className="flex items-center gap-1">
              <HugeiconsIcon
                icon={StarIcon}
                size={16}
                className="fill-amber-400 text-amber-400"
              />

              <span className="text-sm font-semibold">4,72</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-3">
                <span className="w-3 text-xs font-medium">{item.rating}</span>

                <HugeiconsIcon
                  icon={StarIcon}
                  size={12}
                  className="fill-amber-400 text-amber-400"
                />

                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-right text-[10px] text-muted-foreground">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Complaints */}
        <section className="rounded-2xl border border-border/60  p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Reclamações</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Principais motivos reportados.
              </p>
            </div>

            <HugeiconsIcon
              icon={Alert02Icon}
              size={19}
              className="text-orange-500"
            />
          </div>

          <div className="mt-6 space-y-3">
            {complaintCategories.map((category) => (
              <div key={category.name} className="flex items-center gap-3">
                <span className="w-[100px] truncate text-[11px] text-muted-foreground">
                  {category.name}
                </span>

                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{
                      width: `${category.value}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-right text-[10px] font-medium">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Metric                                                                     */
/* -------------------------------------------------------------------------- */

function Metric({
  icon,
  label,
  value,
  change,
  positive = false,
}: {
  icon: any;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border/60  p-5">
      <div className="flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
          <HugeiconsIcon
            icon={icon}
            size={17}
            className="text-muted-foreground"
          />
        </div>

        <span
          className={[
            "flex items-center gap-1 text-[10px] font-medium",
            positive ? "text-emerald-500" : "text-orange-500",
          ].join(" ")}
        >
          <HugeiconsIcon
            icon={positive ? ArrowUp01Icon : ArrowDown01Icon}
            size={12}
          />

          {change}
        </span>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">{label}</p>

      <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
    </div>
  );
}
