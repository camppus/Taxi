export interface DriverStats {
  tripsCompleted: number;
  rating: number;
  earningsThisWeek: number;
  acceptanceRate: number;
}

export interface DriverHomeProfile {
  id: string;
  fullName: string;
  photoUrl?: string;
  isVerified: boolean;
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
