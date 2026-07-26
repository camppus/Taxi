-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PASSENGER', 'DRIVER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'PENDING', 'SUSPENDED', 'BLOCKED', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DriverRequestStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'AVAILABLE', 'FULL', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'PENDING_PAYMENT', 'AWAITING_CONFIRMATION', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'IN_TRIP', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'BOOKING', 'PAYMENT', 'TRIP', 'CHAT', 'REMINDER');

-- CreateEnum
CREATE TYPE "RatingTarget" AS ENUM ('DRIVER', 'PASSENGER');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('OPEN', 'IN_REVIEW', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ReportTarget" AS ENUM ('DRIVER', 'PASSENGER');

-- CreateEnum
CREATE TYPE "DriverDocumentType" AS ENUM ('ID_CARD', 'DRIVER_LICENSE', 'SELFIE', 'PROFILE_PHOTO', 'POLICE_RECORD', 'MEDICAL_CERTIFICATE');

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('ONLINE', 'OFFLINE', 'SUSPENDED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StopType" AS ENUM ('PICK', 'DROP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PASSENGER',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "fullName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "photoUrl" TEXT,
    "emergencyPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestStatus" "DriverRequestStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "licenseCategory" TEXT,
    "identityNumber" TEXT,
    "licenseNumber" TEXT NOT NULL,
    "licenseExpiry" TIMESTAMP(3),
    "status" "DriverStatus" NOT NULL DEFAULT 'OFFLINE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverDocument" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "type" "DriverDocumentType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT,
    "vehicleTypeId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "passengerSeats" INTEGER NOT NULL,
    "status" "VehicleStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleDocument" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "accuracy" DOUBLE PRECISION,
    "formattedAddress" TEXT,
    "externalId" TEXT,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Angola',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "name" TEXT,
    "originId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "distanceKm" DOUBLE PRECISION,
    "estimatedMinutes" INTEGER,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "publishedSeats" INTEGER NOT NULL,
    "priceBase" DECIMAL(10,2) NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripStop" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "StopType" NOT NULL,
    "distanceFromStart" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "seats" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(10,2) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" TEXT NOT NULL,
    "transactionId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverLocation" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "heading" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'SENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTPCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTPCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "target" "RatingTarget" NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReport" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reportedUserId" TEXT NOT NULL,
    "bookingId" TEXT,
    "target" "ReportTarget" NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "DriverProfile_userId_key" ON "DriverProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverProfile_identityNumber_key" ON "DriverProfile"("identityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "DriverProfile_licenseNumber_key" ON "DriverProfile"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "DriverDocument_driverId_type_key" ON "DriverDocument"("driverId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plateNumber_key" ON "Vehicle"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDocument_vehicleId_type_key" ON "VehicleDocument"("vehicleId", "type");

-- CreateIndex
CREATE INDEX "Location_latitude_longitude_idx" ON "Location"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Location_city_idx" ON "Location"("city");

-- CreateIndex
CREATE INDEX "Location_neighborhood_idx" ON "Location"("neighborhood");

-- CreateIndex
CREATE INDEX "Trip_departureDate_status_idx" ON "Trip"("departureDate", "status");

-- CreateIndex
CREATE UNIQUE INDEX "TripStop_tripId_order_key" ON "TripStop"("tripId", "order");

-- CreateIndex
CREATE INDEX "Booking_tripId_status_idx" ON "Booking"("tripId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");

-- CreateIndex
CREATE INDEX "DriverLocation_tripId_createdAt_idx" ON "DriverLocation"("tripId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_bookingId_key" ON "Conversation"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_bookingId_fromUserId_key" ON "Rating"("bookingId", "fromUserId");

-- AddForeignKey
ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverDocument" ADD CONSTRAINT "DriverDocument_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleDocument" ADD CONSTRAINT "VehicleDocument_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripStop" ADD CONSTRAINT "TripStop_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripStop" ADD CONSTRAINT "TripStop_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripStop" ADD CONSTRAINT "TripStop_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverLocation" ADD CONSTRAINT "DriverLocation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OTPCode" ADD CONSTRAINT "OTPCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReport" ADD CONSTRAINT "UserReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReport" ADD CONSTRAINT "UserReport_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReport" ADD CONSTRAINT "UserReport_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
