"use client";

import ProgressMetricCard, { type SeriesPoint } from "@/components/Kpi";
import TaxiActivityChart from "@/components/TaxiActivityChart";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
const rides: SeriesPoint[] = [
  { value: 322, date: "10 Ago" },
  { value: 120, date: "11 Ago" },
  { value: 145, date: "12 Ago" },
  { value: 32, date: "13 Ago" },
  { value: 180, date: "14 Ago" },
  { value: 265, date: "15 Ago" },
  { value: 210, date: "16 Ago" },
  { value: 245, date: "17 Ago" },
];

const drivers: SeriesPoint[] = [
  { value: 42, date: "11 Ago" },
  { value: 48, date: "12 Ago" },
  { value: 45, date: "13 Ago" },
  { value: 53, date: "14 Ago" },
  { value: 58, date: "15 Ago" },
  { value: 62, date: "16 Ago" },
  { value: 67, date: "17 Ago" },
];

const passengers: SeriesPoint[] = [
  { value: 310, date: "11 Ago" },
  { value: 345, date: "12 Ago" },
  { value: 328, date: "13 Ago" },
  { value: 390, date: "14 Ago" },
  { value: 420, date: "15 Ago" },
  { value: 465, date: "16 Ago" },
  { value: 510, date: "17 Ago" },
];

const revenue: SeriesPoint[] = [
  { value: 185000, date: "11 Ago" },
  { value: 220000, date: "12 Ago" },
  { value: 205000, date: "13 Ago" },
  { value: 280000, date: "14 Ago" },
  { value: 265000, date: "15 Ago" },
  { value: 340000, date: "16 Ago" },
  { value: 390000, date: "17 Ago" },
];

const documents: SeriesPoint[] = [
  { value: 128, date: "11 Ago" },
  { value: 142, date: "12 Ago" },
  { value: 136, date: "13 Ago" },
  { value: 158, date: "14 Ago" },
  { value: 171, date: "15 Ago" },
  { value: 185, date: "16 Ago" },
  { value: 194, date: "17 Ago" },
];

const vehicles: SeriesPoint[] = [
  { value: 76, date: "11 Ago" },
  { value: 81, date: "12 Ago" },
  { value: 79, date: "13 Ago" },
  { value: 86, date: "14 Ago" },
  { value: 91, date: "15 Ago" },
  { value: 95, date: "16 Ago" },
  { value: 102, date: "17 Ago" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="space-y-10">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            <ProgressMetricCard
              title="Viagens"
              unit="corridas"
              data={rides}
              accent="emerald"
              size="sm"
            />

            <ProgressMetricCard
              title="Motoristas"
              unit="motoristas"
              data={drivers}
              accent="emerald"
              size="sm"
            />

            <ProgressMetricCard
              title="Passageiros"
              unit="passageiros"
              data={passengers}
              accent="emerald"
              size="sm"
            />

            <ProgressMetricCard
              title="Receita"
              unit="Kz"
              data={revenue}
              accent="emerald"
              size="sm"
            />

            <ProgressMetricCard
              title="Documentos"
              unit="documentos"
              data={documents}
              accent="emerald"
              size="sm"
            />

            <ProgressMetricCard
              title="Veículos"
              unit="veículos"
              data={vehicles}
              accent="emerald"
              size="sm"
            />
          </div>

          <span className="flex gap-2">
            <span className="flex-1">
              <TaxiActivityChart startYear={2023} />
            </span>
            <aside className="hidden w-200  lg:block">
              <div className="relative flex h-full  flex-col justify-between overflow-hidden rounded-lg border  p-4 backdrop-blur-xl">
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl border">
                    <Image src={logo} alt="logo" />
                  </div>

                  <h3 className="max-w-[230px] text-xl font-semibold ">
                    MandaVir
                  </h3>

                  <p className="mt-3 max-w-[250px] text-sm leading-relaxed text-muted-foreground">
                    Consulte as atividades da plataforma, acompanhe as viagens e
                    mantenha a operação sob controlo a partir deste painel.
                  </p>
                </div>

                <div className="relative z-10 space-y-3  border-t border-border/40 pt-4">
                  <Button size={"lg"} className={"w-full h-10"}>
                    <HugeiconsIcon
                      icon={Download01Icon}
                      size={15}
                      strokeWidth={1.75}
                    />
                    Exportar relatório
                  </Button>
                  <Button
                    size={"lg"}
                    variant={"outline"}
                    className={"w-full h-10"}
                  >
                    Ver rotas
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={14}
                      strokeWidth={1.75}
                      className="text-muted-foreground"
                    />
                  </Button>
                </div>
              </div>
            </aside>
          </span>
        </>
      )}
    </div>
  );
}
