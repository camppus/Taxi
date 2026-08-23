"use client";

import * as React from "react";

import {
  StarIcon,
  Message01Icon,
  UserMultiple02Icon,
  Car01Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  MoreHorizontalIcon,
  EyeIcon,
  Call02Icon,
  Ticket01Icon,
  Flag02Icon,
  FilterIcon,
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

type Tab = "reviews" | "complaints";

type ReviewStatus = "published" | "pending" | "hidden";

type ComplaintStatus = "open" | "investigating" | "resolved" | "rejected";

type Review = {
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

  rating: number;
  comment: string;

  categories: string[];

  createdAt: string;
  status: ReviewStatus;
};

type Complaint = {
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

  subject: string;
  description: string;

  category: string;
  priority: "low" | "medium" | "high";

  status: ComplaintStatus;

  createdAt: string;
};

const reviews: Review[] = [
  {
    id: "REV-00981",
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
    rating: 5,
    comment: "Motorista muito educado e chegou rapidamente. Excelente viagem.",
    categories: ["Educado", "Pontual"],
    createdAt: "Há 8 min",
    status: "published",
  },
  {
    id: "REV-00980",
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
    rating: 4,
    comment: "Boa viagem. O motorista foi profissional.",
    categories: ["Profissional"],
    createdAt: "Há 21 min",
    status: "published",
  },
  {
    id: "REV-00979",
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
    rating: 2,
    comment: "O motorista demorou bastante para chegar ao ponto de recolha.",
    categories: ["Atraso"],
    createdAt: "Há 32 min",
    status: "published",
  },
  {
    id: "REV-00978",
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
    rating: 5,
    comment: "Excelente motorista. Muito cuidadoso na condução.",
    categories: ["Seguro", "Educado"],
    createdAt: "Há 45 min",
    status: "published",
  },
  {
    id: "REV-00977",
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
    rating: 3,
    comment: "A viagem foi normal, mas o carro poderia estar mais limpo.",
    categories: ["Limpeza"],
    createdAt: "Há 1h",
    status: "pending",
  },
  {
    id: "REV-00976",
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
    rating: 5,
    comment: "Muito bom serviço. Recomendo.",
    categories: ["Serviço"],
    createdAt: "Há 1h",
    status: "published",
  },
  {
    id: "REV-00975",
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
    rating: 1,
    comment: "O motorista foi bastante rude durante a viagem.",
    categories: ["Comportamento"],
    createdAt: "Há 2h",
    status: "pending",
  },
  {
    id: "REV-00974",
    passenger: {
      name: "Daniel José",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    driver: {
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=59",
      vehicle: "Toyota Yaris",
      plate: "LD-44-22-OP",
    },
    bookingId: "BK-10284",
    rating: 4,
    comment: "Tudo correu bem.",
    categories: ["Serviço"],
    createdAt: "Há 3h",
    status: "published",
  },
];

const complaints: Complaint[] = [
  {
    id: "CMP-00481",
    passenger: {
      name: "Bruno António",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    driver: {
      name: "Pedro António",
      avatar: "https://i.pravatar.cc/150?img=68",
      vehicle: "Hyundai i10",
      plate: "LD-67-88-MN",
    },
    bookingId: "BK-10285",
    subject: "Comportamento inadequado",
    description:
      "O passageiro informou que o motorista teve uma atitude agressiva durante a viagem.",
    category: "Comportamento",
    priority: "high",
    status: "investigating",
    createdAt: "Há 18 min",
  },
  {
    id: "CMP-00480",
    passenger: {
      name: "Ana Maria",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    driver: {
      name: "Mário Francisco",
      avatar: "https://i.pravatar.cc/150?img=57",
      vehicle: "Toyota Vitz",
      plate: "LD-78-11-EF",
    },
    bookingId: "BK-10289",
    subject: "Cobrança incorreta",
    description:
      "O passageiro informou que foi cobrado um valor superior ao apresentado na aplicação.",
    category: "Pagamento",
    priority: "high",
    status: "open",
    createdAt: "Há 42 min",
  },
  {
    id: "CMP-00479",
    passenger: {
      name: "Maria José",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
    driver: {
      name: "Carlos António",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookingId: "BK-10291",
    subject: "Viatura em más condições",
    description:
      "O passageiro reclamou do estado de conservação e limpeza da viatura.",
    category: "Viatura",
    priority: "medium",
    status: "resolved",
    createdAt: "Há 1h",
  },
  {
    id: "CMP-00478",
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
    subject: "Percurso incorreto",
    description:
      "O motorista seguiu um percurso diferente do esperado pelo passageiro.",
    category: "Viagem",
    priority: "medium",
    status: "investigating",
    createdAt: "Há 2h",
  },
  {
    id: "CMP-00477",
    passenger: {
      name: "Elisa Maria",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    driver: {
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=59",
      vehicle: "Toyota Yaris",
      plate: "LD-44-22-OP",
    },
    bookingId: "BK-10284",
    subject: "Objeto esquecido",
    description:
      "Passageiro informou que deixou um objeto pessoal dentro da viatura.",
    category: "Objeto perdido",
    priority: "low",
    status: "resolved",
    createdAt: "Há 4h",
  },
];

const reviewStatusConfig = {
  published: {
    label: "Publicada",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
  pending: {
    label: "Pendente",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },
  hidden: {
    label: "Oculta",
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500",
  },
};

const complaintStatusConfig = {
  open: {
    label: "Aberta",
    className: "border-red-500/20 bg-red-500/10 text-red-500",
  },
  investigating: {
    label: "Em análise",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },
  resolved: {
    label: "Resolvida",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
  rejected: {
    label: "Rejeitada",
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500",
  },
};

const priorityConfig = {
  low: {
    label: "Baixa",
    className: "text-zinc-500",
  },
  medium: {
    label: "Média",
    className: "text-orange-500",
  },
  high: {
    label: "Alta",
    className: "text-red-500",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <HugeiconsIcon
          key={index}
          icon={StarIcon}
          size={13}
          strokeWidth={1.8}
          className={
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
};

export default function FeedbacksPage() {
  const [tab, setTab] = React.useState<Tab>("reviews");

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [rating, setRating] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const pageSize = 8;

  const filteredReviews = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return reviews.filter((review) => {
      const matchesSearch =
        !query ||
        review.id.toLowerCase().includes(query) ||
        review.passenger.name.toLowerCase().includes(query) ||
        review.driver.name.toLowerCase().includes(query) ||
        review.driver.plate.toLowerCase().includes(query) ||
        review.comment.toLowerCase().includes(query);

      const matchesStatus = status === "all" || review.status === status;

      const matchesRating =
        rating === "all" || review.rating === Number(rating);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [search, status, rating]);

  const filteredComplaints = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !query ||
        complaint.id.toLowerCase().includes(query) ||
        complaint.passenger.name.toLowerCase().includes(query) ||
        complaint.driver.name.toLowerCase().includes(query) ||
        complaint.driver.plate.toLowerCase().includes(query) ||
        complaint.subject.toLowerCase().includes(query) ||
        complaint.description.toLowerCase().includes(query);

      const matchesStatus = status === "all" || complaint.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const currentItems = tab === "reviews" ? filteredReviews : filteredComplaints;

  const lastPage = Math.max(1, Math.ceil(currentItems.length / pageSize));

  const paginatedItems = currentItems.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  React.useEffect(() => {
    setPage(1);
  }, [tab, search, status, rating]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
              <HugeiconsIcon
                icon={Message01Icon}
                size={19}
                strokeWidth={1.8}
                className="text-secondary"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Feedbacks
              </h1>

              <p className="text-sm text-muted-foreground">
                Avaliações, opiniões e reclamações dos passageiros.
              </p>
            </div>
          </div>
        </div>

        <ExportCommand
          title={tab === "reviews" ? "Avaliações" : "Reclamações"}
          onExport={async () => {
            await new Promise((resolve) => setTimeout(resolve, 800));
          }}
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          variant="info"
          label="Avaliações recebidas"
          value="3.842"
          delta="+14,2%"
          description="vs. semana passada"
          icon={StarIcon}
          trend={[2840, 3010, 3170, 3280, 3440, 3620, 3842]}
        />

        <StatsCard
          variant="success"
          label="Avaliação média"
          value="4,72"
          delta="+3,1%"
          description="últimos 30 dias"
          icon={StarIcon}
          trend={[4.41, 4.48, 4.52, 4.58, 4.61, 4.68, 4.72]}
        />

        <StatsCard
          variant="warning"
          label="Reclamações abertas"
          value="28"
          delta="-12,5%"
          description="vs. semana passada"
          icon={Alert02Icon}
          trend={[43, 39, 37, 35, 32, 31, 28]}
        />

        <StatsCard
          variant="success"
          label="Reclamações resolvidas"
          value="94,2%"
          delta="+2,8%"
          description="taxa de resolução"
          icon={CheckmarkCircle02Icon}
          trend={[87, 88, 90, 90, 91, 93, 94.2]}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-border/60">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setTab("reviews")}
            className={[
              "relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors",
              tab === "reviews"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <HugeiconsIcon icon={StarIcon} size={16} strokeWidth={1.8} />
            Avaliações
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
              {reviews.length}
            </span>
            {tab === "reviews" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab("complaints")}
            className={[
              "relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors",
              tab === "complaints"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <HugeiconsIcon icon={Alert02Icon} size={16} strokeWidth={1.8} />
            Reclamações
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-500">
              {
                complaints.filter(
                  (item) =>
                    item.status === "open" || item.status === "investigating",
                ).length
              }
            </span>
            {tab === "complaints" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              tab === "reviews"
                ? "Pesquisar avaliação, passageiro ou motorista..."
                : "Pesquisar reclamação, passageiro ou motorista..."
            }
            className="h-10 rounded-xl border-border/60 bg-background pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tab === "reviews" && (
            <Select
              value={rating}
              onValueChange={(value) => setRating(value ?? "all")}
            >
              <SelectTrigger className="h-10 w-[135px] rounded-xl">
                <SelectValue placeholder="Avaliação" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todas as notas</SelectItem>
                <SelectItem value="5">5 estrelas</SelectItem>
                <SelectItem value="4">4 estrelas</SelectItem>
                <SelectItem value="3">3 estrelas</SelectItem>
                <SelectItem value="2">2 estrelas</SelectItem>
                <SelectItem value="1">1 estrela</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select
            value={status}
            onValueChange={(value) => setStatus(value ?? "all")}
          >
            <SelectTrigger className="h-10 w-[150px] rounded-xl">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>

              {tab === "reviews" ? (
                <>
                  <SelectItem value="published">Publicadas</SelectItem>

                  <SelectItem value="pending">Pendentes</SelectItem>

                  <SelectItem value="hidden">Ocultas</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="open">Abertas</SelectItem>

                  <SelectItem value="investigating">Em análise</SelectItem>

                  <SelectItem value="resolved">Resolvidas</SelectItem>

                  <SelectItem value="rejected">Rejeitadas</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews */}
      {tab === "reviews" && (
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-700 hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/30">
                  <TableHead className="pl-5">Avaliação</TableHead>

                  <TableHead>Passageiro</TableHead>

                  <TableHead>Motorista</TableHead>

                  <TableHead>Nota</TableHead>

                  <TableHead>Comentário</TableHead>

                  <TableHead>Estado</TableHead>

                  <TableHead>Data</TableHead>

                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedItems.map((item) => {
                  const review = item as Review;
                  const config = reviewStatusConfig[review.status];

                  return (
                    <TableRow
                      key={review.id}
                      className="group border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="py-4 pl-5">
                        <div>
                          <p className="text-xs font-semibold">{review.id}</p>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {review.bookingId}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Person
                          name={review.passenger.name}
                          avatar={review.passenger.avatar}
                          role="Passageiro"
                        />
                      </TableCell>

                      <TableCell>
                        <Person
                          name={review.driver.name}
                          avatar={review.driver.avatar}
                          role={review.driver.plate}
                        />
                      </TableCell>

                      <TableCell>
                        <Stars rating={review.rating} />
                      </TableCell>

                      <TableCell className="max-w-[280px]">
                        <p className="truncate text-xs text-muted-foreground">
                          {review.comment}
                        </p>

                        <div className="mt-1 flex gap-1">
                          {review.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full bg-muted px-2 py-0.5 text-[9px]"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </TableCell>

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

                      <TableCell>
                        <span className="text-[11px] text-muted-foreground">
                          {review.createdAt}
                        </span>
                      </TableCell>

                      <Actions />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {paginatedItems.length === 0 && (
            <EmptyState
              icon={StarIcon}
              title="Nenhuma avaliação encontrada"
              description="Tente alterar os filtros ou a pesquisa."
            />
          )}

          <Pagination
            page={page}
            lastPage={lastPage}
            totalItems={currentItems.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Complaints */}
      {tab === "complaints" && (
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-700 hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/30">
                  <TableHead className="pl-5">Reclamação</TableHead>

                  <TableHead>Passageiro</TableHead>

                  <TableHead>Motorista</TableHead>

                  <TableHead>Assunto</TableHead>

                  <TableHead>Prioridade</TableHead>

                  <TableHead>Estado</TableHead>

                  <TableHead>Data</TableHead>

                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedItems.map((item) => {
                  const complaint = item as Complaint;

                  const statusConfig = complaintStatusConfig[complaint.status];

                  const priority = priorityConfig[complaint.priority];

                  return (
                    <TableRow
                      key={complaint.id}
                      className="group border-border/50 transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="py-4 pl-5">
                        <div>
                          <p className="text-xs font-semibold">
                            {complaint.id}
                          </p>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {complaint.bookingId}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Person
                          name={complaint.passenger.name}
                          avatar={complaint.passenger.avatar}
                          role="Passageiro"
                        />
                      </TableCell>

                      <TableCell>
                        <Person
                          name={complaint.driver.name}
                          avatar={complaint.driver.avatar}
                          role={complaint.driver.plate}
                        />
                      </TableCell>

                      <TableCell className="max-w-[240px]">
                        <p className="text-xs font-medium">
                          {complaint.subject}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-muted-foreground">
                          {complaint.description}
                        </p>

                        <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[9px]">
                          {complaint.category}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span
                          className={`text-[11px] font-medium ${priority.className}`}
                        >
                          {priority.label}
                        </span>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-medium",
                            statusConfig.className,
                          ].join(" ")}
                        >
                          <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                          {statusConfig.label}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className="text-[11px] text-muted-foreground">
                          {complaint.createdAt}
                        </span>
                      </TableCell>

                      <Actions complaint />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {paginatedItems.length === 0 && (
            <EmptyState
              icon={Alert02Icon}
              title="Nenhuma reclamação encontrada"
              description="Tente alterar os filtros ou a pesquisa."
            />
          )}

          <Pagination
            page={page}
            lastPage={lastPage}
            totalItems={currentItems.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function Person({
  name,
  avatar,
  role,
}: {
  name: string;
  avatar?: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-8 border border-border/60">
        <AvatarImage src={avatar} alt={name} />

        <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
          {initials(name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-xs font-medium">{name}</p>

        <p className="text-[10px] text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

function Actions({ complaint = false }: { complaint?: boolean }) {
  return (
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

        <DropdownMenuContent align="end" className="w-48 rounded-xl">
          <DropdownMenuItem className="gap-2">
            <HugeiconsIcon icon={EyeIcon} size={15} />
            Ver detalhes
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <HugeiconsIcon icon={UserMultiple02Icon} size={15} />
            Ver passageiro
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <HugeiconsIcon icon={Car01Icon} size={15} />
            Ver motorista
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <HugeiconsIcon icon={Ticket01Icon} size={15} />
            Ver corrida
          </DropdownMenuItem>

          {complaint && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} />
                Marcar como resolvida
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-40 flex-col items-center justify-center">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
        <HugeiconsIcon
          icon={icon}
          size={18}
          className="text-muted-foreground"
        />
      </div>

      <p className="mt-3 text-sm font-medium">{title}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
