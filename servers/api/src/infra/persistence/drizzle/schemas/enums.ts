import { pgEnum } from 'drizzle-orm/pg-core';

/* =========================================================
 * AUTH / USER
 * ========================================================= */

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

/* =========================================================
 * DRIVER (pedido para ser motorista + documentos)
 * ========================================================= */

export const driverStatusEnum = pgEnum('driver_status', [
  'PENDING', // pedido submetido, à espera de revisão de documentos
  'ACTIVE',
  'SUSPENDED',
  'BLOCKED',
  'REJECTED',
]);

export const driverDocumentTypeEnum = pgEnum('driver_document_type', [
  'BI',
  'DRIVING_LICENSE',
]);

// Reutilizado tanto por driverDocs como por vehicleDocs
export const documentStatusEnum = pgEnum('document_status', [
  'PENDING',
  'VERIFIED',
  'REJECTED',
  'EXPIRED',
]);

/* =========================================================
 * VEHICLE
 * ========================================================= */

export const vehicleStatusEnum = pgEnum('vehicle_status', [
  'PENDING',
  'ACTIVE',
  'SUSPENDED',
  'BLOCKED',
]);

export const vehicleDocumentTypeEnum = pgEnum('vehicle_document_type', [
  'REGISTRATION', // Documentação do veículo
  'OWNERSHIP_PROOF', // Declaração de Propriedade
]);

/* =========================================================
 * TRIP / BOOKING
 * ========================================================= */

export const tripStatusEnum = pgEnum('trip_status', [
  'DRAFT',
  'PUBLISHED',
  'FULL',
  'IN_PROGRESS',
  'ENDING', // driver emitiu o pedido de fim de viagem (QR code), a aguardar confirmações
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

export const tripEndingStatusEnum = pgEnum('trip_ending_status', [
  'PENDING', // aguardando os passageiros confirmarem
  'COMPLETED', // todos confirmaram, payout já foi feito
  'EXPIRED',
  'CANCELLED',
]);

export const bookingConfirmationMethodEnum = pgEnum(
  'booking_confirmation_method',
  ['QR_CODE', 'MANUAL'],
);

/* =========================================================
 * PAYMENTS / WALLET
 * ========================================================= */

export const paymentMethodEnum = pgEnum('payment_method', [
  'WALLET',
  'TRANSFER',
  'EXPRESS',
  'CASH',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'PENDING',
  'PAID', // capturado / retido pela plataforma, ainda NÃO está com o motorista
  'FAILED',
  'REFUNDED',
]);

export const walletTransactionTypeEnum = pgEnum('wallet_transaction_type', [
  'DEPOSIT', // recarga de crédito feita pelo user
  'PAYMENT', // débito ao pagar uma booking com saldo da wallet
  'EARNING', // crédito ao motorista, gerado no payout do fim da viagem
  'REFUND',
  'WITHDRAWAL',
  'ADJUSTMENT',
]);

/* =========================================================
 * REVIEWS
 * ========================================================= */

export const reviewStatusEnum = pgEnum('review_status', [
  'PENDING',
  'PUBLISHED',
  'HIDDEN',
]);

export const reviewTargetTypeEnum = pgEnum('review_target_type', [
  'DRIVER', // review feita pelo passageiro sobre o motorista
  'PASSENGER', // review feita pelo motorista sobre o passageiro
]);
