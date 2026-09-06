ALTER TABLE "sessions" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "device_type" varchar(20);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "platform" varchar(30);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "platform_version" varchar(50);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "device_model" varchar(100);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "manufacturer" varchar(100);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "app_version" varchar(30);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "browser" varchar(50);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "browser_version" varchar(30);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "country" varchar(2);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "last_used_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "device_id";--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" ("expires_at");--> statement-breakpoint
CREATE INDEX "sessions_active_idx" ON "sessions" ("is_active");