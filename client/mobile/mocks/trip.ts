import { Gender } from "@/types/Gender";
import { Trips } from "@/types/Trips";

export const mockTrips: Trips[] = [
  {
    name: "Luanda → Talatona",
    originLat: -8.8383,
    originLog: 13.2344,
    destinationLat: -8.9172,
    destinationLog: 13.1847,

    departureDate: "2026-08-14",
    departureTime: "08:00",

    publishedSeats: 3,
    priceBase: 2500,

    vehicle: {
      name: "Toyota Corolla",
      description: "Sedan confortável e climatizado",
      brand: "Toyota",
      model: "Corolla",
      year: 2022,
      color: "Branco",
      plateNumber: "LD-45-82-AB",
      totalSeats: 5,
      passengerSeats: 4,
      image:
        "https://img.magnific.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_test_b&w=740&q=80",
    },

    driver: {
      fullName: "Carlos Manuel",
      phone: "+244 923 456 781",
      gender: Gender.M,
      birthDate: "1994-06-15",
      photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      emergencyPhone: "+244 934 765 210",
    },

    bookings: [],
  },

  {
    name: "Kilamba → Maianga",
    originLat: -9.0011,
    originLog: 13.2678,
    destinationLat: -8.8275,
    destinationLog: 13.2456,

    departureDate: "2026-08-14",
    departureTime: "09:30",

    publishedSeats: 2,
    priceBase: 3000,

    vehicle: {
      name: "Hyundai Tucson",
      description: "SUV espaçoso e confortável",
      brand: "Hyundai",
      model: "Tucson",
      year: 2021,
      color: "Cinza",
      plateNumber: "LD-72-19-CD",
      totalSeats: 5,
      passengerSeats: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56oc1adYbaahu9v3ywHyfjU7BmJyMI96PocJJpRQWfQ&s=10",
    },

    driver: {
      fullName: "Ana Paula José",
      phone: "+244 925 784 321",
      gender: Gender.F,
      birthDate: "1997-03-22",
      photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      emergencyPhone: "+244 922 341 987",
    },

    bookings: [],
  },

  {
    name: "Viana → Benfica",
    originLat: -8.9021,
    originLog: 13.3712,
    destinationLat: -8.8976,
    destinationLog: 13.1898,

    departureDate: "2026-08-14",
    departureTime: "11:00",

    publishedSeats: 4,
    priceBase: 3500,

    vehicle: {
      name: "Toyota Hiace",
      description: "Viatura espaçosa para viagens partilhadas",
      brand: "Toyota",
      model: "Hiace",
      year: 2020,
      color: "Prata",
      plateNumber: "LD-18-54-EF",
      totalSeats: 15,
      passengerSeats: 14,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEr3uDAMKy11OZj8q-Gd6S36r2WivT8vCrepTAAaPGw&s=10",
    },

    driver: {
      fullName: "João António",
      phone: "+244 927 615 432",
      gender: Gender.M,
      birthDate: "1989-11-08",
      photoUrl: "https://randomuser.me/api/portraits/men/46.jpg",
      emergencyPhone: "+244 923 111 456",
    },

    bookings: [],
  },

  {
    name: "Camama → Ilha de Luanda",
    originLat: -8.8824,
    originLog: 13.3058,
    destinationLat: -8.7907,
    destinationLog: 13.2251,

    departureDate: "2026-08-15",
    departureTime: "07:30",

    publishedSeats: 2,
    priceBase: 4000,

    vehicle: {
      name: "Kia Sportage",
      description: "SUV moderno com ar condicionado",
      brand: "Kia",
      model: "Sportage",
      year: 2023,
      color: "Preto",
      plateNumber: "LD-91-27-GH",
      totalSeats: 5,
      passengerSeats: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOgwKHubeKllW7PWz4Z3OQdlDyQVN8sxbJC-4LS0uP9-O2TUTYFrVjk9R&s=10",
    },

    driver: {
      fullName: "Miguel Domingos",
      phone: "+244 924 832 615",
      gender: Gender.M,
      birthDate: "1992-09-17",
      photoUrl: "https://randomuser.me/api/portraits/men/68.jpg",
      emergencyPhone: "+244 929 456 712",
    },

    bookings: [],
  },

  {
    name: "Morro Bento → Patriota",
    originLat: -8.8546,
    originLog: 13.2024,
    destinationLat: -8.9067,
    destinationLog: 13.1805,

    departureDate: "2026-08-15",
    departureTime: "14:00",

    publishedSeats: 3,
    priceBase: 2000,

    vehicle: {
      name: "Toyota Yaris",
      description: "Compacto, económico e confortável",
      brand: "Toyota",
      model: "Yaris",
      year: 2022,
      color: "Azul",
      plateNumber: "LD-63-41-IJ",
      totalSeats: 5,
      passengerSeats: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6BNzoSGUwvNv2Bnck8RkJdLh6hyF2rg6Re-YsYmBiQ&s=10",
    },

    driver: {
      fullName: "Pedro Sebastião",
      phone: "+244 926 548 219",
      gender: Gender.M,
      birthDate: "1995-01-29",
      photoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      emergencyPhone: "+244 925 673 814",
    },

    bookings: [],
  },
];
