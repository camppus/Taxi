"use client";

import * as React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  Route01Icon,
  Navigation03Icon,
  UserMultiple02Icon,
  Wallet01Icon,
  Car01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  EyeIcon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export interface TripLocation {
  name: string;
  lat: number;
  lng: number;
}

export type TripStatus = "active" | "waiting" | "completed" | "cancelled";

export interface TripBooking {
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

  routeGeometry?: [number, number][];

  departureAt: string;
  createdAt: string;
}

export interface TripsMapProps {
  trips: Trip[];
}

const statusConfig: Record<
  TripStatus,
  {
    label: string;
    color: string;
  }
> = {
  active: {
    label: "Em andamento",
    color: "#22c55e",
  },

  waiting: {
    label: "A aguardar",
    color: "#f59e0b",
  },

  completed: {
    label: "Concluída",
    color: "#3b82f6",
  },

  cancelled: {
    label: "Cancelada",
    color: "#ef4444",
  },
};

const formatCurrency = (value: number) => `${value.toLocaleString("pt-AO")} Kz`;

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

/**
 * Não inventamos uma rota curva.
 *
 * Se o backend não mandar routeGeometry,
 * mostramos apenas origem -> destino.
 *
 * Quando integrares OSRM / GraphHopper / Google Routes,
 * basta enviar a geometria real.
 */
function getRouteGeometry(trip: Trip): [number, number][] {
  if (trip.routeGeometry && trip.routeGeometry.length >= 2) {
    return trip.routeGeometry;
  }

  return [
    [trip.from.lat, trip.from.lng],
    [trip.to.lat, trip.to.lng],
  ];
}

/**
 * Marker minimalista.
 */
