"use client";

import * as React from "react";

import {
  Car01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  UserMultiple02Icon,
  UserAdd01Icon,
  Alert02Icon,
  MoreHorizontalIcon,
  EyeIcon,
  Edit02Icon,
  Delete02Icon,
  File02Icon,
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

type VehicleStatus = "active" | "maintenance" | "pending" | "inactive";

type VehicleType = "Sedan" | "SUV" | "Hatchback" | "Minivan";

interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
  status: VehicleStatus;
  image?: string;
  owner: {
    name: string;
    phone: string;
    avatar?: string;
  };
  trips: number;
  lastActivity: string;
  insurance: string;
}

const vehicles: Vehicle[] = [
  {
    id: "VHC-001",
    plate: "LD-45-23-AB",
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    color: "Branco",
    type: "Sedan",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "João Manuel",
      phone: "923 456 789",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    trips: 428,
    lastActivity: "Há 8 min",
    insurance: "Válido",
  },

  {
    id: "VHC-002",
    plate: "LD-72-18-CD",
    brand: "Hyundai",
    model: "Accent",
    year: 2022,
    color: "Cinza",
    type: "Sedan",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Carlos Pedro",
      phone: "924 821 332",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    trips: 392,
    lastActivity: "Há 12 min",
    insurance: "Válido",
  },

  {
    id: "VHC-003",
    plate: "LD-11-92-EF",
    brand: "Toyota",
    model: "RAV4",
    year: 2024,
    color: "Preto",
    type: "SUV",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1568844293986-ca2c9b89c1b4?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Mateus José",
      phone: "925 119 847",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    trips: 351,
    lastActivity: "Há 18 min",
    insurance: "Válido",
  },

  {
    id: "VHC-004",
    plate: "LD-38-76-GH",
    brand: "Kia",
    model: "Picanto",
    year: 2021,
    color: "Vermelho",
    type: "Hatchback",
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "António Luís",
      phone: "926 554 219",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    trips: 287,
    lastActivity: "Ontem",
    insurance: "Válido",
  },

  {
    id: "VHC-005",
    plate: "LD-94-31-IJ",
    brand: "Hyundai",
    model: "Santa Fe",
    year: 2023,
    color: "Azul",
    type: "SUV",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Mário Domingos",
      phone: "923 761 442",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    trips: 312,
    lastActivity: "Há 25 min",
    insurance: "Válido",
  },

  {
    id: "VHC-006",
    plate: "LD-56-42-KL",
    brand: "Toyota",
    model: "Yaris",
    year: 2022,
    color: "Prata",
    type: "Hatchback",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Pedro André",
      phone: "924 337 112",
      avatar: "https://i.pravatar.cc/150?img=17",
    },
    trips: 198,
    lastActivity: "Há 2h",
    insurance: "Pendente",
  },

  {
    id: "VHC-007",
    plate: "LD-83-17-MN",
    brand: "Suzuki",
    model: "Ertiga",
    year: 2023,
    color: "Branco",
    type: "Minivan",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Francisco João",
      phone: "925 668 901",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    trips: 274,
    lastActivity: "Há 31 min",
    insurance: "Válido",
  },

  {
    id: "VHC-008",
    plate: "LD-21-65-OP",
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    color: "Preto",
    type: "Sedan",
    status: "inactive",
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Daniel António",
      phone: "926 778 543",
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    trips: 164,
    lastActivity: "Há 3 dias",
    insurance: "Expirado",
  },

  {
    id: "VHC-009",
    plate: "LD-64-88-QR",
    brand: "Kia",
    model: "Sportage",
    year: 2024,
    color: "Cinza",
    type: "SUV",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Edson Miguel",
      phone: "923 881 992",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    trips: 446,
    lastActivity: "Há 5 min",
    insurance: "Válido",
  },

  {
    id: "VHC-010",
    plate: "LD-42-13-ST",
    brand: "Hyundai",
    model: "i10",
    year: 2022,
    color: "Azul",
    type: "Hatchback",
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80",
    owner: {
      name: "Nelson Paulo",
      phone: "924 991 321",
      avatar: "https://i.pravatar.cc/150?img=21",
    },
    trips: 219,
    lastActivity: "Há 1 dia",
    insurance: "Válido",
  },
];

