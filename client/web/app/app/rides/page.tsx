"use client";

import * as React from "react";

import {
  Route01Icon,
  Navigation03Icon,
  UserMultiple02Icon,
  Car01Icon,
  Clock01Icon,
  MoreHorizontalIcon,
  EyeIcon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Wallet01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StatsCard from "@/components/StatsCard";
import { Mocktrips } from "@/mocks/trips";

type TripStatus = "active" | "waiting" | "completed" | "cancelled";

interface TripLocation {
  name: string;
  lat: number;
  lng: number;
}

interface TripBooking {
  id: string;
  passenger: {
    id: string;
    name: string;
    avatar?: string;
  };
  seats: number;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
}

export interface Trip {
  id: string;

  from: TripLocation;
  to: TripLocation;

  status: TripStatus;

  driver: {
    id: string;
    name: string;
    avatar?: string;
    vehicle: string;
    plate: string;
  };

  bookings: TripBooking[];

  departureAt: string;
  createdAt: string;
}

const statusConfig = {
  active: {
    label: "Em andamento",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  },

  waiting: {
    label: "A aguardar",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-500",
    dot: "bg-amber-500",
  },

  completed: {
    label: "Concluída",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
    dot: "bg-blue-500",
  },

  cancelled: {
    label: "Cancelada",
    className: "border-red-500/20 bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

const formatCurrency = (value: number) => `${value.toLocaleString("pt-AO")} Kz`;

export default function TripsPage() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const pageSize = 6;

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const filteredTrips = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return Mocktrips.filter((trip) => {
      const matchesSearch =
        !query ||
        trip.id.toLowerCase().includes(query) ||
        trip.from.name.toLowerCase().includes(query) ||
        trip.to.name.toLowerCase().includes(query) ||
        trip.driver.name.toLowerCase().includes(query) ||
        trip.driver.plate.toLowerCase().includes(query);

      const matchesStatus = status === "all" || trip.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const lastPage = Math.max(1, Math.ceil(filteredTrips.length / pageSize));

  const visibleTrips = React.useMemo(() => {
    return filteredTrips.slice(0, currentPage * pageSize);
  }, [filteredTrips, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  const loadNextPage = React.useCallback(async () => {
    if (isLoadingMore) return;

    if (lastPage <= currentPage) return;

    setIsLoadingMore(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setCurrentPage((current) => {
      if (current >= lastPage) return current;

      return current + 1;
    });

    setIsLoadingMore(false);
  }, [currentPage, lastPage, isLoadingMore]);

  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;

        if (lastPage <= currentPage) return;

        if (isLoadingMore) return;

        loadNextPage();
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, lastPage, isLoadingMore, loadNextPage]);

  const stats = {
    total: Mocktrips.length,
    active: Mocktrips.filter((trip) => trip.status === "active").length,
    waiting: Mocktrips.filter((trip) => trip.status === "waiting").length,
    completed: Mocktrips.filter((trip) => trip.status === "completed").length,
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
            <HugeiconsIcon
              icon={Route01Icon}
              size={19}
              strokeWidth={1.8}
              className="text-secondary"
            />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">Corridas</h1>

            <p className="text-sm text-muted-foreground">
              Acompanhe as rotas, motoristas, passageiros e estado das corridas.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Total de corridas"
          value={stats.total.toLocaleString("pt-AO")}
          delta="+12,4%"
          description="hoje"
          icon={Route01Icon}
          trend={[38, 42, 45, 51, 55, 59, stats.total]}
        />

        <StatsCard
          variant="success"
          label="Em andamento"
          value={stats.active.toString()}
          delta="+8,2%"
          description="neste momento"
          icon={Navigation03Icon}
          trend={[5, 7, 6, 8, 9, 8, stats.active]}
        />

        <StatsCard
          variant="warning"
          label="A aguardar"
          value={stats.waiting.toString()}
          delta="-4,8%"
          description="aguardam partida"
          icon={Clock01Icon}
          trend={[9, 8, 7, 8, 6, 5, stats.waiting]}
        />

        <StatsCard
          variant="success"
          label="Concluídas"
          value={stats.completed.toString()}
          delta="+14,7%"
          description="hoje"
          icon={CheckmarkCircle02Icon}
          trend={[21, 26, 29, 34, 38, 42, stats.completed]}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Todas as corridas</h2>

          <p className="text-xs text-muted-foreground">
            Seleccione uma corrida para consultar os seus detalhes.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-[280px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar corrida ou rota..."
              className="h-10 rounded-xl border-border/60 bg-card pl-9"
            />
          </div>

          <Select
            value={status}
            onValueChange={(value) => setStatus(value ?? "all")}
          >
            <SelectTrigger className="h-10 w-full rounded-xl sm:w-[160px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>

              <SelectItem value="active">Em andamento</SelectItem>

              <SelectItem value="waiting">A aguardar</SelectItem>

              <SelectItem value="completed">Concluídas</SelectItem>

              <SelectItem value="cancelled">Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleTrips.map((trip) => {
          const config = statusConfig[trip.status];

          const totalSeats = trip.bookings.reduce(
            (total, booking) => total + booking.seats,
            0,
          );

          const totalAmount = trip.bookings.reduce(
            (total, booking) => total + booking.amount,
            0,
          );

          return (
            <div
              key={trip.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-all hover:border-setext-secondary/20 hover:shadow-sm"
            >
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-secondary/10">
                    <HugeiconsIcon
                      icon={Route01Icon}
                      size={15}
                      className="text-secondary"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-xs font-semibold">{trip.id}</p>

                    <p className="text-[10px] text-muted-foreground">
                      {trip.createdAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className={[
                      "gap-1.5 rounded-full px-2.5 py-1 text-[10px]",
                      config.className,
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "size-1.5 rounded-full",
                        config.dot,
                        trip.status === "active" ? "animate-pulse" : "",
                      ].join(" ")}
                    />

                    {config.label}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg"
                        >
                          <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
                        </Button>
                      }
                    />

                    <DropdownMenuContent
                      align="end"
                      className="w-52 rounded-xl"
                    >
                      <DropdownMenuItem className="gap-2">
                        <HugeiconsIcon icon={EyeIcon} size={15} />
                        Ver corrida
                      </DropdownMenuItem>

                      {trip.status === "active" && (
                        <DropdownMenuItem className="gap-2">
                          <HugeiconsIcon icon={Navigation03Icon} size={15} />
                          Acompanhar corrida
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem className="gap-2">
                        <HugeiconsIcon icon={UserMultiple02Icon} size={15} />
                        Ver reservas
                      </DropdownMenuItem>

                      <DropdownMenuItem className="gap-2">
                        <HugeiconsIcon icon={UserIcon} size={15} />
                        Ver motorista
                      </DropdownMenuItem>

                      {trip.status !== "completed" &&
                        trip.status !== "cancelled" && (
                          <>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                              <HugeiconsIcon icon={Cancel01Icon} size={15} />
                              Cancelar corrida
                            </DropdownMenuItem>
                          </>
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Route */}
              <div className="px-4 py-4">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[7px] top-5 h-[45px] border-l border-dashed border-border" />

                  <div className="flex items-start gap-3">
                    <span className="relative mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Origem
                      </p>

                      <p className="truncate text-sm font-medium">
                        {trip.from.name}
                      </p>

                      <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                        {trip.from.lat.toFixed(5)}, {trip.from.lng.toFixed(5)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <span className="relative mt-1.5 size-2 shrink-0 rounded-full bg-red-500 ring-4 ring-red-500/10" />

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Destino
                      </p>

                      <p className="truncate text-sm font-medium">
                        {trip.to.name}
                      </p>

                      <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                        {trip.to.lat.toFixed(5)}, {trip.to.lng.toFixed(5)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver */}
              <div className="mx-4 rounded-xl bg-muted/90 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Avatar className="size-8 border border-border/60">
                      <AvatarImage src={trip.driver.avatar} />

                      <AvatarFallback className="bg-secondary/10 text-[10px] text-secondary">
                        {initials(trip.driver.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">
                        {trip.driver.name}
                      </p>

                      <p className="truncate text-[10px] text-muted-foreground">
                        {trip.driver.vehicle} · {trip.driver.plate}
                      </p>
                    </div>
                  </div>

                  {trip.status === "active" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 shrink-0 rounded-lg px-2.5 text-[10px]"
                    >
                      <HugeiconsIcon icon={Navigation03Icon} size={13} />
                      Acompanhar
                    </Button>
                  )}
                </div>
              </div>

              {/* Footer metrics */}
              <div className="mt-3 grid grid-cols-3 divide-x border-t border-border/50">
                <div className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <HugeiconsIcon icon={UserMultiple02Icon} size={13} />

                    <span className="text-[10px]">Reservas</span>
                  </div>

                  <p className="mt-1 text-sm font-semibold">
                    {trip.bookings.length}
                  </p>
                </div>

                <div className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <HugeiconsIcon icon={Car01Icon} size={13} />

                    <span className="text-[10px]">Lugares</span>
                  </div>

                  <p className="mt-1 text-sm font-semibold">{totalSeats}</p>
                </div>

                <div className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <HugeiconsIcon icon={Wallet01Icon} size={13} />

                    <span className="text-[10px]">Total</span>
                  </div>

                  <p className="mt-1 truncate text-sm font-semibold">
                    {formatCurrency(totalAmount)}
                  </p>
                </div>
              </div>

              {/* Departure */}
              <div className="flex items-center justify-between border-t border-border/50 px-4 py-2.5">
                <span className="text-[10px] text-muted-foreground">
                  Partida
                </span>

                <span className="text-[10px] font-medium">
                  {trip.departureAt}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTrips.length === 0 && (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-border/60">
          <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
            <HugeiconsIcon
              icon={Route01Icon}
              size={20}
              className="text-muted-foreground"
            />
          </div>

          <p className="mt-3 text-sm font-medium">Nenhuma corrida encontrada</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Tente alterar a pesquisa ou o filtro de estado.
          </p>
        </div>
      )}
      <div
        ref={loadMoreRef}
        className="flex min-h-12 items-center justify-center"
      >
        {isLoadingMore && currentPage < lastPage && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary" />

            <span className="text-xs">A carregar mais corridas...</span>
          </div>
        )}
      </div>
    </section>
  );
}