function createTripMarker(
  status: TripStatus,
  type: "from" | "to",
  selected: boolean,
) {
  const color = statusConfig[status].color;

  const size = selected ? 30 : type === "from" ? 22 : 18;

  return L.divIcon({
    className: "trip-marker",
    html: `
      <div
        style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border-radius: 999px;
          background: ${color};
          border: 2px solid rgba(255,255,255,.95);
          box-shadow: 0 0 ${selected ? 20 : 10}px ${color}66;
          display:flex;
          align-items:center;
          justify-content:center;
        "
      >
        <div
          style="
            width:${selected ? 8 : 6}px;
            height:${selected ? 8 : 6}px;
            border-radius:999px;
            background:white;
          "
        ></div>

        ${
          status === "active" && type === "from"
            ? `
              <div
                style="
                  position:absolute;
                  inset:-6px;
                  border-radius:999px;
                  border:1px solid ${color}55;
                  animation:trip-pulse 2s infinite;
                "
              ></div>
            `
            : ""
        }
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/**
 * Faz o mapa enquadrar as corridas.
 */
function MapBounds({
  trips,
  selectedTrip,
}: {
  trips: Trip[];
  selectedTrip: Trip | null;
}) {
  const map = useMap();

  React.useEffect(() => {
    if (!trips.length) return;

    const sourceTrips = selectedTrip ? [selectedTrip] : trips;

    const points: [number, number][] = [];

    sourceTrips.forEach((trip) => {
      points.push([trip.from.lat, trip.from.lng], [trip.to.lat, trip.to.lng]);
    });

    if (!points.length) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [90, 90],
      maxZoom: selectedTrip ? 14 : 12,
      animate: true,
    });
  }, [map, trips, selectedTrip]);

  return null;
}

export default function TripsMap({ trips }: TripsMapProps) {
  const [selectedTripId, setSelectedTripId] = React.useState<string | null>(
    null,
  );

  const mapTrips = React.useMemo(() => {
    return trips.slice(0, 30);
  }, [trips]);

  const selectedTrip = React.useMemo(() => {
    if (!selectedTripId) return null;

    return mapTrips.find((trip) => trip.id === selectedTripId) ?? null;
  }, [mapTrips, selectedTripId]);

  const activeTrips = mapTrips.filter((trip) => trip.status === "active");

  const totalBookings = mapTrips.reduce(
    (total, trip) => total + trip.bookings.length,
    0,
  );

  return (
    <div className="relative h-[680px] overflow-hidden rounded-2xl border border-border/60 bg-[#08090b]">
      <MapContainer
        center={[-8.8383, 13.2344]}
        zoom={11}
        zoomControl={false}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapBounds trips={mapTrips} selectedTrip={selectedTrip} />

        {mapTrips.map((trip) => {
          const geometry = getRouteGeometry(trip);

          const color = statusConfig[trip.status].color;

          const isSelected = selectedTripId === trip.id;

          /**
           * Corrida selecionada:
           * muito mais evidente.
           *
           * Restantes:
           * tracejadas e discretas.
           */
          const weight = isSelected ? 5 : trip.status === "active" ? 3 : 2;

          const opacity = isSelected
            ? 0.95
            : trip.status === "active"
              ? 0.65
              : 0.28;

          return (
            <React.Fragment key={trip.id}>
              {/* Linha exterior discreta da rota selecionada */}
              {isSelected && (
                <Polyline
                  positions={geometry}
                  pathOptions={{
                    color,
                    weight: 11,
                    opacity: 0.08,
                    lineCap: "round",
                    lineJoin: "round",
                  }}
                />
              )}

              {/* Rota */}
              <Polyline
                positions={geometry}
                pathOptions={{
                  color,
                  weight,
                  opacity,

                  /**
                   * A ideia visual da imagem:
                   * rotas secundárias tracejadas.
                   */
                  dashArray: isSelected ? undefined : "2 9",

                  lineCap: "round",
                  lineJoin: "round",
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedTripId(trip.id);
                  },
                }}
              />

              {/* Origem */}
              <Marker
                position={[trip.from.lat, trip.from.lng]}
                icon={createTripMarker(trip.status, "from", isSelected)}
                eventHandlers={{
                  click: () => {
                    setSelectedTripId(trip.id);
                  },
                }}
              >
                <Popup closeButton={false} className="trip-popup">
                  <TripPopup trip={trip} />
                </Popup>
              </Marker>

              {/* Destino */}
              <Marker
                position={[trip.to.lat, trip.to.lng]}
                icon={createTripMarker(trip.status, "to", isSelected)}
                eventHandlers={{
                  click: () => {
                    setSelectedTripId(trip.id);
                  },
                }}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* HEADER */}

      <div className="pointer-events-none absolute left-4 top-4 z-[1000]">
        <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/65 px-4 py-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
              <HugeiconsIcon
                icon={Route01Icon}
                size={18}
                className="text-secondary"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Mapa de corridas
              </p>

              <p className="text-[10px] text-white/40">
                {mapTrips.length} rotas em visualização
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="absolute right-4 top-4 z-[1000] flex gap-2">
        <MapStat value={activeTrips.length} label="ativas" active />

        <MapStat value={totalBookings} label="reservas" />
      </div>

      {/* LEGENDA */}

      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="rounded-xl border border-white/10 bg-black/65 px-3 py-2.5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Legend color="#22c55e" label="Em andamento" />

            <Legend color="#f59e0b" label="A aguardar" />

            <Legend color="#3b82f6" label="Concluída" />

            <Legend color="#ef4444" label="Cancelada" />
          </div>
        </div>
      </div>

      {/* SELECTED TRIP */}

      {selectedTrip && (
        <div className="absolute bottom-4 right-4 z-[1000] hidden w-[320px] lg:block">
          <SelectedTripCard trip={selectedTrip} />
        </div>
      )}

      <style jsx global>{`
        .leaflet-container {
          background: #08090b;
          font-family: inherit;
        }

        .leaflet-control-attribution {
          background: rgba(0, 0, 0, 0.5) !important;
          color: rgba(255, 255, 255, 0.3) !important;
          font-size: 8px;
        }

        .leaflet-control-attribution a {
          color: rgba(255, 255, 255, 0.4) !important;
        }

        .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
          border-radius: 16px;
          background: #101114;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .leaflet-popup-content {
          margin: 0;
          width: 300px !important;
        }

        .leaflet-popup-tip {
          background: #101114;
        }

        .leaflet-popup-close-button {
          color: rgba(255, 255, 255, 0.6) !important;
          z-index: 20;
        }

        .trip-marker {
          background: transparent !important;
          border: 0 !important;
        }

        @keyframes trip-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }

          70% {
            transform: scale(1.35);
            opacity: 0;
          }

          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI */
/* -------------------------------------------------------------------------- */

function MapStat({
  value,
  label,
  active = false,
}: {
  value: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/65 px-3 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        {active && (
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
        )}

        <div>
          <p className="text-xs font-semibold text-white">{value}</p>

          <p className="text-[9px] text-white/40">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="size-1.5 rounded-full"
        style={{
          background: color,
        }}
      />

      <span className="text-[9px] text-white/55">{label}</span>
    </div>
  );
}

function TripPopup({ trip }: { trip: Trip }) {
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
    <div className="w-full">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs font-semibold">{trip.id}</p>

            <p className="mt-0.5 text-[9px] text-white/40">{trip.createdAt}</p>
          </div>

          <span
            className="rounded-full border px-2 py-1 text-[9px]"
            style={{
              color: config.color,
              borderColor: `${config.color}33`,
              background: `${config.color}12`,
            }}
          >
            {config.label}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-4 py-3">
        <RoutePoint color="#22c55e" label="Origem" location={trip.from} />

        <div className="ml-[3px] h-2 border-l border-dashed border-white/10" />

        <RoutePoint color="#ef4444" label="Destino" location={trip.to} />

        <div className="rounded-xl bg-white/[0.04] p-2.5">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-secondary/10 text-[9px] font-semibold text-secondary">
              {initials(trip.driver.name)}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium">
                {trip.driver.name}
              </p>

              <p className="truncate text-[9px] text-white/40">
                {trip.driver.vehicle} · {trip.driver.plate}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-dashed border-white/10 py-2.5">
          <Metric
            icon={UserMultiple02Icon}
            value={trip.bookings.length}
            label="reservas"
          />

          <Metric icon={Car01Icon} value={totalSeats} label="lugares" />

          <Metric
            icon={Wallet01Icon}
            value={formatCurrency(totalAmount)}
            label="total"
          />
        </div>

        <Button size="sm" className="h-8 w-full rounded-lg text-[10px]">
          <HugeiconsIcon
            icon={trip.status === "active" ? Navigation03Icon : EyeIcon}
            size={13}
          />

          {trip.status === "active" ? "Acompanhar corrida" : "Ver corrida"}
        </Button>
      </div>
    </div>
  );
}

