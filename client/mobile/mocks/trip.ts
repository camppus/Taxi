import { Gender } from "@/types/Gender";
import { Trips } from "@/types/Trips";
import * as crypto from "expo-crypto";

export const mockTrips: Trips[] = [
  {
    name: "Luanda → Talatona",
    id: crypto.randomUUID(),
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

    bookings: [
      {
        id: "booking-001",
        tripId: "trip-001",
        passengerId: "user-001",

        trip: {
          id: "trip-001",
          name: "Kilamba → Talatona",
          distanceKm: 18.7,
          estimatedMinutes: 35,
          departureDate: "2026-08-15T07:30:00.000Z",
          publishedSeats: 3,
          priceBase: 2500,
          status: "COMPLETED",

          driver: {
            id: "driver-001",

            user: {
              id: "user-driver-001",
              fullName: "Manuel António",
              phone: "+244923456781",
              gender: Gender.M,
              birthDate: "1989-04-12T00:00:00.000Z",
              photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
              emergencyPhone: "+244934567812",
            },

            licenseCategory: "Ligeiros",
            licenseNumber: "LD-2847391",
            status: "ONLINE",
          },

          vehicle: {
            id: "vehicle-001",
            name: "Toyota Corolla",
            capacity: 5,
            description: "Viatura confortável e climatizada.",
            brand: "Toyota",
            model: "Corolla",
            year: 2021,
            color: "Branco",
            plateNumber: "LD-45-23-AA",
            totalSeats: 5,
            passengerSeats: 4,
          },
        },

        passenger: {
          id: "user-001",
          fullName: "Francisco Diakomas",
          phone: "+244925123456",
          gender: Gender.M,
          birthDate: "2005-09-20T00:00:00.000Z",
          photoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
          emergencyPhone: "+244923987654",
        },

        seats: 1,
        price: 2500,

        status: "CONFIRMED",

        payment: {
          id: "payment-001",
          amount: 2500,
          method: "MULTICAIXA_EXPRESS",
          transactionId: "MCX-20260815-001",
          status: "PAID",
          paidAt: "2026-08-14T18:32:00.000Z",
          createdAt: "2026-08-14T18:30:00.000Z",
          updatedAt: "2026-08-14T18:32:00.000Z",
        },

        rating: [],

        Report: [],

        tripStop: [
          {
            id: "stop-001-pick",
            locationId: "location-kilamba",
            location: {
              id: "location-kilamba",
              name: "Kilamba",
              latitude: -9.1612,
              longitude: 13.7374,
              description: "Centralidade do Kilamba",
              formattedAddress: "Kilamba, Luanda, Angola",
              externalId: "osm-kilamba",
              street: "Avenida Principal",
              neighborhood: "Kilamba",
              city: "Luanda",
              province: "Luanda",
              country: "Angola",
            },
            order: 1,
            type: "PICK",
            distanceFromStart: 0,
            createdAt: "2026-08-14T18:20:00.000Z",
          },

          {
            id: "stop-001-drop",
            locationId: "location-talatona",
            location: {
              id: "location-talatona",
              name: "Talatona",
              latitude: -9.0975,
              longitude: 13.3701,
              description: "Zona urbana de Talatona",
              formattedAddress: "Talatona, Luanda, Angola",
              externalId: "osm-talatona",
              street: "Avenida Pedro de Castro Van-Dúnem Loy",
              neighborhood: "Talatona",
              city: "Luanda",
              province: "Luanda",
              country: "Angola",
            },
            order: 2,
            type: "DROP",
            distanceFromStart: 18.7,
            createdAt: "2026-08-14T18:20:00.000Z",
          },
        ],

        createdAt: "2026-08-14T18:20:00.000Z",
        updatedAt: "2026-08-14T18:32:00.000Z",
      },

      {
        id: "booking-002",
        tripId: "trip-002",
        passengerId: "user-002",

        trip: {
          id: "trip-002",
          name: "Viana → Maianga",
          distanceKm: 24.3,
          estimatedMinutes: 48,
          departureDate: "2026-08-15T08:00:00.000Z",
          publishedSeats: 4,
          priceBase: 3000,
          status: "AVAILABLE",

          driver: {
            id: "driver-002",

            user: {
              id: "user-driver-002",
              fullName: "Carlos Manuel Pedro",
              phone: "+244924567890",
              gender: Gender.M,
              birthDate: "1985-07-21T00:00:00.000Z",
              photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
              emergencyPhone: "+244933456789",
            },

            licenseCategory: "Ligeiros",
            licenseNumber: "LD-3948217",
            status: "ONLINE",
          },

          vehicle: {
            id: "vehicle-002",
            name: "Hyundai Accent",
            capacity: 5,
            description: "Viatura económica para viagens urbanas.",
            brand: "Hyundai",
            model: "Accent",
            year: 2020,
            color: "Cinza",
            plateNumber: "LD-72-18-BB",
            totalSeats: 5,
            passengerSeats: 4,
          },
        },

        passenger: {
          id: "user-002",
          fullName: "Ana Paula Joaquim",
          phone: "+244926234567",
          gender: Gender.F,
          birthDate: "1998-03-14T00:00:00.000Z",
          photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
          emergencyPhone: "+244925876543",
        },

        seats: 2,
        price: 6000,

        status: "PENDING_PAYMENT",

        payment: {
          id: "payment-002",
          amount: 6000,
          method: "MULTICAIXA_EXPRESS",
          transactionId: "MCX-20260815-002",
          status: "PENDING",
          createdAt: "2026-08-14T20:10:00.000Z",
          updatedAt: "2026-08-14T20:10:00.000Z",
        },

        rating: [],

        Report: [],

        tripStop: [
          {
            id: "stop-002-pick",
            locationId: "location-viana",
            location: {
              id: "location-viana",
              name: "Viana",
              latitude: -8.902,
              longitude: 13.3711,
              description: "Município de Viana",
              formattedAddress: "Viana, Luanda, Angola",
              externalId: "osm-viana",
              street: "Estrada de Viana",
              neighborhood: "Viana",
              city: "Viana",
              province: "Luanda",
              country: "Angola",
            },
            order: 1,
            type: "PICK",
            distanceFromStart: 0,
            createdAt: "2026-08-14T20:00:00.000Z",
          },

          {
            id: "stop-002-drop",
            locationId: "location-maianga",
            location: {
              id: "location-maianga",
              name: "Maianga",
              latitude: -8.8419,
              longitude: 13.2312,
              description: "Município de Luanda",
              formattedAddress: "Maianga, Luanda, Angola",
              externalId: "osm-maianga",
              street: "Rua Amílcar Cabral",
              neighborhood: "Maianga",
              city: "Luanda",
              province: "Luanda",
              country: "Angola",
            },
            order: 2,
            type: "DROP",
            distanceFromStart: 24.3,
            createdAt: "2026-08-14T20:00:00.000Z",
          },
        ],

        createdAt: "2026-08-14T20:00:00.000Z",
        updatedAt: "2026-08-14T20:10:00.000Z",
      },
    ],
  },

  {
    name: "Kilamba → Maianga",
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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
