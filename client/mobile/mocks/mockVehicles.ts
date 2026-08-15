import {
  Vehicle,
  VehicleDocument,
  VehicleDocumentTypeDto,
} from "@/types/Vehicle";

const createDocuments = (
  id: string,
  registration: string,
  insurance: string,
  inspection: string,
  photo: string,
): Record<VehicleDocumentTypeDto, VehicleDocument> => ({
  REGISTRATION: {
    id: `${id}-registration`,
    type: VehicleDocumentTypeDto.REGISTRATION,
    fileUrl: [registration],
    expiresAt: new Date("2027-12-31"),
  },

  INSURANCE: {
    id: `${id}-insurance`,
    type: VehicleDocumentTypeDto.INSURANCE,
    fileUrl: [insurance],
    expiresAt: new Date("2027-06-30"),
  },

  INSPECTION: {
    id: `${id}-inspection`,
    type: VehicleDocumentTypeDto.INSPECTION,
    fileUrl: [inspection],
    expiresAt: new Date("2027-03-31"),
  },

  PHOTO: {
    id: `${id}-photo`,
    type: VehicleDocumentTypeDto.PHOTO,
    fileUrl: [photo],
  },
});

export const mockVehicles: Vehicle[] = [
  {
    id: "vehicle-001",
    name: "Toyota Corolla Branco",
    description: "Sedan confortável e climatizado para viagens urbanas.",
    vehicleTypeId: "sedan",

    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027",

    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    color: "Branco",
    plateNumber: "LD-45-82-AB",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "PETROL",
    transmission: "AUTOMATIC",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-07-12"),

    document: createDocuments(
      "vehicle-001",
      "https://example.com/documents/v1-registration.pdf",
      "https://example.com/documents/v1-insurance.pdf",
      "https://example.com/documents/v1-inspection.pdf",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027",
    ),

    createdAt: new Date("2026-06-10"),
    updatedAt: new Date("2026-08-10"),
  },

  {
    id: "vehicle-002",
    name: "Hyundai Tucson Cinza",
    description: "SUV espaçoso, confortável e ideal para viagens longas.",
    vehicleTypeId: "suv",

    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",

    brand: "Hyundai",
    model: "Tucson",
    year: 2021,
    color: "Cinza",
    plateNumber: "LD-72-19-CD",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "DIESEL",
    transmission: "AUTOMATIC",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-07-18"),

    document: createDocuments(
      "vehicle-002",
      "https://example.com/documents/v2-registration.pdf",
      "https://example.com/documents/v2-insurance.pdf",
      "https://example.com/documents/v2-inspection.pdf",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
    ),

    createdAt: new Date("2026-05-20"),
    updatedAt: new Date("2026-08-11"),
  },

  {
    id: "vehicle-003",
    name: "Toyota Hiace Prata",
    description: "Carrinha de passageiros para viagens partilhadas.",
    vehicleTypeId: "van",

    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",

    brand: "Toyota",
    model: "Hiace",
    year: 2020,
    color: "Prata",
    plateNumber: "LD-18-54-EF",

    totalSeats: 15,
    passengerSeats: 14,

    fuelType: "DIESEL",
    transmission: "MANUAL",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-06-28"),

    document: createDocuments(
      "vehicle-003",
      "https://example.com/documents/v3-registration.pdf",
      "https://example.com/documents/v3-insurance.pdf",
      "https://example.com/documents/v3-inspection.pdf",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    ),

    createdAt: new Date("2026-04-11"),
    updatedAt: new Date("2026-08-09"),
  },

  {
    id: "vehicle-004",
    name: "Kia Sportage Preto",
    description: "SUV moderno com ar condicionado e excelente conforto.",
    vehicleTypeId: "suv",

    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",

    brand: "Kia",
    model: "Sportage",
    year: 2023,
    color: "Preto",
    plateNumber: "LD-91-27-GH",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "HYBRID",
    transmission: "AUTOMATIC",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-07-02"),

    document: createDocuments(
      "vehicle-004",
      "https://example.com/documents/v4-registration.pdf",
      "https://example.com/documents/v4-insurance.pdf",
      "https://example.com/documents/v4-inspection.pdf",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
    ),

    createdAt: new Date("2026-06-03"),
    updatedAt: new Date("2026-08-12"),
  },

  {
    id: "vehicle-005",
    name: "Toyota Yaris Azul",
    description: "Compacto, económico e adequado para deslocações urbanas.",
    vehicleTypeId: "hatchback",

    imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753",

    brand: "Toyota",
    model: "Yaris",
    year: 2022,
    color: "Azul",
    plateNumber: "LD-63-41-IJ",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "PETROL",
    transmission: "AUTOMATIC",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-07-09"),

    document: createDocuments(
      "vehicle-005",
      "https://example.com/documents/v5-registration.pdf",
      "https://example.com/documents/v5-insurance.pdf",
      "https://example.com/documents/v5-inspection.pdf",
      "https://images.unsplash.com/photo-1542362567-b07e54358753",
    ),

    createdAt: new Date("2026-05-15"),
    updatedAt: new Date("2026-08-13"),
  },

  {
    id: "vehicle-006",
    name: "Hyundai i10 Vermelho",
    description: "Veículo compacto e económico para viagens dentro da cidade.",
    vehicleTypeId: "hatchback",

    imageUrl: "https://images.unsplash.com/photo-1551830820-330a71b99659",

    brand: "Hyundai",
    model: "i10",
    year: 2022,
    color: "Vermelho",
    plateNumber: "LD-88-21-KL",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "PETROL",
    transmission: "MANUAL",

    status: "PENDING_VERIFICATION",
    isVerified: false,

    document: createDocuments(
      "vehicle-006",
      "https://example.com/documents/v6-registration.pdf",
      "https://example.com/documents/v6-insurance.pdf",
      "https://example.com/documents/v6-inspection.pdf",
      "https://images.unsplash.com/photo-1551830820-330a71b99659",
    ),

    createdAt: new Date("2026-08-01"),
    updatedAt: new Date("2026-08-14"),
  },

  {
    id: "vehicle-007",
    name: "Kia Picanto Branco",
    description: "Citadino compacto, económico e fácil de conduzir.",
    vehicleTypeId: "hatchback",

    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a",

    brand: "Kia",
    model: "Picanto",
    year: 2019,
    color: "Branco",
    plateNumber: "LD-34-56-MN",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "PETROL",
    transmission: "MANUAL",

    status: "INACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-05-10"),

    document: createDocuments(
      "vehicle-007",
      "https://example.com/documents/v7-registration.pdf",
      "https://example.com/documents/v7-insurance.pdf",
      "https://example.com/documents/v7-inspection.pdf",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    ),

    createdAt: new Date("2026-03-18"),
    updatedAt: new Date("2026-08-01"),
  },

  {
    id: "vehicle-008",
    name: "Toyota RAV4 Preto",
    description: "SUV confortável para deslocações urbanas e interurbanas.",
    vehicleTypeId: "suv",

    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",

    brand: "Toyota",
    model: "RAV4",
    year: 2021,
    color: "Preto",
    plateNumber: "LD-41-73-OP",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "HYBRID",
    transmission: "AUTOMATIC",

    status: "SUSPENDED",
    isVerified: true,
    verifiedAt: new Date("2026-06-15"),

    document: createDocuments(
      "vehicle-008",
      "https://example.com/documents/v8-registration.pdf",
      "https://example.com/documents/v8-insurance.pdf",
      "https://example.com/documents/v8-inspection.pdf",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    ),

    createdAt: new Date("2026-04-25"),
    updatedAt: new Date("2026-08-14"),
  },

  {
    id: "vehicle-009",
    name: "Mercedes-Benz Sprinter Branca",
    description: "Minibus espaçoso para grupos e viagens partilhadas.",
    vehicleTypeId: "minibus",

    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",

    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2022,
    color: "Branco",
    plateNumber: "LD-57-84-QR",

    totalSeats: 15,
    passengerSeats: 14,

    fuelType: "DIESEL",
    transmission: "MANUAL",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-06-21"),

    document: createDocuments(
      "vehicle-009",
      "https://example.com/documents/v9-registration.pdf",
      "https://example.com/documents/v9-insurance.pdf",
      "https://example.com/documents/v9-inspection.pdf",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
    ),

    createdAt: new Date("2026-05-02"),
    updatedAt: new Date("2026-08-10"),
  },

  {
    id: "vehicle-010",
    name: "Honda Civic Cinza",
    description: "Sedan moderno, silencioso e confortável.",
    vehicleTypeId: "sedan",

    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",

    brand: "Honda",
    model: "Civic",
    year: 2023,
    color: "Cinza",
    plateNumber: "LD-62-95-ST",

    totalSeats: 5,
    passengerSeats: 4,

    fuelType: "PETROL",
    transmission: "AUTOMATIC",

    status: "ACTIVE",
    isVerified: true,
    verifiedAt: new Date("2026-07-25"),

    document: createDocuments(
      "vehicle-010",
      "https://example.com/documents/v10-registration.pdf",
      "https://example.com/documents/v10-insurance.pdf",
      "https://example.com/documents/v10-inspection.pdf",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    ),

    createdAt: new Date("2026-06-19"),
    updatedAt: new Date("2026-08-13"),
  },
];
