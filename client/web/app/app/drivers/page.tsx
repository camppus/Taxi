"use client";

import * as React from "react";

import {
  UserMultiple02Icon,
  UserCheck01Icon,
  UserAdd01Icon,
  Clock01Icon,
  MoreHorizontalIcon,
  EyeIcon,
  Edit02Icon,
  Delete02Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  StarIcon,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatsCard from "@/components/StatsCard";
import Pagination from "@/components/Pagination";
import { ExportCommand } from "@/components/ExportCommand";
import TableSkeleton from "@/components/TableSkeleton";

type PassengerStatus = "active" | "inactive" | "pending" | "blocked";

interface Passenger {
  id: string;
  name: string;
  phone: string;
  avatar?: string;

  status: PassengerStatus;

  rating: number;
  trips: number;

  totalSpent: string;
  lastTrip: string;
  joinedAt: string;
}

const passengers: Passenger[] = [
  {
    id: "PAX-001",
    name: "Ana Maria",
    phone: "+244 923 456 781",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "active",
    rating: 4.9,
    trips: 87,
    totalSpent: "128.400 Kz",
    lastTrip: "Há 12 min",
    joinedAt: "08 Jan 2026",
  },
  {
    id: "PAX-002",
    name: "Carlos Pedro",
    phone: "+244 924 781 233",
    avatar: "https://i.pravatar.cc/150?img=33",
    status: "active",
    rating: 4.7,
    trips: 64,
    totalSpent: "91.800 Kz",
    lastTrip: "Há 35 min",
    joinedAt: "14 Jan 2026",
  },
  {
    id: "PAX-003",
    name: "Maria João",
    phone: "+244 925 662 114",
    avatar: "https://i.pravatar.cc/150?img=44",
    status: "active",
    rating: 4.8,
    trips: 112,
    totalSpent: "174.600 Kz",
    lastTrip: "Há 1h",
    joinedAt: "21 Jan 2026",
  },
  {
    id: "PAX-004",
    name: "Pedro António",
    phone: "+244 926 318 551",
    avatar: "https://i.pravatar.cc/150?img=51",
    status: "inactive",
    rating: 4.4,
    trips: 39,
    totalSpent: "52.700 Kz",
    lastTrip: "Há 8 dias",
    joinedAt: "02 Fev 2026",
  },
  {
    id: "PAX-005",
    name: "Joana Manuel",
    phone: "+244 927 552 892",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: "active",
    rating: 5.0,
    trips: 143,
    totalSpent: "218.900 Kz",
    lastTrip: "Há 2h",
    joinedAt: "09 Fev 2026",
  },
  {
    id: "PAX-006",
    name: "Manuel Francisco",
    phone: "+244 923 778 441",
    avatar: "https://i.pravatar.cc/150?img=53",
    status: "active",
    rating: 4.6,
    trips: 76,
    totalSpent: "103.200 Kz",
    lastTrip: "Ontem",
    joinedAt: "17 Fev 2026",
  },
  {
    id: "PAX-007",
    name: "Daniel Paulo",
    phone: "+244 924 887 122",
    avatar: "https://i.pravatar.cc/150?img=59",
    status: "pending",
    rating: 0,
    trips: 0,
    totalSpent: "0 Kz",
    lastTrip: "—",
    joinedAt: "03 Mar 2026",
  },
  {
    id: "PAX-008",
    name: "Nelson André",
    phone: "+244 925 441 765",
    avatar: "https://i.pravatar.cc/150?img=60",
    status: "active",
    rating: 4.5,
    trips: 51,
    totalSpent: "68.900 Kz",
    lastTrip: "Há 3h",
    joinedAt: "11 Mar 2026",
  },
  {
    id: "PAX-009",
    name: "Bruno Mateus",
    phone: "+244 926 921 443",
    avatar: "https://i.pravatar.cc/150?img=68",
    status: "blocked",
    rating: 3.9,
    trips: 28,
    totalSpent: "37.500 Kz",
    lastTrip: "Há 14 dias",
    joinedAt: "19 Mar 2026",
  },
  {
    id: "PAX-010",
    name: "Adriano Luís",
    phone: "+244 927 331 982",
    avatar: "https://i.pravatar.cc/150?img=69",
    status: "active",
    rating: 4.8,
    trips: 94,
    totalSpent: "136.700 Kz",
    lastTrip: "Há 5h",
    joinedAt: "26 Mar 2026",
  },
];

const statusConfig = {
  active: {
    label: "Ativo",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },

  inactive: {
    label: "Inativo",
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500",
  },

  pending: {
    label: "Pendente",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },

  blocked: {
    label: "Bloqueado",
    className: "border-red-500/20 bg-red-500/10 text-red-500",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

export default function PassengersPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [hover, setHover] = React.useState("");
  const pageSize = 10;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredPassengers = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return passengers.filter((passenger) => {
      const matchesSearch =
        !query ||
        passenger.name.toLowerCase().includes(query) ||
        passenger.phone.toLowerCase().includes(query) ||
        passenger.id.toLowerCase().includes(query);

      const matchesStatus = status === "all" || passenger.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const lastPage = Math.max(1, Math.ceil(filteredPassengers.length / pageSize));

  const paginatedPassengers = filteredPassengers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, status]);

  return (
    <section className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
              <HugeiconsIcon
                icon={UserMultiple02Icon}
                size={19}
                strokeWidth={1.8}
                className="text-secondary"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Motoristas
              </h1>

              <p className="text-sm text-muted-foreground">
                Gerencie motoristas, corridas, avaliações e atividade da
                plataforma.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ExportCommand
            title="Lista de Passageiros"
            onExport={async () => {
              await new Promise((resolve) => setTimeout(resolve, 800));
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Total de passageiros"
          value="8.426"
          delta="+11,8%"
          description="vs. semana passada"
          icon={UserMultiple02Icon}
          trend={[6800, 7040, 7310, 7580, 7810, 8090, 8426]}
        />

        <StatsCard
          variant="success"
          label="Passageiros ativos"
          value="6.982"
          delta="+9,4%"
          description="vs. semana passada"
          icon={UserCheck01Icon}
          trend={[5900, 6040, 6210, 6380, 6520, 6700, 6982]}
        />

        <StatsCard
          variant="warning"
          label="Novos passageiros"
          value="386"
          delta="+16,2%"
          description="esta semana"
          icon={UserAdd01Icon}
          trend={[210, 238, 265, 290, 315, 352, 386]}
        />

        <StatsCard
          variant="error"
          label="Passageiros bloqueados"
          value="58"
          delta="-6,4%"
          description="vs. semana passada"
          icon={Clock01Icon}
          trend={[76, 72, 69, 66, 64, 61, 58]}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60">
        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar passageiro..."
              className="h-10 rounded-xl border-border/60 bg-card pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value ?? "all")}
            >
              <SelectTrigger className="h-10 w-[155px] rounded-xl">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>

                <SelectItem value="active">Ativos</SelectItem>

                <SelectItem value="inactive">Inativos</SelectItem>

                <SelectItem value="pending">Pendentes</SelectItem>

                <SelectItem value="blocked">Bloqueados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-700 hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/30">
                <TableHead className="h-11 pl-5 text-white">
                  Passageiro
                </TableHead>

                <TableHead className="h-11 text-white">Status</TableHead>

                <TableHead className="h-11 text-white">Avaliação</TableHead>

                <TableHead className="h-11 text-white">Corridas</TableHead>

                <TableHead className="h-11 text-white">Total gasto</TableHead>

                <TableHead className="h-11 text-white">
                  Última corrida
                </TableHead>

                <TableHead className="h-11 text-white">Registo</TableHead>

                <TableHead className="w-12.5" />
              </TableRow>
            </TableHeader>

            {isLoading ? (
              <TableSkeleton rows={10} />
            ) : (
              <TableBody>
                {paginatedPassengers.map((passenger, index) => {
                  const config = statusConfig[passenger.status];

                  return (
                    <TableRow
                      onMouseEnter={() => {
                        setHover(passenger.id);
                      }}
                      key={passenger.id}
                      className={[
                        "group border-border/50 transition-colors hover:bg-muted/30",
                        index % 2 === 0 ? "bg-muted/70" : "",
                      ].join(" ")}
                    >
                      {/* Passenger */}
                      <TableCell className="py-4 pl-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 border border-border/60">
                            <AvatarImage
                              src={passenger.avatar}
                              alt={passenger.name}
                            />

                            <AvatarFallback className="bg-primary/10 text-primary">
                              {initials(passenger.name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {passenger.name}
                            </p>

                            <div className="mt-0.5 flex items-center gap-1.5">
                              <p className="text-[11px] text-muted-foreground">
                                {passenger.phone}
                              </p>

                              <span className="text-[10px] text-muted-foreground/40">
                                •
                              </span>

                              <span className="font-mono text-[10px] text-muted-foreground">
                                {passenger.id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={[
                            "gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium",
                            config.className,
                          ].join(" ")}
                        >
                          <span className="size-1.5 rounded-full bg-current" />
                          {config.label}
                        </Badge>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        {passenger.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon
                              icon={StarIcon}
                              size={14}
                              strokeWidth={1.8}
                              className="fill-amber-400 text-amber-400"
                            />

                            <span className="text-sm font-medium tabular-nums">
                              {passenger.rating.toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>

                      {/* Trips */}
                      <TableCell>
                        <span className="text-sm font-medium tabular-nums">
                          {passenger.trips.toLocaleString("pt-AO")}
                        </span>
                      </TableCell>

                      {/* Spending */}
                      <TableCell>
                        <span className="text-sm font-semibold tabular-nums">
                          {passenger.totalSpent}
                        </span>
                      </TableCell>

                      {/* Last trip */}
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {passenger.lastTrip}
                        </span>
                      </TableCell>

                      {/* Joined */}
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {passenger.joinedAt}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-lg opacity-60 transition-opacity group-hover:opacity-100"
                              >
                                <HugeiconsIcon
                                  icon={MoreHorizontalIcon}
                                  size={16}
                                  strokeWidth={1.8}
                                />
                              </Button>
                            }
                          />

                          <DropdownMenuContent
                            align="end"
                            className="w-48 rounded-xl"
                          >
                            <DropdownMenuItem className="gap-2">
                              <HugeiconsIcon icon={EyeIcon} size={15} />
                              Ver detalhes
                            </DropdownMenuItem>

                            <DropdownMenuItem className="gap-2">
                              <HugeiconsIcon icon={Edit02Icon} size={15} />
                              Editar passageiro
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {passenger.status === "blocked" ? (
                              <DropdownMenuItem className="gap-2 text-emerald-500 focus:text-emerald-500">
                                <HugeiconsIcon
                                  icon={CheckmarkCircle02Icon}
                                  size={15}
                                />
                                Desbloquear
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                                <HugeiconsIcon icon={Cancel01Icon} size={15} />
                                Bloquear passageiro
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                              <HugeiconsIcon icon={Delete02Icon} size={15} />
                              Remover passageiro
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {paginatedPassengers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                          <HugeiconsIcon
                            icon={UserMultiple02Icon}
                            size={18}
                            className="text-muted-foreground"
                          />
                        </div>

                        <p className="mt-3 text-sm font-medium">
                          Nenhum passageiro encontrado
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Tente alterar a pesquisa ou os filtros.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>

        <Pagination
          page={page}
          lastPage={lastPage}
          totalItems={filteredPassengers.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
