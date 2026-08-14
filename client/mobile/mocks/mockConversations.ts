import Conversation from "@/types/Conversation";
import { Gender } from "@/types/Gender";

export const mockConversations: Conversation[] = [
  {
    id: "conv-001",
    createdAt: new Date("2026-08-14T08:30:00"),
    updatedAt: new Date("2026-08-14T09:45:00"),
    lastMessage: {
      message: "Estou a chegar ao ponto de embarque.",
      sentAt: new Date("2026-08-14T09:45:00"),
      isMe: false,
      isRead: false,
    },
    trip: {
      name: "Luanda → Talatona",
      originLat: -8.8383,
      originLog: 13.2344,
      destinationLat: -8.9186,
      destinationLog: 13.1841,
      departureDate: "2026-08-14",
      departureTime: "10:00",
      publishedSeats: 3,
      priceBase: 3500,

      vehicle: {
        name: "Toyota Corolla",
        description: "Veículo confortável e climatizado",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Branco",
        plateNumber: "LD-45-67-AB",
        totalSeats: 5,
        passengerSeats: 4,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
      },

      driver: {
        fullName: "João Manuel",
        phone: "+244 923 456 789",
        gender: Gender.M,
        birthDate: "1994-06-12",
        photoUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        emergencyPhone: "+244 923 111 222",
        selfieUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },

      bookings: [],
    },
  },

  {
    id: "conv-002",
    createdAt: new Date("2026-08-13T15:20:00"),
    updatedAt: new Date("2026-08-14T08:15:00"),
    lastMessage: {
      message: "Bom dia, a viagem continua marcada para as 09h?",
      sentAt: new Date("2026-08-14T08:15:00"),
      isMe: true,
      isRead: true,
    },
    trip: {
      name: "Viana → Maianga",
      originLat: -8.9029,
      originLog: 13.3717,
      destinationLat: -8.8285,
      destinationLog: 13.2381,
      departureDate: "2026-08-14",
      departureTime: "09:00",
      publishedSeats: 2,
      priceBase: 2800,

      vehicle: {
        name: "Hyundai Accent",
        description: "Sedan económico",
        brand: "Hyundai",
        model: "Accent",
        year: 2021,
        color: "Cinza",
        plateNumber: "LD-12-89-CD",
        totalSeats: 5,
        passengerSeats: 4,
        image: "https://images.unsplash.com/photo-1551830820-330a71b99659",
      },

      driver: {
        fullName: "Carlos António",
        phone: "+244 926 555 341",
        gender: Gender.M,
        birthDate: "1990-02-18",
        photoUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },

      bookings: [],
    },
  },

  {
    id: "conv-003",
    createdAt: new Date("2026-08-12T11:10:00"),
    updatedAt: new Date("2026-08-13T18:40:00"),
    lastMessage: {
      message: "Pode enviar a localização exata do ponto?",
      sentAt: new Date("2026-08-13T18:40:00"),
      isMe: false,
      isRead: true,
    },
    trip: {
      name: "Kilamba → Benfica",
      originLat: -9.0092,
      originLog: 13.2671,
      destinationLat: -8.9667,
      destinationLog: 13.1708,
      departureDate: "2026-08-15",
      departureTime: "07:30",
      publishedSeats: 4,
      priceBase: 3200,

      vehicle: {
        name: "Toyota Vitz",
        description: "Compacto, ideal para viagens urbanas",
        brand: "Toyota",
        model: "Vitz",
        year: 2020,
        color: "Preto",
        plateNumber: "LD-77-21-EF",
        totalSeats: 5,
        passengerSeats: 4,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      },

      driver: {
        fullName: "Maria José",
        phone: "+244 934 222 118",
        gender: Gender.M,
        birthDate: "1996-09-25",
        photoUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        emergencyPhone: "+244 934 222 119",
      },

      bookings: [],
    },
  },

  {
    id: "conv-004",
    createdAt: new Date("2026-08-11T09:00:00"),
    updatedAt: new Date("2026-08-12T13:25:00"),
    lastMessage: {
      message: "Obrigado pela viagem! Cheguei bem.",
      sentAt: new Date("2026-08-12T13:25:00"),
      isMe: true,
      isRead: false,
    },
    trip: {
      name: "Mutamba → Benfica",
      originLat: -8.8135,
      originLog: 13.2306,
      destinationLat: -8.9667,
      destinationLog: 13.1708,
      departureDate: "2026-08-12",
      departureTime: "12:00",
      publishedSeats: 1,
      priceBase: 4000,

      vehicle: {
        name: "Kia Picanto",
        description: "Veículo pequeno e econômico",
        brand: "Kia",
        model: "Picanto",
        year: 2019,
        color: "Vermelho",
        plateNumber: "LD-34-56-GH",
        totalSeats: 5,
        passengerSeats: 4,
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
      },

      driver: {
        fullName: "Pedro Sebastião",
        phone: "+244 922 888 774",
        gender: Gender.M,
        birthDate: "1988-11-03",
        photoUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },

      bookings: [],
    },
  },

  {
    id: "conv-005",
    createdAt: new Date("2026-08-10T16:45:00"),
    updatedAt: new Date("2026-08-11T07:10:00"),
    lastMessage: {
      message: "Vou sair um pouco mais cedo para evitar trânsito.",
      sentAt: new Date("2026-08-11T07:10:00"),
      isMe: false,
      isRead: false,
    },
    trip: {
      name: "Cacuaco → Luanda",
      originLat: -8.805,
      originLog: 13.2503,
      destinationLat: -8.8383,
      destinationLog: 13.2344,
      departureDate: "2026-08-11",
      departureTime: "07:30",
      publishedSeats: 2,
      priceBase: 2500,

      vehicle: {
        name: "Hyundai i10",
        description: "Veículo compacto e confortável",
        brand: "Hyundai",
        model: "i10",
        year: 2022,
        color: "Azul",
        plateNumber: "LD-98-43-IJ",
        totalSeats: 5,
        passengerSeats: 4,
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
      },

      driver: {
        fullName: "Miguel Francisco",
        phone: "+244 925 777 332",
        gender: Gender.M,
        birthDate: "1993-04-21",
        photoUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },

      bookings: [],
    },
  },
];
