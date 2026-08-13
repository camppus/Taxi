import { Gender } from "./Gender";

export interface Trips {
  vehicle: {
    name: string;
    description?: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    totalSeats: number;
    passengerSeats: number;
    image: string;
  };

  driver: {
    fullName: string;
    phone: string;
    gender: Gender;
    birthDate: string;
    photoUrl?: string;
    emergencyPhone?: string;
    selfieUrl?: string;
  };

  bookings: [];
  name: string;
  originLat: number;
  originLog: number;
  destinationLat: number;
  destinationLog: number;
  departureDate: string;
  departureTime: string;
  publishedSeats?: number;
  priceBase: number;
}
