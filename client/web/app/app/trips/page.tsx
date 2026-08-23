"use client";

import * as React from "react";

import { Route01Icon } from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";

import dynamic from "next/dynamic";

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

export default function TripsPage() {
  const TripsMap = dynamic(() => import("@/components/TripsMap"), {
    ssr: false,
    loading: () => (
      <div className="flex h-[680px] items-center justify-center rounded-2xl border border-border/60 bg-[#08090b] text-sm text-white/40">
        A carregar mapa...
      </div>
    ),
  });

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

      <TripsMap trips={Mocktrips} />
    </section>
  );
}
