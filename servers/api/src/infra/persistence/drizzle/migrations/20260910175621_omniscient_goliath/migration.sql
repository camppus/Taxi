CREATE TYPE "booking_confirmation_method" AS ENUM('QR_CODE', 'MANUAL');--> statement-breakpoint
CREATE TYPE "review_target_type" AS ENUM('DRIVER', 'PASSENGER');--> statement-breakpoint
CREATE TYPE "trip_ending_status" AS ENUM('PENDING', 'COMPLETED', 'EXPIRED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "wallet_transaction_type" AS ENUM('DEPOSIT', 'PAYMENT', 'EARNING', 'REFUND', 'WITHDRAWAL', 'ADJUSTMENT');--> statement-breakpoint
ALTER TYPE "driver_status" ADD VALUE 'REJECTED';--> statement-breakpoint
ALTER TYPE "payment_method" ADD VALUE 'CASH';--> statement-breakpoint
ALTER TYPE "trip_status" ADD VALUE 'ENDING' BEFORE 'COMPLETED';--> statement-breakpoint
CREATE TABLE "booking_confirmations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"trip_ending_id" uuid NOT NULL,
	"booking_id" uuid NOT NULL,
	"method" "booking_confirmation_method" DEFAULT 'QR_CODE'::"booking_confirmation_method" NOT NULL,
	"confirmed_by" uuid NOT NULL,
	"confirmed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"device_key" varchar(255) NOT NULL UNIQUE,
	"platform" varchar(30) NOT NULL,
	"platform_version" varchar(50),
	"device_type" varchar(20),
	"device_model" varchar(100),
	"manufacturer" varchar(100),
	"app_version" varchar(30),
	"browser" varchar(50),
	"browser_version" varchar(30),
	"user_agent" text,
	"ip_address" varchar(45),
	"country" varchar(2),
	"city" varchar(100),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_endings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"trip_id" uuid NOT NULL,
	"initiated_by" uuid NOT NULL,
	"qr_token" varchar(64) NOT NULL UNIQUE,
	"status" "trip_ending_status" DEFAULT 'PENDING'::"trip_ending_status" NOT NULL,
	"total_bookings" integer NOT NULL,
	"confirmed_count" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"trip_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_payouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"trip_ending_id" uuid NOT NULL UNIQUE,
	"trip_id" uuid NOT NULL,
	"driver_id" uuid NOT NULL,
	"gross_amount" numeric(20,2) NOT NULL,
	"platform_fee" numeric(20,2) NOT NULL,
	"driver_amount" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"wallet_transaction_id" uuid UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"device_id" uuid NOT NULL,
	"push_token" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "wallet_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"wallet_id" uuid NOT NULL,
	"type" "wallet_transaction_type" NOT NULL,
	"amount" numeric(20,2) NOT NULL,
	"balance_after" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"booking_id" uuid,
	"payment_id" uuid,
	"trip_payout_id" uuid,
	"reference" varchar(255),
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"balance" numeric(20,2) DEFAULT '0' NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "driver_ledger_entries";--> statement-breakpoint
DROP TABLE "driver_reconciliations";--> statement-breakpoint
DROP TABLE "driver_settlements";--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_booking_id_key";--> statement-breakpoint
DROP INDEX "reviews_reviewer_id_idx";--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "completed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "cancelled_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "driver_docs" ADD COLUMN "reviewed_by" uuid;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "entity_type" varchar(30);--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "entity_id" uuid;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "reviewee_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "target_type" "review_target_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "user_device_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "started_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "completed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "cancelled_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "vehicle_docs" ADD COLUMN "reviewed_by" uuid;--> statement-breakpoint
ALTER TABLE "vehicle_docs" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "vehicle_document_type";--> statement-breakpoint
CREATE TYPE "vehicle_document_type" AS ENUM('REGISTRATION', 'OWNERSHIP_PROOF');--> statement-breakpoint
ALTER TABLE "vehicle_docs" ALTER COLUMN "type" SET DATA TYPE "vehicle_document_type" USING "type"::"vehicle_document_type";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "device_name";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "device_type";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "platform";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "platform_version";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "device_model";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "manufacturer";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "app_version";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "browser";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "browser_version";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "user_agent";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "ip_address";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "country";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "city";--> statement-breakpoint
CREATE INDEX "booking_confirmations_trip_ending_id_idx" ON "booking_confirmations" ("trip_ending_id");--> statement-breakpoint
CREATE INDEX "booking_confirmations_booking_id_idx" ON "booking_confirmations" ("booking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "booking_confirmations_ending_booking_unique_idx" ON "booking_confirmations" ("trip_ending_id","booking_id");--> statement-breakpoint
CREATE INDEX "bookings_status_idx" ON "bookings" ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "driver_docs_driver_id_type_unique_idx" ON "driver_docs" ("driver_id","type");--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_user_id_read_idx" ON "notifications" ("user_id","read");--> statement-breakpoint
CREATE INDEX "reviews_reviewee_id_idx" ON "reviews" ("reviewee_id");--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_booking_id_reviewer_id_unique_idx" ON "reviews" ("booking_id","reviewer_id");--> statement-breakpoint
CREATE INDEX "sessions_user_device_id_idx" ON "sessions" ("user_device_id");--> statement-breakpoint
CREATE INDEX "trip_endings_trip_id_idx" ON "trip_endings" ("trip_id");--> statement-breakpoint
CREATE INDEX "trip_endings_status_idx" ON "trip_endings" ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "trip_endings_trip_id_pending_unique_idx" ON "trip_endings" ("trip_id") WHERE "status" = 'PENDING';--> statement-breakpoint
CREATE INDEX "trip_messages_trip_id_idx" ON "trip_messages" ("trip_id");--> statement-breakpoint
CREATE INDEX "trip_messages_trip_id_created_at_idx" ON "trip_messages" ("trip_id","created_at");--> statement-breakpoint
CREATE INDEX "trip_messages_sender_id_idx" ON "trip_messages" ("sender_id");--> statement-breakpoint
CREATE INDEX "trip_payouts_driver_id_idx" ON "trip_payouts" ("driver_id");--> statement-breakpoint
CREATE INDEX "trip_payouts_trip_id_idx" ON "trip_payouts" ("trip_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_devices_user_device_idx" ON "user_devices" ("user_id","device_id");--> statement-breakpoint
CREATE UNIQUE INDEX "vehicle_docs_vehicle_id_type_unique_idx" ON "vehicle_docs" ("vehicle_id","type");--> statement-breakpoint
CREATE INDEX "wallet_transactions_wallet_id_idx" ON "wallet_transactions" ("wallet_id");--> statement-breakpoint
CREATE INDEX "wallet_transactions_type_idx" ON "wallet_transactions" ("type");--> statement-breakpoint
CREATE INDEX "wallet_transactions_booking_id_idx" ON "wallet_transactions" ("booking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "wallet_transactions_reference_unique_idx" ON "wallet_transactions" ("reference") WHERE "reference" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "wallets_user_id_idx" ON "wallets" ("user_id");--> statement-breakpoint
ALTER TABLE "booking_confirmations" ADD CONSTRAINT "booking_confirmations_trip_ending_id_trip_endings_id_fkey" FOREIGN KEY ("trip_ending_id") REFERENCES "trip_endings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "booking_confirmations" ADD CONSTRAINT "booking_confirmations_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "booking_confirmations" ADD CONSTRAINT "booking_confirmations_confirmed_by_users_id_fkey" FOREIGN KEY ("confirmed_by") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "driver_docs" ADD CONSTRAINT "driver_docs_reviewed_by_users_id_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewee_id_users_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_device_id_user_devices_id_fkey" FOREIGN KEY ("user_device_id") REFERENCES "user_devices"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "trip_endings" ADD CONSTRAINT "trip_endings_trip_id_trips_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trip_endings" ADD CONSTRAINT "trip_endings_initiated_by_drivers_id_fkey" FOREIGN KEY ("initiated_by") REFERENCES "drivers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trip_messages" ADD CONSTRAINT "trip_messages_trip_id_trips_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "trip_messages" ADD CONSTRAINT "trip_messages_sender_id_users_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trip_payouts" ADD CONSTRAINT "trip_payouts_trip_ending_id_trip_endings_id_fkey" FOREIGN KEY ("trip_ending_id") REFERENCES "trip_endings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trip_payouts" ADD CONSTRAINT "trip_payouts_trip_id_trips_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trip_payouts" ADD CONSTRAINT "trip_payouts_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trip_payouts" ADD CONSTRAINT "trip_payouts_wallet_transaction_id_wallet_transactions_id_fkey" FOREIGN KEY ("wallet_transaction_id") REFERENCES "wallet_transactions"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_device_id_devices_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "vehicle_docs" ADD CONSTRAINT "vehicle_docs_reviewed_by_users_id_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_wallet_id_wallets_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
DROP TYPE "driver_ledger_entry_type";--> statement-breakpoint
DROP TYPE "reconciliation_status";