function RoutePoint({
  color,
  label,
  location,
}: {
  color: string;
  label: string;
  location: TripLocation;
}) {
  return (
    <div className="flex gap-2.5">
      <span
        className="mt-1.5 size-2 shrink-0 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 0 4px ${color}18`,
        }}
      />

      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wide text-white/40">
          {label}
        </p>

        <p className="truncate text-xs font-medium">{location.name}</p>

        <p className="font-mono text-[8px] text-white/35">
          {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </p>
      </div>
    </div>
  );
}

function SelectedTripCard({ trip }: { trip: Trip }) {
  const config = statusConfig[trip.status];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/75 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-dashed border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="flex size-8 items-center justify-center rounded-lg"
            style={{
              background: `${config.color}15`,
              color: config.color,
            }}
          >
            <HugeiconsIcon icon={Route01Icon} size={15} />
          </div>

          <div>
            <p className="font-mono text-xs font-semibold text-white">
              {trip.id}
            </p>

            <p className="text-[9px] text-white/40">{trip.createdAt}</p>
          </div>
        </div>

        <span
          className="size-2 rounded-full"
          style={{
            background: config.color,
            boxShadow: `0 0 12px ${config.color}`,
          }}
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10">
            <HugeiconsIcon
              icon={Navigation03Icon}
              size={14}
              className="text-emerald-500"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] text-white/40">Origem</p>

            <p className="truncate text-[11px] font-medium text-white">
              {trip.from.name}
            </p>
          </div>

          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={14}
            className="ml-auto shrink-0 text-white/20"
          />

          <div className="min-w-0 text-right">
            <p className="text-[9px] text-white/40">Destino</p>

            <p className="truncate text-[11px] font-medium text-white">
              {trip.to.name}
            </p>
          </div>

          <div className="flex size-7 items-center justify-center rounded-lg bg-red-500/10">
            <span className="size-1.5 rounded-full bg-red-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-2.5">
            <div className="flex items-center gap-1.5 text-white/40">
              <HugeiconsIcon icon={UserMultiple02Icon} size={12} />

              <span className="text-[9px]">Reservas</span>
            </div>

            <p className="mt-1 text-sm font-semibold text-white">
              {trip.bookings.length}
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-2.5">
            <div className="flex items-center gap-1.5 text-white/40">
              <HugeiconsIcon icon={Clock01Icon} size={12} />

              <span className="text-[9px]">Partida</span>
            </div>

            <p className="mt-1 truncate text-[11px] font-semibold text-white">
              {trip.departureAt}
            </p>
          </div>
        </div>

        <Button size="sm" className="h-8 w-full rounded-lg text-[10px]">
          <HugeiconsIcon icon={Navigation03Icon} size={13} />
          Acompanhar corrida
        </Button>
      </div>
    </div>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: any;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-2">
      <HugeiconsIcon icon={icon} size={12} className="text-white/30" />

      <p className="text-[10px] font-semibold text-white">{value}</p>

      <p className="text-[8px] text-white/35">{label}</p>
    </div>
  );
}
