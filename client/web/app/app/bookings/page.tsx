"use client";

import * as React from "react";

import {
  Ticket01Icon,
  UserMultiple02Icon,
  Wallet01Icon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon,
  Route01Icon,
  UserIcon,
  CreditCardIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Cancel01Icon,
  MoreHorizontalIcon,
  EyeIcon,
  BankIcon,
  Money01Icon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import StatsCard from "@/components/StatsCard";

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

type PaymentStatus = "paid" | "pending" | "failed";

type PaymentMethod = "multicaixa" | "cash" | "card" | "wallet" | "transfer";

interface Booking {
  id: string;

  passenger: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };

  trip: {
    id: string;
    from: string;
    to: string;
    departureAt: string;
  };

  receiver: {
    id: string;
    name: string;
    avatar?: string;
    vehicle: string;
    plate: string;
  };

  seats: number;

  price: number;

  platformFee: number;

  platformFeePercent: number;

  receiverAmount: number;

  paymentMethod: PaymentMethod;

  paymentStatus: PaymentStatus;

  status: BookingStatus;

  createdAt: string;
}

/* =========================================================
   MOCK DATA
========================================================= */

const bookings: Booking[] = [
  {
    id: "BK-10284",
    passenger: {
      id: "USR-0091",
      name: "João Manuel",
      phone: "+244 923 456 789",
    },
    trip: {
      id: "TR-4821",
      from: "Kilamba",
      to: "Talatona",
      departureAt: "14:30",
    },
    receiver: {
      id: "DRV-102",
      name: "Carlos António",
      vehicle: "Toyota Hiace",
      plate: "LD-45-22-BA",
    },
    seats: 2,
    price: 7000,
    platformFee: 560,
    platformFeePercent: 8,
    receiverAmount: 6440,
    paymentMethod: "multicaixa",
    paymentStatus: "paid",
    status: "confirmed",
    createdAt: "Hoje, 10:42",
  },

  {
    id: "BK-10283",
    passenger: {
      id: "USR-0182",
      name: "Maria Domingos",
      phone: "+244 925 123 456",
    },
    trip: {
      id: "TR-4818",
      from: "Viana",
      to: "Mutamba",
      departureAt: "16:00",
    },
    receiver: {
      id: "DRV-081",
      name: "Pedro Sebastião",
      vehicle: "Toyota Coaster",
      plate: "LD-12-83-AA",
    },
    seats: 1,
    price: 3500,
    platformFee: 280,
    platformFeePercent: 8,
    receiverAmount: 3220,
    paymentMethod: "card",
    paymentStatus: "paid",
    status: "completed",
    createdAt: "Hoje, 09:18",
  },

  {
    id: "BK-10282",
    passenger: {
      id: "USR-0144",
      name: "António José",
      phone: "+244 934 654 321",
    },
    trip: {
      id: "TR-4814",
      from: "Benfica",
      to: "Maianga",
      departureAt: "18:20",
    },
    receiver: {
      id: "DRV-041",
      name: "Nelson Paulo",
      vehicle: "Hyundai H1",
      plate: "LD-77-11-CA",
    },
    seats: 3,
    price: 10500,
    platformFee: 840,
    platformFeePercent: 8,
    receiverAmount: 9660,
    paymentMethod: "wallet",
    paymentStatus: "paid",
    status: "confirmed",
    createdAt: "Hoje, 08:52",
  },

  {
    id: "BK-10281",
    passenger: {
      id: "USR-0321",
      name: "Ana Isabel",
      phone: "+244 922 876 543",
    },
    trip: {
      id: "TR-4809",
      from: "Camama",
      to: "Ingombota",
      departureAt: "19:00",
    },
    receiver: {
      id: "DRV-031",
      name: "Mário Francisco",
      vehicle: "Toyota Hiace",
      plate: "LD-33-12-BA",
    },
    seats: 1,
    price: 4000,
    platformFee: 320,
    platformFeePercent: 8,
    receiverAmount: 3680,
    paymentMethod: "cash",
    paymentStatus: "pending",
    status: "pending",
    createdAt: "Ontem, 22:41",
  },

  {
    id: "BK-10280",
    passenger: {
      id: "USR-0112",
      name: "Bruno António",
      phone: "+244 926 555 112",
    },
    trip: {
      id: "TR-4802",
      from: "Cacuaco",
      to: "Luanda",
      departureAt: "07:30",
    },
    receiver: {
      id: "DRV-019",
      name: "Mateus João",
      vehicle: "Toyota Coaster",
      plate: "LD-91-44-AA",
    },
    seats: 2,
    price: 6000,
    platformFee: 480,
    platformFeePercent: 8,
    receiverAmount: 5520,
    paymentMethod: "transfer",
    paymentStatus: "paid",
    status: "completed",
    createdAt: "Ontem, 18:22",
  },

  {
    id: "BK-10279",
    passenger: {
      id: "USR-0042",
      name: "Cláudia Maria",
      phone: "+244 933 221 456",
    },
    trip: {
      id: "TR-4799",
      from: "Patriota",
      to: "Talatona",
      departureAt: "11:00",
    },
    receiver: {
      id: "DRV-091",
      name: "Edson Manuel",
      vehicle: "Hyundai H1",
      plate: "LD-22-09-BA",
    },
    seats: 1,
    price: 3000,
    platformFee: 240,
    platformFeePercent: 8,
    receiverAmount: 2760,
    paymentMethod: "multicaixa",
    paymentStatus: "failed",
    status: "cancelled",
    createdAt: "Ontem, 15:09",
  },
];