const statusConfig = {
  active: {
    label: "Ativo",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
  maintenance: {
    label: "Manutenção",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  },
  pending: {
    label: "Pendente",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },
  inactive: {
    label: "Inativo",
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

export default function VehiclesPage() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const pageSize = 10;

  const filteredVehicles = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !query ||
        vehicle.plate.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.owner.name.toLowerCase().includes(query);

      const matchesStatus = status === "all" || vehicle.status === status;

      const matchesType = type === "all" || vehicle.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, status, type]);

  const lastPage = Math.max(1, Math.ceil(filteredVehicles.length / pageSize));

  const paginatedVehicles = filteredVehicles.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, status, type]);

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <HugeiconsIcon
                icon={Car01Icon}
                size={19}
                strokeWidth={1.8}
                className="text-primary"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">Veículos</h1>

              <p className="text-sm text-muted-foreground">
                Gerencie a frota, proprietários e estado dos veículos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ExportCommand
            title="Lista de Veículos"
            onExport={async () => {
              await new Promise((resolve) => setTimeout(resolve, 800));
            }}
          />

          <Button className="h-10 rounded-xl gap-2">
            <HugeiconsIcon icon={Car01Icon} size={15} strokeWidth={1.8} />
            Adicionar veículo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Total de veículos"
          value="1.284"
          delta="+9,4%"
          description="vs. semana passada"
          icon={Car01Icon}
          trend={[980, 1010, 1050, 1100, 1145, 1210, 1284]}
        />

        <StatsCard
          variant="success"
          label="Veículos ativos"
          value="1.087"
          delta="+8,1%"
          description="vs. semana passada"
          icon={CheckmarkCircle02Icon}
          trend={[850, 890, 920, 950, 990, 1040, 1087]}
        />

        <StatsCard
          variant="warning"
          label="Em manutenção"
          value="74"
          delta="-12,6%"
          description="vs. semana passada"
          icon={Clock01Icon}
          trend={[98, 94, 91, 88, 83, 78, 74]}
        />

        <StatsCard
          variant="error"
          label="Documentação pendente"
          value="32"
          delta="-18,2%"
          description="vs. semana passada"
          icon={Alert02Icon}
          trend={[52, 49, 46, 43, 39, 36, 32]}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 ">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar matrícula, veículo ou proprietário..."
              className="h-10 rounded-xl border-border/60 bg-background pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value ?? "all")}
            >
              <SelectTrigger className="h-10 w-[145px] rounded-xl">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os estados</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="maintenance">Manutenção</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={type}
              onValueChange={(value) => setType(value ?? "all")}
            >
              <SelectTrigger className="h-10 w-[140px] rounded-xl">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="Minivan">Minivan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="dark:bg-neutral-800 bg-neutral-700  dark:hover:bg-neutral-700/30 hover:bg-neutral-700">
                <TableHead className="pl-5">Veículo</TableHead>

                <TableHead>Matrícula</TableHead>

                <TableHead>Proprietário</TableHead>

                <TableHead>Tipo</TableHead>

                <TableHead>Estado</TableHead>

                <TableHead>Viagens</TableHead>

                <TableHead>Última atividade</TableHead>

                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedVehicles.map((vehicle) => {
                const config = statusConfig[vehicle.status];

                return (
                  <TableRow
                    key={vehicle.id}
                    className="group border-border/50 transition-colors hover:bg-muted/30"
                  >
                    <TableCell className="py-4 pl-5">
                      <div className="flex items-center gap-3">
                        {/* Vehicle image */}
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40">
                          {vehicle.image ? (
                            <img
                              src={vehicle.image}
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <HugeiconsIcon
                                icon={Car01Icon}
                                size={20}
                                strokeWidth={1.7}
                                className="text-muted-foreground"
                              />
                            </div>
                          )}

                          {/* status indicator */}
                          <span
                            className={[
                              "absolute bottom-1 right-1 size-2 rounded-full",
                              vehicle.status === "active" && "bg-emerald-500",
                              vehicle.status === "maintenance" &&
                                "bg-amber-500",
                              vehicle.status === "pending" && "bg-blue-500",
                              vehicle.status === "inactive" && "bg-red-500",
                              "ring-2 ring-background",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          />
                        </div>

                        {/* Vehicle info */}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {vehicle.brand} {vehicle.model}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-medium text-muted-foreground">
                              {vehicle.plate}
                            </span>

                            <span className="text-muted-foreground/40">•</span>

                            <span className="text-[10px] text-muted-foreground">
                              {vehicle.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Plate */}
                    <TableCell>
                      <Badge
                        variant={"outline"}
                        className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs font-medium"
                      >
                        {vehicle.plate}
                      </Badge>
                    </TableCell>

                    {/* Owner */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8 border border-border/60">
                          <AvatarImage src={vehicle.owner.avatar} />

                          <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                            {initials(vehicle.owner.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium">
                            {vehicle.owner.name}
                          </p>

                          <p className="text-[10px] text-muted-foreground">
                            {vehicle.owner.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {vehicle.type}
                      </span>
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
                      <span className="text-xs font-medium tabular-nums">
                        {vehicle.trips.toLocaleString("pt-PT")}
                      </span>
                    </TableCell>

                    {/* Activity */}
                    <TableCell>
                      <span className="text-[11px] text-muted-foreground">
                        {vehicle.lastActivity}
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
                            Ver detalhes
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Edit02Icon} size={15} />
                            Editar veículo
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={File02Icon} size={15} />
                            Documentos
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                            <HugeiconsIcon icon={Delete02Icon} size={15} />
                            Remover veículo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}

              {paginatedVehicles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                        <HugeiconsIcon
                          icon={Car01Icon}
                          size={18}
                          className="text-muted-foreground"
                        />
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        Nenhum veículo encontrado
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

        {/* Pagination */}
        <Pagination
          page={page}
          lastPage={lastPage}
          totalItems={filteredVehicles.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
