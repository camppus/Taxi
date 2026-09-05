CREATE TYPE "booking_status" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'REJECTED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "challenge_channel" AS ENUM('SMS');--> statement-breakpoint
CREATE TYPE "challenge_context" AS ENUM('LOGIN', 'UPDATE_PHONE');--> statement-breakpoint
CREATE TYPE "document_status" AS ENUM('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "driver_document_type" AS ENUM('BI', 'DRIVING_LICENSE');--> statement-breakpoint
CREATE TYPE "driver_status" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'BLOCKED');--> statement-breakpoint
CREATE TYPE "payment_method" AS ENUM('WALLET', 'TRANSFER', 'EXPRESS');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "review_status" AS ENUM('PENDING', 'PUBLISHED', 'HIDDEN');--> statement-breakpoint
CREATE TYPE "trip_status" AS ENUM('DRAFT', 'PUBLISHED', 'FULL', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "user_status" AS ENUM('ACTIVE', 'SUSPENDED', 'BLOCKED');--> statement-breakpoint
CREATE TYPE "vehicle_document_type" AS ENUM('VEHICLE_REGISTRATION', 'OWNERSHIP_PROOF', 'INSURANCE', 'INSPECTION', 'TAXI_LICENSE');--> statement-breakpoint
CREATE TYPE "vehicle_status" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'BLOCKED');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"trip_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"seats" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric(20,2) NOT NULL,
	"total_price" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING'::"booking_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"hash" text NOT NULL,
	"context" "challenge_context" NOT NULL,
	"channel" "challenge_channel" DEFAULT 'SMS'::"challenge_channel" NOT NULL,
	"target" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"status" "driver_status" DEFAULT 'PENDING'::"driver_status" NOT NULL,
	"accepts_pets" boolean DEFAULT true NOT NULL,
	"allows_music" boolean DEFAULT true NOT NULL,
	"accepts_charge" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "driver_docs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"driver_id" uuid NOT NULL,
	"type" "driver_document_type" NOT NULL,
	"document_number" varchar(100),
	"file_url" text NOT NULL,
	"status" "document_status" DEFAULT 'PENDING'::"document_status" NOT NULL,
	"expires_at" timestamp with time zone,
	"verified_at" timestamp with time zone,
	"rejection_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"latitude" numeric(10,7) NOT NULL,
	"longitude" numeric(10,7) NOT NULL,
	"accuracy" numeric(8,2),
	"heading" numeric(6,2),
	"speed" numeric(8,2),
	"recorded_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"read" boolean DEFAULT false,
	"content" text,
	"reminder" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"booking_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"method" "payment_method" NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING'::"payment_status" NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"provider_reference" varchar(255),
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"booking_id" uuid NOT NULL UNIQUE,
	"reviewer_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"status" "review_status" DEFAULT 'PENDING'::"review_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"refresh_hash" text NOT NULL UNIQUE,
	"device_id" varchar(255),
	"device_name" varchar(100),
	"user_agent" text,
	"ip_address" varchar(45),
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"driver_id" uuid NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"from_name" varchar(255) NOT NULL,
	"from_latitude" numeric(10,7) NOT NULL,
	"from_longitude" numeric(10,7) NOT NULL,
	"to_name" varchar(255) NOT NULL,
	"to_latitude" numeric(10,7) NOT NULL,
	"to_longitude" numeric(10,7) NOT NULL,
	"departure_at" timestamp with time zone NOT NULL,
	"total_seats" integer NOT NULL,
	"available_seats" integer NOT NULL,
	"price" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"status" "trip_status" DEFAULT 'DRAFT'::"trip_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_docs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vehicle_id" uuid NOT NULL,
	"type" "vehicle_document_type" NOT NULL,
	"document_number" varchar(100),
	"file_url" text NOT NULL,
	"status" "document_status" DEFAULT 'PENDING'::"document_status" NOT NULL,
	"expires_at" timestamp with time zone,
	"verified_at" timestamp with time zone,
	"rejection_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"driver_id" uuid NOT NULL,
	"image" text NOT NULL,
	"plate_number" varchar(20) NOT NULL UNIQUE,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"color" varchar(50) NOT NULL,
	"year" varchar(4),
	"status" "vehicle_status" DEFAULT 'PENDING'::"vehicle_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"balance" numeric(20,2) DEFAULT '0' NOT NULL,
	"prev_balance" numeric(20,2) DEFAULT '0' NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_key";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_admin" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "user_status" DEFAULT 'ACTIVE'::"user_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_key" UNIQUE("phone");--> statement-breakpoint
CREATE INDEX "bookings_trip_id_idx" ON "bookings" ("trip_id");--> statement-breakpoint
CREATE INDEX "bookings_user_id_idx" ON "bookings" ("user_id");--> statement-breakpoint
CREATE INDEX "challenges_user_id_idx" ON "challenges" ("user_id");--> statement-breakpoint
CREATE INDEX "driver_docs_driver_id_idx" ON "driver_docs" ("driver_id");--> statement-breakpoint
CREATE INDEX "locations_user_id_idx" ON "locations" ("user_id");--> statement-breakpoint
CREATE INDEX "locations_user_id_recorded_at_idx" ON "locations" ("user_id","recorded_at");--> statement-breakpoint
CREATE INDEX "payments_booking_id_idx" ON "payments" ("booking_id");--> statement-breakpoint
CREATE INDEX "payments_user_id_idx" ON "payments" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "payments_booking_id_default_unique_idx" ON "payments" ("booking_id") WHERE "is_default" = true;--> statement-breakpoint
CREATE INDEX "reviews_reviewer_id_idx" ON "reviews" ("reviewer_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "trips_driver_id_idx" ON "trips" ("driver_id");--> statement-breakpoint
CREATE INDEX "trips_vehicle_id_idx" ON "trips" ("vehicle_id");--> statement-breakpoint
CREATE INDEX "trips_status_departure_at_idx" ON "trips" ("status","departure_at");--> statement-breakpoint
CREATE INDEX "vehicle_docs_vehicle_id_idx" ON "vehicle_docs" ("vehicle_id");--> statement-breakpoint
CREATE INDEX "vehicles_driver_id_idx" ON "vehicles" ("driver_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_trip_id_trips_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "driver_docs" ADD CONSTRAINT "driver_docs_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_users_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_vehicle_id_vehicles_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "vehicle_docs" ADD CONSTRAINT "vehicle_docs_vehicle_id_vehicles_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;