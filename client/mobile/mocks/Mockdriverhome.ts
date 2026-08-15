import { DriverHomeProfile, RecentTripSummary } from "@/types/DriverHome";

export const mockDriverProfile: DriverHomeProfile = {
  id: "drv_1",
  fullName: "Francisco Kommasz",
  photoUrl:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  isVerified: false,
  verificationPending: false,
  hasVehicleRegistered: true,
  stats: {
    tripsCompleted: 128,
    rating: 4.8,
    earningsThisWeek: 212500,
    acceptanceRate: 92,
  },
};

export const mockRecentTrips: RecentTripSummary[] = [
  {
    id: "trip_1",
    originName: "Talatona",
    destinationName: "Ilha de Luanda",
    date: new Date(),
    status: "completed",
    price: 3500,
  },
  {
    id: "trip_2",
    originName: "Viana",
    destinationName: "Cazenga",
    date: new Date(Date.now() - 1000 * 60 * 60 * 20),
    status: "completed",
    price: 2200,
  },
  {
    id: "trip_3",
    originName: "Kilamba",
    destinationName: "Aeroporto",
    date: new Date(Date.now() - 1000 * 60 * 60 * 40),
    status: "cancelled",
    price: 0,
  },
];
