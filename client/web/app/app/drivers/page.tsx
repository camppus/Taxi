"use client";

import { DriverCard } from "@/components/DriverCard";
import ProgressMetricCard, { SeriesPoint } from "@/components/Kpi";
import Loader from "@/components/Loader";
import TaxiActivityChart from "@/components/TaxiActivityChart";
import { mockDrivers } from "@/mocks/drivers";
import { DriverStatus } from "@/types/Driver";
import { useEffect, useState } from "react";
import {
  Car01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  UserMultiple02Icon,
  UserCheck01Icon,
  UserAdd01Icon,
  FilterHorizontalIcon,
  Refresh01Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Drivers() {
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState(mockDrivers);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <article className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
            <StatsCard
              variant="info"
              label="Total de motoristas"
              value="1.284"
              delta="+12,4%"
              description="vs. semana passada"
              icon={UserMultiple02Icon}
              trend={[980, 1010, 1045, 1080, 1140, 1205, 1284]}
            />

            <StatsCard
              variant="success"
              label="Motoristas ativos"
              value="1.087"
              delta="+8,7%"
              description="vs. semana passada"
              icon={UserCheck01Icon}
              trend={[860, 890, 915, 940, 975, 1020, 1087]}
            />

            <StatsCard
              variant="success"
              label="Novos motoristas"
              value="142"
              delta="+18,3%"
              description="esta semana"
              icon={UserAdd01Icon}
              trend={[82, 95, 88, 104, 110, 125, 142]}
            />

            <StatsCard
              variant="warning"
              label="Aprovações pendentes"
              value="47"
              delta="-14,5%"
              description="vs. semana passada"
              icon={Clock01Icon}
              trend={[72, 68, 65, 61, 58, 52, 47]}
            />

            <StatsCard
              variant="success"
              label="Motoristas aprovados"
              value="1.156"
              delta="+10,2%"
              description="vs. semana passada"
              icon={CheckmarkCircle02Icon}
              trend={[920, 955, 980, 1015, 1060, 1110, 1156]}
            />

            <StatsCard
              variant="info"
              label="Veículos associados"
              value="1.042"
              delta="+7,8%"
              description="vs. semana passada"
              icon={Car01Icon}
              trend={[810, 835, 860, 890, 925, 980, 1042]}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Motoristas
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Gerencie motoristas, aprovações, documentos e atividade da
                  plataforma.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="lg">
                  <HugeiconsIcon
                    icon={Download01Icon}
                    size={15}
                    strokeWidth={1.8}
                  />
                  Exportar
                </Button>

                <Button size="lg">
                  <HugeiconsIcon
                    icon={UserAdd01Icon}
                    size={15}
                    strokeWidth={1.8}
                  />
                  Novo motorista
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-white/3 bg-card/30  p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Select>
                  <SelectTrigger className=" w-40">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="blocked">Bloqueados</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Verificação" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="approved">Aprovados</SelectItem>
                    <SelectItem value="pending">Em análise</SelectItem>
                    <SelectItem value="rejected">Rejeitados</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  className="h-9 text-muted-foreground"
                  size={"lg"}
                >
                  Limpar filtros
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <HugeiconsIcon
                    icon={FilterHorizontalIcon}
                    size={15}
                    strokeWidth={1.8}
                  />
                  Mais filtros
                </Button>

                <Button variant="outline" size="sm" className="h-9">
                  <HugeiconsIcon
                    icon={Refresh01Icon}
                    size={15}
                    strokeWidth={1.8}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-4">
            {drivers.map((item) => (
              <DriverCard
                key={item.id}
                name={item.user.fullName}
                role={`Motorista ${item.requestStatus.toLocaleLowerCase()}`}
                avatar={item.user.photoUrl ?? undefined}
                cover="/images/driver-cover.jpg"
                rating={item.user.receivedRatings?.length.toString() ?? "0"}
                earned="12/hr"
                rate="35"
                online={item.status == DriverStatus.OFFLINE}
              />
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
