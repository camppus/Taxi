import { Booking, BookingStatus } from "@/types/Bookings";
import { Gender } from "@/types/Gender";

export const mockBookings: Booking[] = [
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

  {
    id: "booking-003",
    tripId: "trip-003",
    passengerId: "user-003",

    trip: {
      id: "trip-003",
      name: "Benfica → Ingombota",
      distanceKm: 16.4,
      estimatedMinutes: 32,
      departureDate: "2026-08-15T09:15:00.000Z",
      publishedSeats: 2,
      priceBase: 2200,
      status: "IN_PROGRESS",

      driver: {
        id: "driver-003",

        user: {
          id: "user-driver-003",
          fullName: "João Sebastião",
          phone: "+244931234567",
          gender: Gender.M,
          birthDate: "1991-11-03T00:00:00.000Z",
          photoUrl: "https://randomuser.me/api/portraits/men/52.jpg",
          emergencyPhone: "+244925111222",
        },

        licenseCategory: "Ligeiros",
        licenseNumber: "LD-5721938",
        status: "ONLINE",
      },

      vehicle: {
        id: "vehicle-003",
        name: "Toyota Vitz",
        capacity: 5,
        description: "Veículo compacto e económico.",
        brand: "Toyota",
        model: "Vitz",
        year: 2019,
        color: "Preto",
        plateNumber: "LD-11-67-CC",
        totalSeats: 5,
        passengerSeats: 4,
      },
    },

    passenger: {
      id: "user-003",
      fullName: "Marta Domingos",
      phone: "+244929765432",
      gender: Gender.F,
      birthDate: "2001-06-25T00:00:00.000Z",
      photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      emergencyPhone: "+244934111222",
    },

    seats: 1,
    price: 2200,

    status: "IN_TRIP",

    payment: {
      id: "payment-003",
      amount: 2200,
      method: "CASH",
      status: "PROCESSING",
      createdAt: "2026-08-15T08:40:00.000Z",
      updatedAt: "2026-08-15T09:18:00.000Z",
    },

    rating: [],

    Report: [],

    tripStop: [
      {
        id: "stop-003-pick",
        locationId: "location-benfica",
        location: {
          id: "location-benfica",
          name: "Benfica",
          latitude: -9.005,
          longitude: 13.196,
          description: "Zona do Benfica",
          formattedAddress: "Benfica, Luanda, Angola",
          externalId: "osm-benfica",
          street: "Estrada Nacional 100",
          neighborhood: "Benfica",
          city: "Luanda",
          province: "Luanda",
          country: "Angola",
        },
        order: 1,
        type: "PICK",
        distanceFromStart: 0,
        createdAt: "2026-08-15T08:35:00.000Z",
      },

      {
        id: "stop-003-drop",
        locationId: "location-ingombota",
        location: {
          id: "location-ingombota",
          name: "Ingombota",
          latitude: -8.8119,
          longitude: 13.2312,
          description: "Centro de Luanda",
          formattedAddress: "Ingombota, Luanda, Angola",
          externalId: "osm-ingombota",
          street: "Rua Rainha Ginga",
          neighborhood: "Ingombota",
          city: "Luanda",
          province: "Luanda",
          country: "Angola",
        },
        order: 2,
        type: "DROP",
        distanceFromStart: 16.4,
        createdAt: "2026-08-15T08:35:00.000Z",
      },
    ],

    createdAt: "2026-08-15T08:35:00.000Z",
    updatedAt: "2026-08-15T09:18:00.000Z",
  },

  {
    id: "booking-004",
    tripId: "trip-004",
    passengerId: "user-004",

    trip: {
      id: "trip-004",
      name: "Camama → Mutamba",
      distanceKm: 21.8,
      estimatedMinutes: 42,
      departureDate: "2026-08-16T07:00:00.000Z",
      publishedSeats: 3,
      priceBase: 2800,
      status: "COMPLETED",

      driver: {
        id: "driver-004",

        user: {
          id: "user-driver-004",
          fullName: "Pedro Luís Francisco",
          phone: "+244922345678",
          gender: Gender.M,
          birthDate: "1987-02-18T00:00:00.000Z",
          photoUrl: "https://randomuser.me/api/portraits/men/61.jpg",
          emergencyPhone: "+244933987654",
        },

        licenseCategory: "Ligeiros",
        licenseNumber: "LD-6382917",
        status: "OFFLINE",
      },

      vehicle: {
        id: "vehicle-004",
        name: "Suzuki Swift",
        capacity: 5,
        description: "Viatura confortável para viagens diárias.",
        brand: "Suzuki",
        model: "Swift",
        year: 2022,
        color: "Azul",
        plateNumber: "LD-90-45-DD",
        totalSeats: 5,
        passengerSeats: 4,
      },
    },

    passenger: {
      id: "user-004",
      fullName: "Daniel António",
      phone: "+244927654321",
      gender: Gender.M,
      birthDate: "1996-09-08T00:00:00.000Z",
      photoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      emergencyPhone: "+244925444555",
    },

    seats: 1,
    price: 2800,

    status: "COMPLETED",

    payment: {
      id: "payment-004",
      amount: 2800,
      method: "MULTICAIXA_EXPRESS",
      transactionId: "MCX-20260816-004",
      status: "PAID",
      paidAt: "2026-08-16T07:51:00.000Z",
      createdAt: "2026-08-16T06:40:00.000Z",
      updatedAt: "2026-08-16T07:51:00.000Z",
    },

    rating: [
      {
        id: "rating-004",
        fromUserId: "user-004",
        toUserId: "user-driver-004",
        target: "DRIVER",
        stars: 5,
        comment: "Motorista muito profissional e pontual.",
        createdAt: "2026-08-16T08:00:00.000Z",
      },
    ],

    Report: [],

    tripStop: [
      {
        id: "stop-004-pick",
        locationId: "location-camama",
        location: {
          id: "location-camama",
          name: "Camama",
          latitude: -9.138,
          longitude: 13.296,
          description: "Zona do Camama",
          formattedAddress: "Camama, Luanda, Angola",
          externalId: "osm-camama",
          street: "Avenida Pedro de Castro Van-Dúnem Loy",
          neighborhood: "Camama",
          city: "Luanda",
          province: "Luanda",
          country: "Angola",
        },
        order: 1,
        type: "PICK",
        distanceFromStart: 0,
        createdAt: "2026-08-16T06:30:00.000Z",
      },

      {
        id: "stop-004-drop",
        locationId: "location-mutamba",
        location: {
          id: "location-mutamba",
          name: "Mutamba",
          latitude: -8.8147,
          longitude: 13.2302,
          description: "Centro histórico e administrativo de Luanda",
          formattedAddress: "Mutamba, Luanda, Angola",
          externalId: "osm-mutamba",
          street: "Largo da Mutamba",
          neighborhood: "Mutamba",
          city: "Luanda",
          province: "Luanda",
          country: "Angola",
        },
        order: 2,
        type: "DROP",
        distanceFromStart: 21.8,
        createdAt: "2026-08-16T06:30:00.000Z",
      },
    ],

    createdAt: "2026-08-16T06:30:00.000Z",
    updatedAt: "2026-08-16T08:00:00.000Z",
  },

  {
    id: "booking-005",
    tripId: "trip-005",
    passengerId: "user-005",

    trip: {
      id: "trip-005",
      name: "Zango → Kilamba",
      distanceKm: 14.9,
      estimatedMinutes: 30,
      departureDate: "2026-08-17T06:45:00.000Z",
      publishedSeats: 1,
      priceBase: 2000,
      status: "CANCELLED",

      driver: {
        id: "driver-005",

        user: {
          id: "user-driver-005",
          fullName: "António José Mateus",
          phone: "+244934567123",
          gender: Gender.M,
          birthDate: "1990-12-10T00:00:00.000Z",
          photoUrl: "https://randomuser.me/api/portraits/men/76.jpg",
          emergencyPhone: "+244922765432",
        },

        licenseCategory: "Ligeiros",
        licenseNumber: "LD-7219384",
        status: "OFFLINE",
      },

      vehicle: {
        id: "vehicle-005",
        name: "Kia Picanto",
        capacity: 5,
        description: "Viatura compacta e económica.",
        brand: "Kia",
        model: "Picanto",
        year: 2021,
        color: "Vermelho",
        plateNumber: "LD-33-81-EE",
        totalSeats: 5,
        passengerSeats: 4,
      },
    },

    passenger: {
      id: "user-005",
      fullName: "Cláudia Maria",
      phone: "+244925345678",
      gender: Gender.F,
      birthDate: "1999-05-17T00:00:00.000Z",
      photoUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      emergencyPhone: "+244923555666",
    },

    seats: 1,
    price: 2000,

    status: "CANCELLED",

    payment: {
      id: "payment-005",
      amount: 2000,
      method: "MULTICAIXA_EXPRESS",
      transactionId: "MCX-20260817-005",
      status: "REFUNDED",
      paidAt: "2026-08-16T19:15:00.000Z",
      createdAt: "2026-08-16T19:10:00.000Z",
      updatedAt: "2026-08-16T20:05:00.000Z",
    },

    rating: [],

    Report: [
      {
        id: "report-005",
        reporterId: "user-005",
        targetUserId: "user-driver-005",
        bookingId: "booking-005",
        type: "TRIP_PROBLEM",
        title: "Viagem cancelada pelo motorista",
        description:
          "O motorista cancelou a viagem pouco antes do horário previsto.",
        status: "RESOLVED",
        createdAt: "2026-08-16T20:10:00.000Z",
        updatedAt: "2026-08-16T21:00:00.000Z",
      },
    ],

    tripStop: [
      {
        id: "stop-005-pick",
        locationId: "location-zango",
        location: {
          id: "location-zango",
          name: "Zango",
          latitude: -9.012,
          longitude: 13.432,
          description: "Zango, Viana",
          formattedAddress: "Zango, Luanda, Angola",
          externalId: "osm-zango",
          street: "Estrada do Zango",
          neighborhood: "Zango",
          city: "Viana",
          province: "Luanda",
          country: "Angola",
        },
        order: 1,
        type: "PICK",
        distanceFromStart: 0,
        createdAt: "2026-08-16T19:00:00.000Z",
      },

      {
        id: "stop-005-drop",
        locationId: "location-kilamba-2",
        location: {
          id: "location-kilamba-2",
          name: "Kilamba",
          latitude: -9.1612,
          longitude: 13.7374,
          description: "Centralidade do Kilamba",
          formattedAddress: "Kilamba, Luanda, Angola",
          externalId: "osm-kilamba-2",
          street: "Avenida Principal",
          neighborhood: "Kilamba",
          city: "Luanda",
          province: "Luanda",
          country: "Angola",
        },
        order: 2,
        type: "DROP",
        distanceFromStart: 14.9,
        createdAt: "2026-08-16T19:00:00.000Z",
      },
    ],

    createdAt: "2026-08-16T19:00:00.000Z",
    updatedAt: "2026-08-16T21:00:00.000Z",
  },
];
