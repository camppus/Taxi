CREATE TYPE "driver_ledger_entry_type" AS ENUM('INCOME', 'OUTCOME');--> statement-breakpoint
CREATE TYPE "reconciliation_status" AS ENUM('PENDING', 'RECONCILED', 'PARTIALLY_SETTLED', 'SETTLED', 'DISPUTED');--> statement-breakpoint
CREATE TABLE "driver_ledger_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"driver_id" uuid NOT NULL,
	"payment_id" uuid,
	"booking_id" uuid,
	"type" "driver_ledger_entry_type" NOT NULL,
	"amount" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"description" text,
	"reference" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "driver_reconciliations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"driver_id" uuid NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"gross_amount" numeric(20,2) NOT NULL,
	"platform_fee" numeric(20,2) NOT NULL,
	"driver_amount" numeric(20,2) NOT NULL,
	"settled_amount" numeric(20,2) DEFAULT '0' NOT NULL,
	"outstanding_amount" numeric(20,2) DEFAULT '0' NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"status" "reconciliation_status" DEFAULT 'PENDING'::"reconciliation_status" NOT NULL,
	"reconciled_at" timestamp with time zone,
	"settled_at" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "driver_settlements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"driver_id" uuid NOT NULL,
	"amount" numeric(20,2) NOT NULL,
	"currency" varchar(3) DEFAULT 'AOA' NOT NULL,
	"method" varchar(30) DEFAULT 'CASH' NOT NULL,
	"confirmed_by" uuid,
	"reference" varchar(255),
	"notes" text,
	"settled_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "wallets";--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "is_reminder" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "gross_amount" numeric(20,2) NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "platform_fee" numeric(20,2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "platform_fee_rate" numeric(7,4) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "driver_amount" numeric(20,2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "failed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "refunded_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN "reminder";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "amount";--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "read" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_admin" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "challenges_expires_at_idx" ON "challenges" ("expires_at");--> statement-breakpoint
CREATE INDEX "driver_ledger_driver_id_idx" ON "driver_ledger_entries" ("driver_id");--> statement-breakpoint
CREATE INDEX "driver_ledger_payment_id_idx" ON "driver_ledger_entries" ("payment_id");--> statement-breakpoint
CREATE INDEX "driver_ledger_booking_id_idx" ON "driver_ledger_entries" ("booking_id");--> statement-breakpoint
CREATE INDEX "driver_ledger_type_idx" ON "driver_ledger_entries" ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "driver_ledger_reference_unique_idx" ON "driver_ledger_entries" ("reference") WHERE "reference" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "driver_reconciliation_driver_id_idx" ON "driver_reconciliations" ("driver_id");--> statement-breakpoint
CREATE INDEX "driver_reconciliation_status_idx" ON "driver_reconciliations" ("status");--> statement-breakpoint
CREATE INDEX "driver_reconciliation_period_idx" ON "driver_reconciliations" ("period_start","period_end");--> statement-breakpoint
CREATE INDEX "driver_settlements_driver_id_idx" ON "driver_settlements" ("driver_id");--> statement-breakpoint
CREATE INDEX "driver_settlements_settled_at_idx" ON "driver_settlements" ("settled_at");--> statement-breakpoint
CREATE UNIQUE INDEX "driver_settlements_reference_unique_idx" ON "driver_settlements" ("reference") WHERE "reference" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "payments_status_idx" ON "payments" ("status");--> statement-breakpoint
CREATE INDEX "payments_method_idx" ON "payments" ("method");--> statement-breakpoint
CREATE UNIQUE INDEX "payments_provider_reference_unique_idx" ON "payments" ("provider_reference") WHERE "provider_reference" IS NOT NULL;--> statement-breakpoint
ALTER TABLE "driver_ledger_entries" ADD CONSTRAINT "driver_ledger_entries_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "driver_ledger_entries" ADD CONSTRAINT "driver_ledger_entries_payment_id_payments_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "driver_ledger_entries" ADD CONSTRAINT "driver_ledger_entries_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "driver_reconciliations" ADD CONSTRAINT "driver_reconciliations_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "driver_settlements" ADD CONSTRAINT "driver_settlements_driver_id_drivers_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "driver_settlements" ADD CONSTRAINT "driver_settlements_confirmed_by_users_id_fkey" FOREIGN KEY ("confirmed_by") REFERENCES "users"("id") ON DELETE RESTRICT;