import { Vehicle, VehicleStatus } from "@/types/Vehicle";

export const VEHICLE_STATUS_LABEL: Record<VehicleStatus, string> = {
  ACTIVE: "Ativo",
  PENDING_VERIFICATION: "Em verificação",
  INACTIVE: "Inativo",
  SUSPENDED: "Suspenso",
};

export const VEHICLE_STATUS_COLOR: Record<VehicleStatus, string> = {
  ACTIVE: "#16A34A",
  PENDING_VERIFICATION: "#D97706",
  INACTIVE: "#6B7280",
  SUSPENDED: "#DC2626",
};

const THIRTY_DAYS_MS = 1000 * 60 * 60 * 24 * 30;

/** true se algum documento do veículo expira dentro de 30 dias (ou já expirou) */
export function hasExpiringDocument(vehicle: Vehicle): boolean {
  const now = Date.now();
  return Object.values(vehicle.document).some((doc) => {
    if (!doc.expiresAt) return false;
    const expiresAt = new Date(doc.expiresAt).getTime();
    return expiresAt - now <= THIRTY_DAYS_MS;
  });
}


import {
  FuelType,
  Transmission,
  VehicleDocumentTypeDto,
} from "@/types/Vehicle";

export const FUEL_TYPE_LABEL: Record<FuelType, string> = {
  PETROL: "Gasolina",
  DIESEL: "Diesel",
  HYBRID: "Híbrido",
  ELECTRIC: "Elétrico",
};

export const TRANSMISSION_LABEL: Record<Transmission, string> = {
  AUTOMATIC: "Automática",
  MANUAL: "Manual",
};

export const DOCUMENT_TYPE_LABEL: Record<VehicleDocumentTypeDto, string> = {
  [VehicleDocumentTypeDto.REGISTRATION]: "Registo / Livrete",
  [VehicleDocumentTypeDto.INSURANCE]: "Seguro",
  [VehicleDocumentTypeDto.INSPECTION]: "Inspeção",
  [VehicleDocumentTypeDto.PHOTO]: "Foto do veículo",
};

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function isDocumentExpiringSoon(expiresAt?: Date): boolean {
  if (!expiresAt) return false;
  const days =
    (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return days <= 30;
}

export function isDocumentExpired(expiresAt?: Date): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}
