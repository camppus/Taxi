"use client";

import * as React from "react";

import {
  Wallet01Icon,
  Money01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Clock01Icon,
  MoreHorizontalIcon,
  EyeIcon,
  Car01Icon,
  UserMultiple02Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  CancelCircleIcon,
  CreditCardIcon,
  MoneyIcon,
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

type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

type PaymentMethod = "multicaixa" | "cash" | "card" | "wallet";

type Payment = {
  id: string;

  passenger: {
    name: string;
    avatar?: string;
  };

  driver: {
    name: string;
    avatar?: string;
    vehicle: string;
    plate: string;
  };

  bookingId: string;

  amount: number;
  platformFee: number;
  driverAmount: number;

  method: PaymentMethod;
  status: PaymentStatus;

  createdAt: string;
};

const payments: Payment[] = [
  {
    id: "PAY-8291",
    passenger: {
      name: "Ana Maria",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    driver: {
      name: "Carlos António",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookingId: "BK-10291",
    amount: 8500,
    platformFee: 680,
    driverAmount: 7820,
    method: "multicaixa",
    status: "completed",
    createdAt: "Há 6 min",
  },
  {
    id: "PAY-8290",
    passenger: {
      name: "Maria José",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
    driver: {
      name: "Pedro Silva",
      avatar: "https://i.pravatar.cc/150?img=68",
      vehicle: "Hyundai Accent",
      plate: "LD-21-87-CD",
    },
    bookingId: "BK-10290",
    amount: 6000,
    platformFee: 480,
    driverAmount: 5520,
    method: "card",
    status: "completed",
    createdAt: "Há 18 min",
  },
  {
    id: "PAY-8289",
    passenger: {
      name: "João Pedro",
      avatar: "https://i.pravatar.cc/150?img=59",
    },
    driver: {
      name: "Mário Francisco",
      avatar: "https://i.pravatar.cc/150?img=57",
      vehicle: "Toyota Vitz",
      plate: "LD-78-11-EF",
    },
    bookingId: "BK-10289",
    amount: 12500,
    platformFee: 1000,
    driverAmount: 11500,
    method: "wallet",
    status: "completed",
    createdAt: "Há 24 min",
  },
  {
    id: "PAY-8288",
    passenger: {
      name: "Rita Domingos",
      avatar: "https://i.pravatar.cc/150?img=49",
    },
    driver: {
      name: "Daniel José",
      avatar: "https://i.pravatar.cc/150?img=13",
      vehicle: "Kia Picanto",
      plate: "LD-32-45-GH",
    },
    bookingId: "BK-10288",
    amount: 4500,
    platformFee: 360,
    driverAmount: 4140,
    method: "multicaixa",
    status: "pending",
    createdAt: "Há 31 min",
  },
  {
    id: "PAY-8287",
    passenger: {
      name: "Bruno António",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    driver: {
      name: "Teresa Manuel",
      avatar: "https://i.pravatar.cc/150?img=47",
      vehicle: "Suzuki Swift",
      plate: "LD-19-67-IJ",
    },
    bookingId: "BK-10287",
    amount: 7500,
    platformFee: 600,
    driverAmount: 6900,
    method: "cash",
    status: "completed",
    createdAt: "Há 42 min",
  },
  {
    id: "PAY-8286",
    passenger: {
      name: "Elisa Maria",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    driver: {
      name: "Carlos Manuel",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-55-12-KL",
    },
    bookingId: "BK-10286",
    amount: 10000,
    platformFee: 800,
    driverAmount: 9200,
    method: "card",
    status: "completed",
    createdAt: "Há 51 min",
  },
  {
    id: "PAY-8285",
    passenger: {
      name: "Sónia Pedro",
      avatar: "https://i.pravatar.cc/150?img=48",
    },
    driver: {
      name: "Pedro António",
      avatar: "https://i.pravatar.cc/150?img=68",
      vehicle: "Hyundai i10",
      plate: "LD-67-88-MN",
    },
    bookingId: "BK-10285",
    amount: 5500,
    platformFee: 440,
    driverAmount: 5060,
    method: "wallet",
    status: "failed",
    createdAt: "Há 1h",
  },
  {
    id: "PAY-8284",
    passenger: {
      name: "Carlos Manuel",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    driver: {
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=59",
      vehicle: "Toyota Yaris",
      plate: "LD-44-22-OP",
    },
    bookingId: "BK-10284",
    amount: 9000,
    platformFee: 720,
    driverAmount: 8280,
    method: "multicaixa",
    status: "refunded",
    createdAt: "Há 1h",
  },
  {
    id: "PAY-8283",
    passenger: {
      name: "Teresa Manuel",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    driver: {
      name: "Mário Francisco",
      avatar: "https://i.pravatar.cc/150?img=57",
      vehicle: "Toyota Vitz",
      plate: "LD-78-11-EF",
    },
    bookingId: "BK-10283",
    amount: 7000,
    platformFee: 560,
    driverAmount: 6440,
    method: "cash",
    status: "completed",
    createdAt: "Há 2h",
  },
  {
    id: "PAY-8282",
    passenger: {
      name: "Daniel José",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    driver: {
      name: "Carlos António",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookingId: "BK-10282",
    amount: 11500,
    platformFee: 920,
    driverAmount: 10580,
    method: "card",
    status: "completed",
    createdAt: "Há 2h",
  },
  {
    id: "PAY-8281",
    passenger: {
      name: "Ana Maria",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    driver: {
      name: "Pedro Silva",
      avatar: "https://i.pravatar.cc/150?img=68",
      vehicle: "Hyundai Accent",
      plate: "LD-21-87-CD",
    },
    bookingId: "BK-10281",
    amount: 6500,
    platformFee: 520,
    driverAmount: 5980,
    method: "multicaixa",
    status: "completed",
    createdAt: "Há 3h",
  },
];

const statusConfig = {
  completed: {
    label: "Concluído",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
  pending: {
    label: "Pendente",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },
  failed: {
    label: "Falhou",
    className: "border-red-500/20 bg-red-500/10 text-red-500",
  },
  refunded: {
    label: "Reembolsado",
    className: "border-orange-500/20 bg-orange-500/10 text-orange-500",
  },
};

const methodConfig = {
  multicaixa: {
    label: "Multicaixa Express",
  },
  cash: {
    label: "Dinheiro",
  },
  card: {
    label: "Cartão",
  },
  wallet: {
    label: "Carteira",
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

export default function PaymentsPage() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [method, setMethod] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const pageSize = 10;

  const filteredPayments = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.id.toLowerCase().includes(query) ||
        payment.bookingId.toLowerCase().includes(query) ||
        payment.passenger.name.toLowerCase().includes(query) ||
        payment.driver.name.toLowerCase().includes(query) ||
        payment.driver.plate.toLowerCase().includes(query);

      const matchesStatus = status === "all" || payment.status === status;

      const matchesMethod = method === "all" || payment.method === method;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [search, status, method]);

  const lastPage = Math.max(1, Math.ceil(filteredPayments.length / pageSize));

  const paginatedPayments = filteredPayments.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, status, method]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
              <HugeiconsIcon
                icon={Wallet01Icon}
                size={19}
                strokeWidth={1.8}
                className="text-secondary"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Pagamentos
              </h1>

              <p className="text-sm text-muted-foreground">
                Acompanhe pagamentos, taxas da plataforma e valores dos
                motoristas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ExportCommand
            title="Lista de Pagamentos"
            onExport={async () => {
              await new Promise((resolve) => setTimeout(resolve, 800));
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Volume processado"
          value="8,42M Kz"
          delta="+14,8%"
          description="vs. semana passada"
          icon={Money01Icon}
          trend={[
            5200000, 5840000, 6100000, 6720000, 7180000, 7820000, 8420000,
          ]}
        />

        <StatsCard
          variant="success"
          label="Receita da plataforma"
          value="673,6K Kz"
          delta="+12,4%"
          description="taxas acumuladas"
          icon={ArrowUp01Icon}
          trend={[420000, 466000, 488000, 535000, 571000, 625000, 673600]}
        />

        <StatsCard
          variant="success"
          label="Pago aos motoristas"
          value="7,75M Kz"
          delta="+15,2%"
          description="valor líquido"
          icon={Car01Icon}
          trend={[
            4780000, 5370000, 5610000, 6185000, 6609000, 7195000, 7746400,
          ]}
        />

        <StatsCard
          variant="warning"
          label="Pagamentos pendentes"
          value="38"
          delta="-8,7%"
          description="aguardando liquidação"
          icon={Clock01Icon}
          trend={[57, 53, 49, 46, 44, 41, 38]}
        />
      </div>

      {/* Financial summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total recebido</p>

              <p className="mt-2 text-xl font-semibold tabular-nums">
                8.420.000 Kz
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={19}
                className="text-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                Taxa da plataforma
              </p>

              <p className="mt-2 text-xl font-semibold tabular-nums">
                673.600 Kz
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <HugeiconsIcon
                icon={MoneyIcon}
                size={19}
                className="text-primary"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                Líquido para motoristas
              </p>

              <p className="mt-2 text-xl font-semibold tabular-nums">
                7.746.400 Kz
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10">
              <HugeiconsIcon
                icon={Wallet01Icon}
                size={19}
                className="text-blue-500"
              />
            </div>
          </div>
        </div>
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
              placeholder="Pesquisar pagamento, passageiro ou motorista..."
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
                <SelectItem value="completed">Concluídos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="failed">Falhados</SelectItem>
                <SelectItem value="refunded">Reembolsados</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={method}
              onValueChange={(value) => setMethod(value ?? "all")}
            >
              <SelectTrigger className="h-10 w-[160px] rounded-xl">
                <SelectValue placeholder="Método" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os métodos</SelectItem>
                <SelectItem value="multicaixa">Multicaixa Express</SelectItem>
                <SelectItem value="card">Cartão</SelectItem>
                <SelectItem value="wallet">Carteira</SelectItem>
                <SelectItem value="cash">Dinheiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-700 hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/30">
                <TableHead className="pl-5">Pagamento</TableHead>

                <TableHead>Passageiro</TableHead>

                <TableHead>Motorista</TableHead>

                <TableHead>Valor pago</TableHead>

                <TableHead>Taxa plataforma</TableHead>

                <TableHead>Motorista recebe</TableHead>

                <TableHead>Método</TableHead>

                <TableHead>Estado</TableHead>

                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedPayments.map((payment) => {
                const status = statusConfig[payment.status];
                const methodLabel = methodConfig[payment.method];

                return (
                  <TableRow
                    key={payment.id}
                    className="group border-border/50 transition-colors hover:bg-muted/30"
                  >
                    {/* Payment */}
                    <TableCell className="py-4 pl-5">
                      <div>
                        <p className="text-xs font-semibold">{payment.id}</p>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {payment.bookingId}
                        </p>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {payment.createdAt}
                        </p>
                      </div>
                    </TableCell>

                    {/* Passenger */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8 border border-border/60">
                          <AvatarImage
                            src={payment.passenger.avatar}
                            alt={payment.passenger.name}
                          />

                          <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                            {initials(payment.passenger.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium">
                            {payment.passenger.name}
                          </p>

                          <p className="text-[10px] text-muted-foreground">
                            Passageiro
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Driver */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8 border border-border/60">
                          <AvatarImage
                            src={payment.driver.avatar}
                            alt={payment.driver.name}
                          />

                          <AvatarFallback className="bg-secondary/10 text-[10px] font-semibold text-secondary">
                            {initials(payment.driver.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium">
                            {payment.driver.name}
                          </p>

                          <p className="text-[10px] text-muted-foreground">
                            {payment.driver.plate}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Gross */}
                    <TableCell>
                      <p className="text-xs font-semibold tabular-nums">
                        {formatCurrency(payment.amount)}
                      </p>
                    </TableCell>

                    {/* Platform fee */}
                    <TableCell>
                      <div>
                        <p className="text-xs font-semibold tabular-nums text-primary">
                          +{formatCurrency(payment.platformFee)}
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          8% plataforma
                        </p>
                      </div>
                    </TableCell>

                    {/* Driver amount */}
                    <TableCell>
                      <div>
                        <p className="text-xs font-semibold tabular-nums text-emerald-500">
                          {formatCurrency(payment.driverAmount)}
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          líquido
                        </p>
                      </div>
                    </TableCell>

                    {/* Method */}
                    <TableCell>
                      <span className="text-[11px] text-muted-foreground">
                        {methodLabel.label}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-medium",
                          status.className,
                        ].join(" ")}
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {status.label}
                      </Badge>
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
                            Ver pagamento
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon
                              icon={UserMultiple02Icon}
                              size={15}
                            />
                            Ver passageiro
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Car01Icon} size={15} />
                            Ver motorista
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Wallet01Icon} size={15} />
                            Ver liquidação
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}

              {paginatedPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                        <HugeiconsIcon
                          icon={Wallet01Icon}
                          size={18}
                          className="text-muted-foreground"
                        />
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        Nenhum pagamento encontrado
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
          totalItems={filteredPayments.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