/* =========================================================
   CONFIG
========================================================= */

const bookingStatusConfig = {
  confirmed: {
    label: "Confirmada",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  },

  pending: {
    label: "Pendente",
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

const paymentStatusConfig = {
  paid: {
    label: "Pago",
    className: "text-emerald-500",
  },

  pending: {
    label: "Pendente",
    className: "text-amber-500",
  },

  failed: {
    label: "Falhou",
    className: "text-red-500",
  },
};

const paymentMethodConfig = {
  multicaixa: {
    label: "Multicaixa Express",
    icon: CreditCardIcon,
  },

  cash: {
    label: "Numerário",
    icon: Money01Icon,
  },

  card: {
    label: "Cartão",
    icon: CreditCardIcon,
  },

  wallet: {
    label: "Carteira",
    icon: Wallet01Icon,
  },

  transfer: {
    label: "Transferência",
    icon: BankIcon,
  },
};

/* =========================================================
   HELPERS
========================================================= */

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

const formatCurrency = (value: number) => `${value.toLocaleString("pt-AO")} Kz`;

/* =========================================================
   PAGE
========================================================= */

export default function BookingsPage() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [payment, setPayment] = React.useState("all");

  const filteredBookings = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        booking.id.toLowerCase().includes(query) ||
        booking.passenger.name.toLowerCase().includes(query) ||
        booking.receiver.name.toLowerCase().includes(query) ||
        booking.trip.id.toLowerCase().includes(query) ||
        booking.trip.from.toLowerCase().includes(query) ||
        booking.trip.to.toLowerCase().includes(query);

      const matchesStatus = status === "all" || booking.status === status;

      const matchesPayment =
        payment === "all" || booking.paymentStatus === payment;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [search, status, payment]);

  const stats = React.useMemo(() => {
    const total = bookings.length;

    const gross = bookings.reduce((total, booking) => total + booking.price, 0);

    const fees = bookings.reduce(
      (total, booking) => total + booking.platformFee,
      0,
    );

    const receiverAmount = bookings.reduce(
      (total, booking) => total + booking.receiverAmount,
      0,
    );

    const paid = bookings.filter(
      (booking) => booking.paymentStatus === "paid",
    ).length;

    const pending = bookings.filter(
      (booking) => booking.paymentStatus === "pending",
    ).length;

    return {
      total,
      gross,
      fees,
      receiverAmount,
      paid,
      pending,
    };
  }, []);

  return (
    <section className="flex flex-col gap-5">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
            <HugeiconsIcon
              icon={Ticket01Icon}
              size={19}
              strokeWidth={1.8}
              className="text-secondary"
            />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">Reservas</h1>

            <p className="text-sm text-muted-foreground">
              Consulte reservas, pagamentos, taxas e valores a repassar.
            </p>
          </div>
        </div>

        <Button variant="outline" className="h-9 rounded-xl border-dashed">
          Exportar reservas
        </Button>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Total de reservas"
          value={stats.total.toLocaleString("pt-AO")}
          delta="+12,8%"
          description="vs. período anterior"
          icon={Ticket01Icon}
          trend={[28, 34, 31, 42, 45, 49, stats.total]}
        />

        <StatsCard
          variant="success"
          label="Volume cobrado"
          value={formatCurrency(stats.gross)}
          delta="+18,4%"
          description="valor bruto"
          icon={Wallet01Icon}
          trend={[42, 51, 48, 62, 66, 72, stats.gross / 1000]}
        />

        <StatsCard
          variant="info"
          label="Taxas da plataforma"
          value={formatCurrency(stats.fees)}
          delta="+9,2%"
          description="receita da plataforma"
          icon={ArrowUpRight01Icon}
          trend={[5, 7, 8, 9, 11, 12, stats.fees / 100]}
        />

        <StatsCard
          variant="warning"
          label="A repassar"
          value={formatCurrency(stats.receiverAmount)}
          delta="+14,1%"
          description="para motoristas"
          icon={ArrowDownRight01Icon}
          trend={[30, 38, 42, 49, 52, 58, stats.receiverAmount / 1000]}
        />
      </div>

      {/* =====================================================
          PAYMENT SUMMARY
      ===================================================== */}

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 border-dashed bg-card/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={15}
                  className="text-emerald-500"
                />
              </div>

              <span className="text-xs text-muted-foreground">
                Pagamentos confirmados
              </span>
            </div>

            <span className="text-sm font-semibold">{stats.paid}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 border-dashed bg-card/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={15}
                  className="text-amber-500"
                />
              </div>

              <span className="text-xs text-muted-foreground">
                Pagamentos pendentes
              </span>
            </div>

            <span className="text-sm font-semibold">{stats.pending}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 border-dashed bg-card/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-secondary/10">
                <HugeiconsIcon
                  icon={UserMultiple02Icon}
                  size={15}
                  className="text-secondary"
                />
              </div>

              <span className="text-xs text-muted-foreground">
                Lugares reservados
              </span>
            </div>

            <span className="text-sm font-semibold">
              {bookings.reduce((total, booking) => total + booking.seats, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 border-dashed p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Todas as reservas</h2>

          <p className="text-xs text-muted-foreground">
            Consulte quem pagou, quem recebe e quanto a plataforma reteve.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-[260px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar reserva..."
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

              <SelectItem value="confirmed">Confirmadas</SelectItem>

              <SelectItem value="pending">Pendentes</SelectItem>

              <SelectItem value="completed">Concluídas</SelectItem>

              <SelectItem value="cancelled">Canceladas</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={payment}
            onValueChange={(value) => setPayment(value ?? "all")}
          >
            <SelectTrigger className="h-10 w-full rounded-xl sm:w-[170px]">
              <SelectValue placeholder="Pagamento" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos pagamentos</SelectItem>

              <SelectItem value="paid">Pagos</SelectItem>

              <SelectItem value="pending">Pendentes</SelectItem>

              <SelectItem value="failed">Falhados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-border/60 border-dashed">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-border/60 bg-muted/20">
                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Reserva
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Passageiro
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Recebedor
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Cobrado
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Taxa
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  A repassar
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Pagamento
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Estado
                </th>

                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => {
                const statusConfig = bookingStatusConfig[booking.status];

                const paymentConfig =
                  paymentStatusConfig[booking.paymentStatus];

                const paymentMethod =
                  paymentMethodConfig[booking.paymentMethod];

                return (
                  <tr
                    key={booking.id}
                    className="group border-b border-border/40 last:border-0 hover:bg-muted/20"
                  >
                    {/* RESERVA */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary/10">
                          <HugeiconsIcon
                            icon={Ticket01Icon}
                            size={14}
                            className="text-secondary"
                          />
                        </div>

                        <div>
                          <p className="font-mono text-xs font-semibold">
                            {booking.id}
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-[9px] text-muted-foreground">
                            <HugeiconsIcon icon={Route01Icon} size={10} />

                            {booking.trip.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* PASSAGEIRO */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8 border border-border/60">
                          <AvatarImage src={booking.passenger.avatar} />

                          <AvatarFallback className="bg-secondary/10 text-[9px] text-secondary">
                            {initials(booking.passenger.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="max-w-[140px] truncate text-xs font-medium">
                            {booking.passenger.name}
                          </p>

                          <p className="text-[9px] text-muted-foreground">
                            {booking.seats}{" "}
                            {booking.seats === 1 ? "lugar" : "lugares"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* RECEBEDOR */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8 border border-border/60">
                          <AvatarImage src={booking.receiver.avatar} />

                          <AvatarFallback className="bg-muted text-[9px]">
                            {initials(booking.receiver.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="max-w-[140px] truncate text-xs font-medium">
                            {booking.receiver.name}
                          </p>

                          <p className="max-w-[150px] truncate text-[9px] text-muted-foreground">
                            {booking.receiver.vehicle} ·{" "}
                            {booking.receiver.plate}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* COBRADO */}

                    <td className="px-4 py-4">
                      <div>
                        <p className="text-xs font-semibold">
                          {formatCurrency(booking.price)}
                        </p>

                        <p className="mt-0.5 text-[9px] text-muted-foreground">
                          {booking.seats} × lugar
                        </p>
                      </div>
                    </td>

                    {/* TAXA */}

                    <td className="px-4 py-4">
                      <div>
                        <p className="text-xs font-semibold text-secondary">
                          {formatCurrency(booking.platformFee)}
                        </p>

                        <p className="mt-0.5 text-[9px] text-muted-foreground">
                          {booking.platformFeePercent}% plataforma
                        </p>
                      </div>
                    </td>

                    {/* RECEBEDOR */}

                    <td className="px-4 py-4">
                      <p className="text-xs font-semibold">
                        {formatCurrency(booking.receiverAmount)}
                      </p>

                      <p className="mt-0.5 text-[9px] text-muted-foreground">
                        valor líquido
                      </p>
                    </td>

                    {/* PAYMENT */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-muted">
                          <HugeiconsIcon
                            icon={paymentMethod.icon}
                            size={13}
                            className="text-muted-foreground"
                          />
                        </div>

                        <div>
                          <p className="max-w-[120px] truncate text-[10px] font-medium">
                            {paymentMethod.label}
                          </p>

                          <p
                            className={`text-[9px] ${paymentConfig.className}`}
                          >
                            {paymentConfig.label}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className={`gap-1.5 rounded-full px-2.5 py-1 text-[9px] ${statusConfig.className}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${statusConfig.dot}`}
                        />

                        {statusConfig.label}
                      </Badge>
                    </td>

                    {/* ACTION */}

                    <td className="px-4 py-4">
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
                              />
                            </Button>
                          }
                        />

                        <DropdownMenuContent
                          align="end"
                          className="w-52 rounded-xl"
                        >
                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={EyeIcon} size={15} />
                            Ver reserva
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Route01Icon} size={15} />
                            Ver corrida
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={UserIcon} size={15} />
                            Ver passageiro
                          </DropdownMenuItem>

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon
                              icon={UserMultiple02Icon}
                              size={15}
                            />
                            Ver recebedor
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="gap-2">
                            <HugeiconsIcon icon={Wallet01Icon} size={15} />
                            Ver transação
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}

        <div className="flex flex-col gap-2 border-t border-border/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-muted-foreground">
            A mostrar{" "}
            <span className="font-medium text-foreground">
              {filteredBookings.length}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground">
              {bookings.length}
            </span>{" "}
            reservas
          </p>

          <div className="flex items-center gap-5 text-[10px]">
            <div>
              <span className="text-muted-foreground">Volume:</span>{" "}
              <span className="font-semibold">
                {formatCurrency(stats.gross)}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground">Taxas:</span>{" "}
              <span className="font-semibold text-secondary">
                {formatCurrency(stats.fees)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}

      {filteredBookings.length === 0 && (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-border/60 border-dashed">
          <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
            <HugeiconsIcon
              icon={Ticket01Icon}
              size={20}
              className="text-muted-foreground"
            />
          </div>

          <p className="mt-3 text-sm font-medium">Nenhuma reserva encontrada</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Tente alterar os filtros ou a pesquisa.
          </p>
        </div>
      )}
    </section>
  );
}
