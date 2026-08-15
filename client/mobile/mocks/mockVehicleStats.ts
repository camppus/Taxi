export interface VehicleStats {
  tripsCompleted: number;
  rating: number;
  earningsThisMonth: number;
}

// chave = vehicle.id
export const mockVehicleStats: Record<string, VehicleStats> = {
  "vehicle-001": { tripsCompleted: 84, rating: 4.9, earningsThisMonth: 186000 },
  "vehicle-002": { tripsCompleted: 51, rating: 4.7, earningsThisMonth: 121500 },
  "vehicle-003": { tripsCompleted: 32, rating: 4.6, earningsThisMonth: 98000 },
  "vehicle-004": { tripsCompleted: 60, rating: 4.8, earningsThisMonth: 142000 },
  "vehicle-005": { tripsCompleted: 27, rating: 4.5, earningsThisMonth: 64000 },
  "vehicle-006": { tripsCompleted: 0, rating: 0, earningsThisMonth: 0 },
  "vehicle-007": { tripsCompleted: 15, rating: 4.4, earningsThisMonth: 31000 },
  "vehicle-008": { tripsCompleted: 40, rating: 4.6, earningsThisMonth: 0 },
  "vehicle-009": { tripsCompleted: 22, rating: 4.9, earningsThisMonth: 210000 },
  "vehicle-010": { tripsCompleted: 68, rating: 4.8, earningsThisMonth: 158000 },
};
