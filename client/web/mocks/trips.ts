import { Trip } from "@/app/app/rides/page";

export const Mocktrips: Trip[] = [
  {
    id: "TRP-001",
    from: { name: "Talatona", lat: -8.917, lng: 13.184 },
    to: { name: "Palanca", lat: -8.869, lng: 13.263 },
    status: "completed",
    driver: {
      id: "DRV-001",
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookings: [
      {
        id: "BKG-001",
        passenger: {
          id: "PAX-001",
          name: "Ana Maria",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-002",
        passenger: {
          id: "PAX-002",
          name: "Carlos Pedro",
          avatar: "https://i.pravatar.cc/150?img=33",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 10:33",
    createdAt: "Hoje, 10:05",
  },

  {
    id: "TRP-002",
    from: { name: "Sambizanga", lat: -8.792, lng: 13.24 },
    to: { name: "Kilamba", lat: -9.001, lng: 13.266 },
    status: "active",
    driver: {
      id: "DRV-002",
      name: "Domingos Bumba",
      avatar: "https://i.pravatar.cc/150?img=12",
      vehicle: "Toyota Hiace",
      plate: "LD-88-12-BC",
    },
    bookings: [
      {
        id: "BKG-003",
        passenger: {
          id: "PAX-003",
          name: "Maria João",
          avatar: "https://i.pravatar.cc/150?img=44",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Agora",
    createdAt: "Há 41 min",
  },

  {
    id: "TRP-003",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    status: "active",
    driver: {
      id: "DRV-003",
      name: "Pedro António",
      avatar: "https://i.pravatar.cc/150?img=13",
      vehicle: "Toyota Yaris",
      plate: "LD-72-11-EF",
    },
    bookings: [
      {
        id: "BKG-004",
        passenger: {
          id: "PAX-004",
          name: "Pedro António",
          avatar: "https://i.pravatar.cc/150?img=51",
        },
        seats: 2,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-005",
        passenger: {
          id: "PAX-005",
          name: "Joana Manuel",
          avatar: "https://i.pravatar.cc/150?img=47",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "pending",
      },
      {
        id: "BKG-006",
        passenger: {
          id: "PAX-006",
          name: "Manuel Francisco",
          avatar: "https://i.pravatar.cc/150?img=53",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 4 min",
    createdAt: "Há 15 min",
  },

  {
    id: "TRP-004",
    from: { name: "Luanda Sul", lat: -8.93, lng: 13.195 },
    to: { name: "Mutamba", lat: -8.814, lng: 13.231 },
    status: "cancelled",
    driver: {
      id: "DRV-004",
      name: "Miguel Sebastião",
      avatar: "https://i.pravatar.cc/150?img=14",
      vehicle: "Kia Picanto",
      plate: "LD-18-45-GH",
    },
    bookings: [],
    departureAt: "Hoje, 09:42",
    createdAt: "Hoje, 09:12",
  },

  {
    id: "TRP-005",
    from: { name: "Maculusso", lat: -8.823, lng: 13.223 },
    to: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    status: "active",
    driver: {
      id: "DRV-005",
      name: "António José",
      avatar: "https://i.pravatar.cc/150?img=15",
      vehicle: "Toyota Corolla",
      plate: "LD-64-32-IJ",
    },
    bookings: [
      {
        id: "BKG-007",
        passenger: {
          id: "PAX-007",
          name: "Daniel Paulo",
          avatar: "https://i.pravatar.cc/150?img=59",
        },
        seats: 1,
        amount: 7600,
        paymentStatus: "paid",
      },
      {
        id: "BKG-008",
        passenger: {
          id: "PAX-008",
          name: "Isabel Neto",
          avatar: "https://i.pravatar.cc/150?img=34",
        },
        seats: 2,
        amount: 3600,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 14 min",
    createdAt: "Há 41 min",
  },

  {
    id: "TRP-006",
    from: { name: "Morro Bento", lat: -8.875, lng: 13.206 },
    to: { name: "Kilamba", lat: -9.001, lng: 13.266 },
    status: "active",
    driver: {
      id: "DRV-006",
      name: "Manuel António",
      avatar: "https://i.pravatar.cc/150?img=18",
      vehicle: "Hyundai Accent",
      plate: "LD-91-21-KL",
    },
    bookings: [
      {
        id: "BKG-009",
        passenger: {
          id: "PAX-009",
          name: "Cesária Fonseca",
          avatar: "https://i.pravatar.cc/150?img=35",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 2 min",
    createdAt: "Há 31 min",
  },

  {
    id: "TRP-007",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Maculusso", lat: -8.823, lng: 13.223 },
    status: "active",
    driver: {
      id: "DRV-007",
      name: "Carlos Manuel",
      avatar: "https://i.pravatar.cc/150?img=19",
      vehicle: "Toyota Vitz",
      plate: "LD-22-34-MN",
    },
    bookings: [
      {
        id: "BKG-010",
        passenger: {
          id: "PAX-010",
          name: "Teresa Muanza",
          avatar: "https://i.pravatar.cc/150?img=36",
        },
        seats: 1,
        amount: 5800,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 9 min",
    createdAt: "Há 55 min",
  },

  {
    id: "TRP-008",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Morro Bento", lat: -8.875, lng: 13.206 },
    status: "cancelled",
    driver: {
      id: "DRV-008",
      name: "Feliciano Bento",
      avatar: "https://i.pravatar.cc/150?img=20",
      vehicle: "Hyundai Tucson",
      plate: "LD-63-84-HA",
    },
    bookings: [
      {
        id: "BKG-011",
        passenger: {
          id: "PAX-011",
          name: "Rosa Chindumba",
          avatar: "https://i.pravatar.cc/150?img=37",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Hoje, 10:05",
    createdAt: "Hoje, 09:42",
  },

  {
    id: "TRP-009",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    status: "waiting",
    driver: {
      id: "DRV-009",
      name: "Aurélio Paulo",
      avatar: "https://i.pravatar.cc/150?img=21",
      vehicle: "Toyota Hiace",
      plate: "LD-15-49-JA",
    },
    bookings: [
      {
        id: "BKG-012",
        passenger: {
          id: "PAX-012",
          name: "Belarmina Sungo",
          avatar: "https://i.pravatar.cc/150?img=38",
        },
        seats: 1,
        amount: 5800,
        paymentStatus: "pending",
      },
      {
        id: "BKG-013",
        passenger: {
          id: "PAX-013",
          name: "Fernanda Diakite",
          avatar: "https://i.pravatar.cc/150?img=39",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "pending",
      },
      {
        id: "BKG-014",
        passenger: {
          id: "PAX-014",
          name: "Palmira Kanda",
          avatar: "https://i.pravatar.cc/150?img=40",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Em 8 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-010",
    from: { name: "Hoji Ya Henda", lat: -8.85, lng: 13.279 },
    to: { name: "Rangel", lat: -8.818, lng: 13.253 },
    status: "active",
    driver: {
      id: "DRV-010",
      name: "Ernesto Panzo",
      avatar: "https://i.pravatar.cc/150?img=22",
      vehicle: "Toyota Corolla",
      plate: "LD-30-96-LA",
    },
    bookings: [
      {
        id: "BKG-015",
        passenger: {
          id: "PAX-015",
          name: "Guilhermina Sozinho",
          avatar: "https://i.pravatar.cc/150?img=41",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-016",
        passenger: {
          id: "PAX-016",
          name: "Deolinda Massano",
          avatar: "https://i.pravatar.cc/150?img=42",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 18 min",
    createdAt: "Há 22 min",
  },

  {
    id: "TRP-011",
    from: { name: "Viana", lat: -8.902, lng: 13.371 },
    to: { name: "Camama", lat: -8.955, lng: 13.229 },
    status: "active",
    driver: {
      id: "DRV-011",
      name: "Zeferino Ngola",
      avatar: "https://i.pravatar.cc/150?img=23",
      vehicle: "Hyundai Accent",
      plate: "LD-87-40-NA",
    },
    bookings: [
      {
        id: "BKG-017",
        passenger: {
          id: "PAX-017",
          name: "Wanda Capela",
          avatar: "https://i.pravatar.cc/150?img=43",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "pending",
      },
      {
        id: "BKG-018",
        passenger: {
          id: "PAX-018",
          name: "Amélia dos Santos",
          avatar: "https://i.pravatar.cc/150?img=45",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 18 min",
    createdAt: "Há 41 min",
  },

  {
    id: "TRP-012",
    from: { name: "Rangel", lat: -8.818, lng: 13.253 },
    to: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    status: "active",
    driver: {
      id: "DRV-012",
      name: "Norberto Sachipengo",
      avatar: "https://i.pravatar.cc/150?img=24",
      vehicle: "Mercedes-Benz Vito",
      plate: "LD-49-83-PA",
    },
    bookings: [
      {
        id: "BKG-019",
        passenger: {
          id: "PAX-019",
          name: "Sofia Bumba",
          avatar: "https://i.pravatar.cc/150?img=46",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-020",
        passenger: {
          id: "PAX-020",
          name: "Lurdes Kiala",
          avatar: "https://i.pravatar.cc/150?img=48",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 14 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-013",
    from: { name: "Cacuaco", lat: -8.802, lng: 13.371 },
    to: { name: "Hoji Ya Henda", lat: -8.85, lng: 13.279 },
    status: "active",
    driver: {
      id: "DRV-013",
      name: "Amadeu Xavier",
      avatar: "https://i.pravatar.cc/150?img=25",
      vehicle: "Toyota Corolla",
      plate: "LD-11-64-RA",
    },
    bookings: [
      {
        id: "BKG-021",
        passenger: {
          id: "PAX-021",
          name: "Ana Maria",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 2 min",
    createdAt: "Há 55 min",
  },

  {
    id: "TRP-014",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Golfe", lat: -8.878, lng: 13.253 },
    status: "active",
    driver: {
      id: "DRV-014",
      name: "Ricardino Faife",
      avatar: "https://i.pravatar.cc/150?img=26",
      vehicle: "Hyundai Tucson",
      plate: "LD-38-52-TA",
    },
    bookings: [
      {
        id: "BKG-022",
        passenger: {
          id: "PAX-022",
          name: "Carlos Pedro",
          avatar: "https://i.pravatar.cc/150?img=33",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "paid",
      },
      {
        id: "BKG-023",
        passenger: {
          id: "PAX-023",
          name: "Maria João",
          avatar: "https://i.pravatar.cc/150?img=44",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-024",
        passenger: {
          id: "PAX-024",
          name: "Pedro António",
          avatar: "https://i.pravatar.cc/150?img=51",
        },
        seats: 2,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 14 min",
    createdAt: "Há 22 min",
  },

  {
    id: "TRP-015",
    from: { name: "Ingombota", lat: -8.811, lng: 13.232 },
    to: { name: "Futungo", lat: -8.888, lng: 13.13 },
    status: "active",
    driver: {
      id: "DRV-015",
      name: "Ivaldino Cassoma",
      avatar: "https://i.pravatar.cc/150?img=27",
      vehicle: "Nissan Sunny",
      plate: "LD-84-66-VA",
    },
    bookings: [
      {
        id: "BKG-025",
        passenger: {
          id: "PAX-025",
          name: "Joana Manuel",
          avatar: "https://i.pravatar.cc/150?img=47",
        },
        seats: 1,
        amount: 7600,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 4 min",
    createdAt: "Há 15 min",
  },

  {
    id: "TRP-016",
    from: { name: "Camama", lat: -8.955, lng: 13.229 },
    to: { name: "Cacuaco", lat: -8.802, lng: 13.371 },
    status: "completed",
    driver: {
      id: "DRV-016",
      name: "Adão Kalunga",
      avatar: "https://i.pravatar.cc/150?img=28",
      vehicle: "Mercedes-Benz Sprinter",
      plate: "LD-77-28-FA",
    },
    bookings: [
      {
        id: "BKG-026",
        passenger: {
          id: "PAX-026",
          name: "Manuel Francisco",
          avatar: "https://i.pravatar.cc/150?img=53",
        },
        seats: 2,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-027",
        passenger: {
          id: "PAX-027",
          name: "Daniel Paulo",
          avatar: "https://i.pravatar.cc/150?img=59",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 09:42",
    createdAt: "Hoje, 09:12",
  },

  {
    id: "TRP-017",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Maculusso", lat: -8.823, lng: 13.223 },
    status: "cancelled",
    driver: {
      id: "DRV-001",
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookings: [],
    departureAt: "Hoje, 10:33",
    createdAt: "Hoje, 10:05",
  },

  {
    id: "TRP-018",
    from: { name: "Ingombota", lat: -8.811, lng: 13.232 },
    to: { name: "Benfica", lat: -8.933, lng: 13.161 },
    status: "waiting",
    driver: {
      id: "DRV-002",
      name: "Domingos Bumba",
      avatar: "https://i.pravatar.cc/150?img=12",
      vehicle: "Toyota Hiace",
      plate: "LD-88-12-BC",
    },
    bookings: [
      {
        id: "BKG-028",
        passenger: {
          id: "PAX-028",
          name: "Isabel Neto",
          avatar: "https://i.pravatar.cc/150?img=34",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Em 8 min",
    createdAt: "Há 6 min",
  },

  {
    id: "TRP-019",
    from: { name: "Prenda", lat: -8.816, lng: 13.243 },
    to: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    status: "active",
    driver: {
      id: "DRV-003",
      name: "Pedro António",
      avatar: "https://i.pravatar.cc/150?img=13",
      vehicle: "Toyota Yaris",
      plate: "LD-72-11-EF",
    },
    bookings: [
      {
        id: "BKG-029",
        passenger: {
          id: "PAX-029",
          name: "Cesária Fonseca",
          avatar: "https://i.pravatar.cc/150?img=35",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 14 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-020",
    from: { name: "Benfica", lat: -8.933, lng: 13.161 },
    to: { name: "Prenda", lat: -8.816, lng: 13.243 },
    status: "completed",
    driver: {
      id: "DRV-004",
      name: "Miguel Sebastião",
      avatar: "https://i.pravatar.cc/150?img=14",
      vehicle: "Kia Picanto",
      plate: "LD-18-45-GH",
    },
    bookings: [
      {
        id: "BKG-030",
        passenger: {
          id: "PAX-030",
          name: "Teresa Muanza",
          avatar: "https://i.pravatar.cc/150?img=36",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "paid",
      },
      {
        id: "BKG-031",
        passenger: {
          id: "PAX-031",
          name: "Rosa Chindumba",
          avatar: "https://i.pravatar.cc/150?img=37",
        },
        seats: 2,
        amount: 4500,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 10:05",
    createdAt: "Hoje, 09:42",
  },

  {
    id: "TRP-021",
    from: { name: "Maianga", lat: -8.827, lng: 13.226 },
    to: { name: "Mutamba", lat: -8.814, lng: 13.231 },
    status: "completed",
    driver: {
      id: "DRV-005",
      name: "António José",
      avatar: "https://i.pravatar.cc/150?img=15",
      vehicle: "Toyota Corolla",
      plate: "LD-64-32-IJ",
    },
    bookings: [
      {
        id: "BKG-032",
        passenger: {
          id: "PAX-032",
          name: "Belarmina Sungo",
          avatar: "https://i.pravatar.cc/150?img=38",
        },
        seats: 2,
        amount: 5800,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 09:42",
    createdAt: "Hoje, 09:12",
  },

  {
    id: "TRP-022",
    from: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    to: { name: "Kilamba", lat: -9.001, lng: 13.266 },
    status: "waiting",
    driver: {
      id: "DRV-006",
      name: "Manuel António",
      avatar: "https://i.pravatar.cc/150?img=18",
      vehicle: "Hyundai Accent",
      plate: "LD-91-21-KL",
    },
    bookings: [
      {
        id: "BKG-033",
        passenger: {
          id: "PAX-033",
          name: "Fernanda Diakite",
          avatar: "https://i.pravatar.cc/150?img=39",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Em 5 min",
    createdAt: "Há 6 min",
  },

  {
    id: "TRP-023",
    from: { name: "Camama", lat: -8.955, lng: 13.229 },
    to: { name: "Cazenga", lat: -8.836, lng: 13.288 },
    status: "active",
    driver: {
      id: "DRV-007",
      name: "Carlos Manuel",
      avatar: "https://i.pravatar.cc/150?img=19",
      vehicle: "Toyota Vitz",
      plate: "LD-22-34-MN",
    },
    bookings: [
      {
        id: "BKG-034",
        passenger: {
          id: "PAX-034",
          name: "Palmira Kanda",
          avatar: "https://i.pravatar.cc/150?img=40",
        },
        seats: 2,
        amount: 4100,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 6 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-024",
    from: { name: "Camama", lat: -8.955, lng: 13.229 },
    to: { name: "Mutamba", lat: -8.814, lng: 13.231 },
    status: "waiting",
    driver: {
      id: "DRV-008",
      name: "Feliciano Bento",
      avatar: "https://i.pravatar.cc/150?img=20",
      vehicle: "Hyundai Tucson",
      plate: "LD-63-84-HA",
    },
    bookings: [
      {
        id: "BKG-035",
        passenger: {
          id: "PAX-035",
          name: "Guilhermina Sozinho",
          avatar: "https://i.pravatar.cc/150?img=41",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Em 8 min",
    createdAt: "Há 6 min",
  },

  {
    id: "TRP-025",
    from: { name: "Hoji Ya Henda", lat: -8.85, lng: 13.279 },
    to: { name: "Maianga", lat: -8.827, lng: 13.226 },
    status: "waiting",
    driver: {
      id: "DRV-009",
      name: "Aurélio Paulo",
      avatar: "https://i.pravatar.cc/150?img=21",
      vehicle: "Toyota Hiace",
      plate: "LD-15-49-JA",
    },
    bookings: [
      {
        id: "BKG-036",
        passenger: {
          id: "PAX-036",
          name: "Deolinda Massano",
          avatar: "https://i.pravatar.cc/150?img=42",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "paid",
      },
      {
        id: "BKG-037",
        passenger: {
          id: "PAX-037",
          name: "Wanda Capela",
          avatar: "https://i.pravatar.cc/150?img=43",
        },
        seats: 2,
        amount: 5200,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Em 15 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-026",
    from: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    to: { name: "Camama", lat: -8.955, lng: 13.229 },
    status: "waiting",
    driver: {
      id: "DRV-010",
      name: "Ernesto Panzo",
      avatar: "https://i.pravatar.cc/150?img=22",
      vehicle: "Toyota Corolla",
      plate: "LD-30-96-LA",
    },
    bookings: [
      {
        id: "BKG-038",
        passenger: {
          id: "PAX-038",
          name: "Amélia dos Santos",
          avatar: "https://i.pravatar.cc/150?img=45",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-039",
        passenger: {
          id: "PAX-039",
          name: "Sofia Bumba",
          avatar: "https://i.pravatar.cc/150?img=46",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Em 5 min",
    createdAt: "Há 3 min",
  },

  {
    id: "TRP-027",
    from: { name: "Golfe", lat: -8.878, lng: 13.253 },
    to: { name: "Camama", lat: -8.955, lng: 13.229 },
    status: "completed",
    driver: {
      id: "DRV-011",
      name: "Zeferino Ngola",
      avatar: "https://i.pravatar.cc/150?img=23",
      vehicle: "Hyundai Accent",
      plate: "LD-87-40-NA",
    },
    bookings: [
      {
        id: "BKG-040",
        passenger: {
          id: "PAX-040",
          name: "Lurdes Kiala",
          avatar: "https://i.pravatar.cc/150?img=48",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 08:10",
    createdAt: "Hoje, 07:48",
  },

  {
    id: "TRP-028",
    from: { name: "Morro Bento", lat: -8.875, lng: 13.206 },
    to: { name: "Prenda", lat: -8.816, lng: 13.243 },
    status: "active",
    driver: {
      id: "DRV-012",
      name: "Norberto Sachipengo",
      avatar: "https://i.pravatar.cc/150?img=24",
      vehicle: "Mercedes-Benz Vito",
      plate: "LD-49-83-PA",
    },
    bookings: [
      {
        id: "BKG-041",
        passenger: {
          id: "PAX-041",
          name: "Ana Maria",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        seats: 2,
        amount: 3600,
        paymentStatus: "pending",
      },
    ],
    departureAt: "Há 6 min",
    createdAt: "Há 41 min",
  },

  {
    id: "TRP-029",
    from: { name: "Futungo", lat: -8.888, lng: 13.13 },
    to: { name: "Morro Bento", lat: -8.875, lng: 13.206 },
    status: "completed",
    driver: {
      id: "DRV-013",
      name: "Amadeu Xavier",
      avatar: "https://i.pravatar.cc/150?img=25",
      vehicle: "Toyota Corolla",
      plate: "LD-11-64-RA",
    },
    bookings: [
      {
        id: "BKG-042",
        passenger: {
          id: "PAX-042",
          name: "Carlos Pedro",
          avatar: "https://i.pravatar.cc/150?img=33",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-043",
        passenger: {
          id: "PAX-043",
          name: "Maria João",
          avatar: "https://i.pravatar.cc/150?img=44",
        },
        seats: 1,
        amount: 5800,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 08:32",
    createdAt: "Hoje, 08:10",
  },

  {
    id: "TRP-030",
    from: { name: "Viana", lat: -8.902, lng: 13.371 },
    to: { name: "Prenda", lat: -8.816, lng: 13.243 },
    status: "active",
    driver: {
      id: "DRV-014",
      name: "Ricardino Faife",
      avatar: "https://i.pravatar.cc/150?img=26",
      vehicle: "Hyundai Tucson",
      plate: "LD-38-52-TA",
    },
    bookings: [
      {
        id: "BKG-044",
        passenger: {
          id: "PAX-044",
          name: "Pedro António",
          avatar: "https://i.pravatar.cc/150?img=51",
        },
        seats: 2,
        amount: 5800,
        paymentStatus: "pending",
      },
      {
        id: "BKG-045",
        passenger: {
          id: "PAX-045",
          name: "Joana Manuel",
          avatar: "https://i.pravatar.cc/150?img=47",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 2 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-031",
    from: { name: "Golfe", lat: -8.878, lng: 13.253 },
    to: { name: "Benfica", lat: -8.933, lng: 13.161 },
    status: "completed",
    driver: {
      id: "DRV-015",
      name: "Ivaldino Cassoma",
      avatar: "https://i.pravatar.cc/150?img=27",
      vehicle: "Nissan Sunny",
      plate: "LD-84-66-VA",
    },
    bookings: [
      {
        id: "BKG-046",
        passenger: {
          id: "PAX-046",
          name: "Manuel Francisco",
          avatar: "https://i.pravatar.cc/150?img=53",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 08:32",
    createdAt: "Hoje, 08:10",
  },

  {
    id: "TRP-032",
    from: { name: "Cacuaco", lat: -8.802, lng: 13.371 },
    to: { name: "Hoji Ya Henda", lat: -8.85, lng: 13.279 },
    status: "waiting",
    driver: {
      id: "DRV-016",
      name: "Adão Kalunga",
      avatar: "https://i.pravatar.cc/150?img=28",
      vehicle: "Mercedes-Benz Sprinter",
      plate: "LD-77-28-FA",
    },
    bookings: [
      {
        id: "BKG-047",
        passenger: {
          id: "PAX-047",
          name: "Daniel Paulo",
          avatar: "https://i.pravatar.cc/150?img=59",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-048",
        passenger: {
          id: "PAX-048",
          name: "Isabel Neto",
          avatar: "https://i.pravatar.cc/150?img=34",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "pending",
      },
      {
        id: "BKG-049",
        passenger: {
          id: "PAX-049",
          name: "Cesária Fonseca",
          avatar: "https://i.pravatar.cc/150?img=35",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Em 5 min",
    createdAt: "Há 6 min",
  },

  {
    id: "TRP-033",
    from: { name: "Futungo", lat: -8.888, lng: 13.13 },
    to: { name: "Maianga", lat: -8.827, lng: 13.226 },
    status: "active",
    driver: {
      id: "DRV-001",
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookings: [
      {
        id: "BKG-050",
        passenger: {
          id: "PAX-050",
          name: "Teresa Muanza",
          avatar: "https://i.pravatar.cc/150?img=36",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-051",
        passenger: {
          id: "PAX-051",
          name: "Rosa Chindumba",
          avatar: "https://i.pravatar.cc/150?img=37",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 18 min",
    createdAt: "Há 22 min",
  },

  {
    id: "TRP-034",
    from: { name: "Luanda Sul", lat: -8.93, lng: 13.195 },
    to: { name: "Viana", lat: -8.902, lng: 13.371 },
    status: "active",
    driver: {
      id: "DRV-002",
      name: "Domingos Bumba",
      avatar: "https://i.pravatar.cc/150?img=12",
      vehicle: "Toyota Hiace",
      plate: "LD-88-12-BC",
    },
    bookings: [
      {
        id: "BKG-052",
        passenger: {
          id: "PAX-052",
          name: "Belarmina Sungo",
          avatar: "https://i.pravatar.cc/150?img=38",
        },
        seats: 1,
        amount: 7600,
        paymentStatus: "paid",
      },
      {
        id: "BKG-053",
        passenger: {
          id: "PAX-053",
          name: "Fernanda Diakite",
          avatar: "https://i.pravatar.cc/150?img=39",
        },
        seats: 2,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 4 min",
    createdAt: "Há 41 min",
  },

  {
    id: "TRP-035",
    from: { name: "Maculusso", lat: -8.823, lng: 13.223 },
    to: { name: "Futungo", lat: -8.888, lng: 13.13 },
    status: "active",
    driver: {
      id: "DRV-003",
      name: "Pedro António",
      avatar: "https://i.pravatar.cc/150?img=13",
      vehicle: "Toyota Yaris",
      plate: "LD-72-11-EF",
    },
    bookings: [
      {
        id: "BKG-054",
        passenger: {
          id: "PAX-054",
          name: "Palmira Kanda",
          avatar: "https://i.pravatar.cc/150?img=40",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
      {
        id: "BKG-055",
        passenger: {
          id: "PAX-055",
          name: "Guilhermina Sozinho",
          avatar: "https://i.pravatar.cc/150?img=41",
        },
        seats: 1,
        amount: 5800,
        paymentStatus: "pending",
      },
      {
        id: "BKG-056",
        passenger: {
          id: "PAX-056",
          name: "Deolinda Massano",
          avatar: "https://i.pravatar.cc/150?img=42",
        },
        seats: 1,
        amount: 5800,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 6 min",
    createdAt: "Há 55 min",
  },

  {
    id: "TRP-036",
    from: { name: "Palanca", lat: -8.869, lng: 13.263 },
    to: { name: "Camama", lat: -8.955, lng: 13.229 },
    status: "active",
    driver: {
      id: "DRV-004",
      name: "Miguel Sebastião",
      avatar: "https://i.pravatar.cc/150?img=14",
      vehicle: "Kia Picanto",
      plate: "LD-18-45-GH",
    },
    bookings: [
      {
        id: "BKG-057",
        passenger: {
          id: "PAX-057",
          name: "Wanda Capela",
          avatar: "https://i.pravatar.cc/150?img=43",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "pending",
      },
      {
        id: "BKG-058",
        passenger: {
          id: "PAX-058",
          name: "Amélia dos Santos",
          avatar: "https://i.pravatar.cc/150?img=45",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 14 min",
    createdAt: "Há 31 min",
  },

  {
    id: "TRP-037",
    from: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    to: { name: "Ingombota", lat: -8.811, lng: 13.232 },
    status: "completed",
    driver: {
      id: "DRV-005",
      name: "António José",
      avatar: "https://i.pravatar.cc/150?img=15",
      vehicle: "Toyota Corolla",
      plate: "LD-64-32-IJ",
    },
    bookings: [
      {
        id: "BKG-059",
        passenger: {
          id: "PAX-059",
          name: "Sofia Bumba",
          avatar: "https://i.pravatar.cc/150?img=46",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "paid",
      },
      {
        id: "BKG-060",
        passenger: {
          id: "PAX-060",
          name: "Lurdes Kiala",
          avatar: "https://i.pravatar.cc/150?img=48",
        },
        seats: 2,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 10:05",
    createdAt: "Hoje, 09:42",
  },

  {
    id: "TRP-038",
    from: { name: "Cazenga", lat: -8.836, lng: 13.288 },
    to: { name: "Maculusso", lat: -8.823, lng: 13.223 },
    status: "active",
    driver: {
      id: "DRV-006",
      name: "Manuel António",
      avatar: "https://i.pravatar.cc/150?img=18",
      vehicle: "Hyundai Accent",
      plate: "LD-91-21-KL",
    },
    bookings: [
      {
        id: "BKG-061",
        passenger: {
          id: "PAX-061",
          name: "Ana Maria",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        seats: 1,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-062",
        passenger: {
          id: "PAX-062",
          name: "Carlos Pedro",
          avatar: "https://i.pravatar.cc/150?img=33",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 2 min",
    createdAt: "Há 22 min",
  },

  {
    id: "TRP-039",
    from: { name: "Golfe", lat: -8.878, lng: 13.253 },
    to: { name: "Rangel", lat: -8.818, lng: 13.253 },
    status: "waiting",
    driver: {
      id: "DRV-007",
      name: "Carlos Manuel",
      avatar: "https://i.pravatar.cc/150?img=19",
      vehicle: "Toyota Vitz",
      plate: "LD-22-34-MN",
    },
    bookings: [
      {
        id: "BKG-063",
        passenger: {
          id: "PAX-063",
          name: "Maria João",
          avatar: "https://i.pravatar.cc/150?img=44",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-064",
        passenger: {
          id: "PAX-064",
          name: "Pedro António",
          avatar: "https://i.pravatar.cc/150?img=51",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "paid",
      },
      {
        id: "BKG-065",
        passenger: {
          id: "PAX-065",
          name: "Joana Manuel",
          avatar: "https://i.pravatar.cc/150?img=47",
        },
        seats: 1,
        amount: 3200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Em 15 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-040",
    from: { name: "Luanda Sul", lat: -8.93, lng: 13.195 },
    to: { name: "Cazenga", lat: -8.836, lng: 13.288 },
    status: "completed",
    driver: {
      id: "DRV-008",
      name: "Feliciano Bento",
      avatar: "https://i.pravatar.cc/150?img=20",
      vehicle: "Hyundai Tucson",
      plate: "LD-63-84-HA",
    },
    bookings: [
      {
        id: "BKG-066",
        passenger: {
          id: "PAX-066",
          name: "Manuel Francisco",
          avatar: "https://i.pravatar.cc/150?img=53",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
      {
        id: "BKG-067",
        passenger: {
          id: "PAX-067",
          name: "Daniel Paulo",
          avatar: "https://i.pravatar.cc/150?img=59",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-068",
        passenger: {
          id: "PAX-068",
          name: "Isabel Neto",
          avatar: "https://i.pravatar.cc/150?img=34",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 07:15",
    createdAt: "Hoje, 07:15",
  },

  {
    id: "TRP-041",
    from: { name: "Camama", lat: -8.955, lng: 13.229 },
    to: { name: "Prenda", lat: -8.816, lng: 13.243 },
    status: "completed",
    driver: {
      id: "DRV-009",
      name: "Aurélio Paulo",
      avatar: "https://i.pravatar.cc/150?img=21",
      vehicle: "Toyota Hiace",
      plate: "LD-15-49-JA",
    },
    bookings: [
      {
        id: "BKG-069",
        passenger: {
          id: "PAX-069",
          name: "Cesária Fonseca",
          avatar: "https://i.pravatar.cc/150?img=35",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 07:48",
    createdAt: "Hoje, 07:15",
  },

  {
    id: "TRP-042",
    from: { name: "Luanda Sul", lat: -8.93, lng: 13.195 },
    to: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    status: "cancelled",
    driver: {
      id: "DRV-010",
      name: "Ernesto Panzo",
      avatar: "https://i.pravatar.cc/150?img=22",
      vehicle: "Toyota Corolla",
      plate: "LD-30-96-LA",
    },
    bookings: [],
    departureAt: "Hoje, 07:48",
    createdAt: "Hoje, 07:15",
  },

  {
    id: "TRP-043",
    from: { name: "Patriota", lat: -8.942, lng: 13.278 },
    to: { name: "Camama", lat: -8.955, lng: 13.229 },
    status: "completed",
    driver: {
      id: "DRV-011",
      name: "Zeferino Ngola",
      avatar: "https://i.pravatar.cc/150?img=23",
      vehicle: "Hyundai Accent",
      plate: "LD-87-40-NA",
    },
    bookings: [
      {
        id: "BKG-070",
        passenger: {
          id: "PAX-070",
          name: "Teresa Muanza",
          avatar: "https://i.pravatar.cc/150?img=36",
        },
        seats: 2,
        amount: 5800,
        paymentStatus: "paid",
      },
      {
        id: "BKG-071",
        passenger: {
          id: "PAX-071",
          name: "Rosa Chindumba",
          avatar: "https://i.pravatar.cc/150?img=37",
        },
        seats: 2,
        amount: 5200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 10:33",
    createdAt: "Hoje, 10:05",
  },

  {
    id: "TRP-044",
    from: { name: "Sambizanga", lat: -8.792, lng: 13.24 },
    to: { name: "Prenda", lat: -8.816, lng: 13.243 },
    status: "active",
    driver: {
      id: "DRV-012",
      name: "Norberto Sachipengo",
      avatar: "https://i.pravatar.cc/150?img=24",
      vehicle: "Mercedes-Benz Vito",
      plate: "LD-49-83-PA",
    },
    bookings: [
      {
        id: "BKG-072",
        passenger: {
          id: "PAX-072",
          name: "Belarmina Sungo",
          avatar: "https://i.pravatar.cc/150?img=38",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-073",
        passenger: {
          id: "PAX-073",
          name: "Fernanda Diakite",
          avatar: "https://i.pravatar.cc/150?img=39",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 18 min",
    createdAt: "Há 41 min",
  },

  {
    id: "TRP-045",
    from: { name: "Luanda Sul", lat: -8.93, lng: 13.195 },
    to: { name: "Hoji Ya Henda", lat: -8.85, lng: 13.279 },
    status: "completed",
    driver: {
      id: "DRV-013",
      name: "Amadeu Xavier",
      avatar: "https://i.pravatar.cc/150?img=25",
      vehicle: "Toyota Corolla",
      plate: "LD-11-64-RA",
    },
    bookings: [
      {
        id: "BKG-074",
        passenger: {
          id: "PAX-074",
          name: "Palmira Kanda",
          avatar: "https://i.pravatar.cc/150?img=40",
        },
        seats: 2,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-075",
        passenger: {
          id: "PAX-075",
          name: "Guilhermina Sozinho",
          avatar: "https://i.pravatar.cc/150?img=41",
        },
        seats: 2,
        amount: 4100,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 07:48",
    createdAt: "Hoje, 07:15",
  },

  {
    id: "TRP-046",
    from: { name: "Alvalade", lat: -8.821, lng: 13.238 },
    to: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    status: "active",
    driver: {
      id: "DRV-014",
      name: "Ricardino Faife",
      avatar: "https://i.pravatar.cc/150?img=26",
      vehicle: "Hyundai Tucson",
      plate: "LD-38-52-TA",
    },
    bookings: [
      {
        id: "BKG-076",
        passenger: {
          id: "PAX-076",
          name: "Deolinda Massano",
          avatar: "https://i.pravatar.cc/150?img=42",
        },
        seats: 1,
        amount: 3600,
        paymentStatus: "pending",
      },
      {
        id: "BKG-077",
        passenger: {
          id: "PAX-077",
          name: "Wanda Capela",
          avatar: "https://i.pravatar.cc/150?img=43",
        },
        seats: 1,
        amount: 5200,
        paymentStatus: "paid",
      },
      {
        id: "BKG-078",
        passenger: {
          id: "PAX-078",
          name: "Amélia dos Santos",
          avatar: "https://i.pravatar.cc/150?img=45",
        },
        seats: 1,
        amount: 4100,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 6 min",
    createdAt: "Há 31 min",
  },

  {
    id: "TRP-047",
    from: { name: "Palanca", lat: -8.869, lng: 13.263 },
    to: { name: "Morro Bento", lat: -8.875, lng: 13.206 },
    status: "completed",
    driver: {
      id: "DRV-015",
      name: "Ivaldino Cassoma",
      avatar: "https://i.pravatar.cc/150?img=27",
      vehicle: "Nissan Sunny",
      plate: "LD-84-66-VA",
    },
    bookings: [
      {
        id: "BKG-079",
        passenger: {
          id: "PAX-079",
          name: "Sofia Bumba",
          avatar: "https://i.pravatar.cc/150?img=46",
        },
        seats: 2,
        amount: 4500,
        paymentStatus: "paid",
      },
      {
        id: "BKG-080",
        passenger: {
          id: "PAX-080",
          name: "Lurdes Kiala",
          avatar: "https://i.pravatar.cc/150?img=48",
        },
        seats: 2,
        amount: 7600,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 09:42",
    createdAt: "Hoje, 09:12",
  },

  {
    id: "TRP-048",
    from: { name: "Ilha do Cabo", lat: -8.782, lng: 13.235 },
    to: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    status: "active",
    driver: {
      id: "DRV-016",
      name: "Adão Kalunga",
      avatar: "https://i.pravatar.cc/150?img=28",
      vehicle: "Mercedes-Benz Sprinter",
      plate: "LD-77-28-FA",
    },
    bookings: [
      {
        id: "BKG-081",
        passenger: {
          id: "PAX-081",
          name: "Ana Maria",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        seats: 1,
        amount: 6400,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Há 22 min",
    createdAt: "Há 8 min",
  },

  {
    id: "TRP-049",
    from: { name: "Mutamba", lat: -8.814, lng: 13.231 },
    to: { name: "Hoji Ya Henda", lat: -8.85, lng: 13.279 },
    status: "completed",
    driver: {
      id: "DRV-001",
      name: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=11",
      vehicle: "Toyota Corolla",
      plate: "LD-45-23-AB",
    },
    bookings: [
      {
        id: "BKG-082",
        passenger: {
          id: "PAX-082",
          name: "Carlos Pedro",
          avatar: "https://i.pravatar.cc/150?img=33",
        },
        seats: 2,
        amount: 5800,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 10:05",
    createdAt: "Hoje, 09:42",
  },

  {
    id: "TRP-050",
    from: { name: "Rocha Pinto", lat: -8.856, lng: 13.238 },
    to: { name: "Golfe", lat: -8.878, lng: 13.253 },
    status: "completed",
    driver: {
      id: "DRV-002",
      name: "Domingos Bumba",
      avatar: "https://i.pravatar.cc/150?img=12",
      vehicle: "Toyota Hiace",
      plate: "LD-88-12-BC",
    },
    bookings: [
      {
        id: "BKG-083",
        passenger: {
          id: "PAX-083",
          name: "Maria João",
          avatar: "https://i.pravatar.cc/150?img=44",
        },
        seats: 2,
        amount: 4100,
        paymentStatus: "paid",
      },
      {
        id: "BKG-084",
        passenger: {
          id: "PAX-084",
          name: "Pedro António",
          avatar: "https://i.pravatar.cc/150?img=51",
        },
        seats: 2,
        amount: 7600,
        paymentStatus: "paid",
      },
    ],
    departureAt: "Hoje, 08:55",
    createdAt: "Hoje, 08:32",
  },
];
