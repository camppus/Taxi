import { pgEnum } from 'drizzle-orm/pg-core';

export const tripStatusEnum = pgEnum('trip_status', [
  'DRAFT',
  'PUBLISHED',
  'FULL',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
]);

export const bookingStatusEnum = pgEnum('booking_status', [
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'REJECTED',
  'COMPLETED',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'PENDING',
  'PAID',
  'FAILED',
  'REFUNDED',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'WALLET',
  'TRANSFER',
  'EXPRESS',
]);

export const reviewStatusEnum = pgEnum('review_status', [
  'PENDING',
  'PUBLISHED',
  'HIDDEN',
]);

export const userStatusEnum = pgEnum('user_status', [
  'ACTIVE',
  'SUSPENDED',
  'BLOCKED',
]);

export const challengeContextEnum = pgEnum('challenge_context', [
  'LOGIN',
  'UPDATE_PHONE',
]);
export const challengeChannelEnum = pgEnum('challenge_channel', ['SMS']);

export const driverStatusEnum = pgEnum('driver_status', [
  'PENDING',
  'ACTIVE',
  'SUSPENDED',
  'BLOCKED',
]);

export const driverDocumentTypeEnum = pgEnum('driver_document_type', [
  'BI',
  'DRIVING_LICENSE',
]);

export const documentStatusEnum = pgEnum('document_status', [
  'PENDING',
  'VERIFIED',
  'REJECTED',
  'EXPIRED',
]);

export const vehicleDocumentTypeEnum = pgEnum('vehicle_document_type', [
  'VEHICLE_REGISTRATION',
  'OWNERSHIP_PROOF',
  'INSURANCE',
  'INSPECTION',
  'TAXI_LICENSE',
]);

export const vehicleStatusEnum = pgEnum('vehicle_status', [
  'PENDING',
  'ACTIVE',
  'SUSPENDED',
  'BLOCKED',
]);
