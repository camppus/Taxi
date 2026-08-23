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
  Call02Icon,
  Ticket01Icon,
  Wallet01Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
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

type PassengerStatus = "active" | "pending" | "blocked" | "inactive";

type Passenger = {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  status: PassengerStatus;
  trips: number;
  completedTrips: number;
  cancelledTrips: number;
  totalSpent: number;
  lastActivity: string;
  registeredAt: string;
};

const passengers: Passenger[] = [
  {
    id: "PSG-001",
    name: "Ana Maria",
    phone: "923 441 829",
    email: "ana.maria@email.com",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "active",
    trips: 86,
    completedTrips: 81,
    cancelledTrips: 5,
    totalSpent: 186500,
    lastActivity: "Há 6 min",
    registeredAt: "12 Jan 2026",
  },
  {
    id: "PSG-002",
    name: "Carlos Manuel",
    phone: "924 782 116",
    email: "carlos.manuel@email.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "active",
    trips: 124,
    completedTrips: 117,
    cancelledTrips: 7,
    totalSpent: 294000,
    lastActivity: "Há 18 min",
    registeredAt: "08 Dez 2025",
  },
  {
    id: "PSG-003",
    name: "Maria José",
    phone: "925 118 432",
    email: "maria.jose@email.com",
    avatar: "https://i.pravatar.cc/150?img=44",
    status: "active",
    trips: 63,
    completedTrips: 59,
    cancelledTrips: 4,
    totalSpent: 142500,
    lastActivity: "Há 24 min",
    registeredAt: "21 Fev 2026",
  },
  {
    id: "PSG-004",
    name: "Pedro António",
    phone: "926 552 781",
    email: "pedro.antonio@email.com",
    avatar: "https://i.pravatar.cc/150?img=68",
    status: "pending",
    trips: 12,
    completedTrips: 10,
    cancelledTrips: 2,
    totalSpent: 24500,
    lastActivity: "Há 1h",
    registeredAt: "18 Ago 2026",
  },
  {
    id: "PSG-005",
    name: "João Pedro",
    phone: "923 671 442",
    email: "joao.pedro@email.com",
    avatar: "https://i.pravatar.cc/150?img=59",
    status: "active",
    trips: 148,
    completedTrips: 141,
    cancelledTrips: 7,
    totalSpent: 361000,
    lastActivity: "Há 9 min",
    registeredAt: "03 Nov 2025",
  },
  {
    id: "PSG-006",
    name: "Teresa Manuel",
    phone: "924 337 821",
    email: "teresa.manuel@email.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: "inactive",
    trips: 31,
    completedTrips: 28,
    cancelledTrips: 3,
    totalSpent: 71000,
    lastActivity: "Há 12 dias",
    registeredAt: "16 Mar 2026",
  },
  {
    id: "PSG-007",
    name: "Mário Francisco",
    phone: "925 891 224",
    email: "mario.francisco@email.com",
    avatar: "https://i.pravatar.cc/150?img=57",
    status: "active",
    trips: 97,
    completedTrips: 92,
    cancelledTrips: 5,
    totalSpent: 217500,
    lastActivity: "Há 32 min",
    registeredAt: "27 Dez 2025",
  },
  {
    id: "PSG-008",
    name: "Rita Domingos",
    phone: "926 441 109",
    email: "rita.domingos@email.com",
    avatar: "https://i.pravatar.cc/150?img=49",
    status: "active",
    trips: 76,
    completedTrips: 72,
    cancelledTrips: 4,
    totalSpent: 169000,
    lastActivity: "Há 41 min",
    registeredAt: "09 Jan 2026",
  },
  {
    id: "PSG-009",
    name: "Bruno António",
    phone: "923 718 552",
    email: "bruno.antonio@email.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "blocked",
    trips: 42,
    completedTrips: 34,
    cancelledTrips: 8,
    totalSpent: 98000,
    lastActivity: "Há 2 dias",
    registeredAt: "22 Jan 2026",
  },
  {
    id: "PSG-010",
    name: "Elisa Maria",
    phone: "924 881 334",
    email: "elisa.maria@email.com",
    avatar: "https://i.pravatar.cc/150?img=45",
    status: "active",
    trips: 112,
    completedTrips: 107,
    cancelledTrips: 5,
    totalSpent: 258500,
    lastActivity: "Há 14 min",
    registeredAt: "14 Out 2025",
  },
  {
    id: "PSG-011",
    name: "Daniel José",
    phone: "925 443 881",
    email: "daniel.jose@email.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    status: "active",
    trips: 54,
    completedTrips: 51,
    cancelledTrips: 3,
    totalSpent: 124500,
    lastActivity: "Há 1h",
    registeredAt: "07 Abr 2026",
  },
  {
    id: "PSG-012",
    name: "Sónia Pedro",
    phone: "926 227 110",
    email: "sonia.pedro@email.com",
    avatar: "https://i.pravatar.cc/150?img=48",
    status: "pending",
    trips: 8,
    completedTrips: 7,
    cancelledTrips: 1,
    totalSpent: 16000,
    lastActivity: "Há 3h",
    registeredAt: "20 Ago 2026",
  },
];

