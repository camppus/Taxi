import { Booking } from "./Bookings";
import { Gender } from "./Gender";

export interface Trips {
  id: string;
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
    id?: string;
  };

  bookings: Booking[];
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
