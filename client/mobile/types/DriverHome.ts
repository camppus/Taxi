export interface DriverStats {
  tripsCompleted: number;
  rating: number; // 0-5
  earningsThisWeek: number; // em Kz, sem formatação
  acceptanceRate: number; // 0-100
}

export interface DriverHomeProfile {
  id: string;
  fullName: string;
  photoUrl?: string;
  // true quando docs (BI, carta, selfie etc.) já foram aprovados
  isVerified: boolean;
  // true quando já enviou mas está em análise
  verificationPending: boolean;
  hasVehicleRegistered: boolean;
  stats: DriverStats;
}

export interface RecentTripSummary {
  id: string;
  originName: string;
  destinationName: string;
  date: Date;
  status: "completed" | "cancelled" | "scheduled";
  price: number;
}