const statusConfig = {
  active: {
    label: "Ativo",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
  pending: {
    label: "Pendente",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },
  blocked: {
    label: "Bloqueado",
    className: "border-red-500/20 bg-red-500/10 text-red-500",
  },
  inactive: {
    label: "Inativo",
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500",
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

export default function PassengersPage() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const pageSize = 10;

  const filteredPassengers = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return passengers.filter((passenger) => {
      const matchesSearch =
        !query ||
        passenger.name.toLowerCase().includes(query) ||
        passenger.phone.toLowerCase().includes(query) ||
        passenger.email.toLowerCase().includes(query);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
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
                Passageiros
              </h1>

              <p className="text-sm text-muted-foreground">
                Gerencie passageiros, atividade, corridas e conta.
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

          <Button className="h-10 gap-2 rounded-xl">
            <HugeiconsIcon icon={UserAdd01Icon} size={16} strokeWidth={1.8} />
            Adicionar passageiro
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Total de passageiros"
          value="4.826"
          delta="+11,8%"
          description="vs. semana passada"
          icon={UserMultiple02Icon}
          trend={[3920, 4050, 4180, 4310, 4450, 4620, 4826]}
        />

        <StatsCard
          variant="success"
          label="Passageiros ativos"
          value="3.914"
          delta="+9,6%"
          description="vs. semana passada"
          icon={UserCheck01Icon}
          trend={[3260, 3340, 3430, 3510, 3610, 3780, 3914]}
        />

        <StatsCard
          variant="success"
          label="Novos passageiros"
          value="286"
          delta="+16,4%"
          description="esta semana"
          icon={UserAdd01Icon}
          trend={[170, 184, 201, 218, 231, 258, 286]}
        />

        <StatsCard
          variant="warning"
          label="Contas pendentes"
          value="47"
          delta="-13,2%"
          description="vs. semana passada"
          icon={Clock01Icon}
          trend={[68, 64, 61, 57, 54, 51, 47]}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/60">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar nome, telefone ou email..."
              className="h-10 rounded-xl border-border/60 bg-background pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value ?? "all")}
            >
              <SelectTrigger className="h-10 w-[150px] rounded-xl">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="blocked">Bloqueados</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-700 hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/30">
                <TableHead className="pl-5">Passageiro</TableHead>

                <TableHead>Contacto</TableHead>

                <TableHead>Estado</TableHead>

                <TableHead>Corridas</TableHead>

                <TableHead>Gasto total</TableHead>

                <TableHead>Última atividade</TableHead>

                <TableHead>Registado em</TableHead>

                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedPassengers.map((passenger) => {
                const config = statusConfig[passenger.status];

                return (
                  <TableRow
                    key={passenger.id}
                    className="group border-border/50 transition-colors hover:bg-muted/30"
                  >
                    {/* Passenger */}
                    <TableCell className="py-4 pl-5">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 border border-border/60">
                          <AvatarImage
                            src={passenger.avatar}
                            alt={passenger.name}
                          />

                          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                            {initials(passenger.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {passenger.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {passenger.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                      <div>
                        <p className="text-xs font-medium">{passenger.phone}</p>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {passenger.email}
                        </p>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-medium",
                          config.className,
                        ].join(" ")}
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {config.label}
                      </Badge>
                    </TableCell>

                    {/* Trips */}
                    <TableCell>
                      <div>
                        <p className="text-xs font-semibold tabular-nums">
                          {passenger.trips}
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          {passenger.completedTrips} concluídas
                        </p>
                      </div>
                    </TableCell>

                    {/* Spending */}
                    <TableCell>
                      <div>
                        <p className="text-xs font-semibold tabular-nums">
                          {formatCurrency(passenger.totalSpent)}
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          {passenger.cancelledTrips} canceladas
                        </p>
                      </div>
                    </TableCell>

                    {/* Activity */}
                    <TableCell>
                      <span className="text-[11px] text-muted-foreground">
                        {passenger.lastActivity}
                      </span>
                    </TableCell>

                    {/* Registered */}
                    <TableCell>
                      <span className="text-[11px] text-muted-foreground">
                        {passenger.registeredAt}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="
                                size-8
                                rounded-lg
                                text-muted-foreground
                                opacity-0
                                transition-opacity
                                group-hover:opacity-100
                                hover:bg-muted
                                hover:text-foreground
                              "
                            >
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                size={17}
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
                            Ver perfil
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Call02Icon} size={15} />
                            Contactar
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Ticket01Icon} size={15} />
                            Ver corridas
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Wallet01Icon} size={15} />
                            Ver pagamentos
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Edit02Icon} size={15} />
                            Editar passageiro
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

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
                        Tente alterar os filtros ou a pesquisa.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
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
    </div>
  );
}
