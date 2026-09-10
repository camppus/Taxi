import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  numeric,
  text,
  boolean,
  integer,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import {
  bookingConfirmationMethodEnum,
  bookingStatusEnum,
  challengeChannelEnum,
  challengeContextEnum,
  documentStatusEnum,
  driverDocumentTypeEnum,
  driverStatusEnum,
  paymentMethodEnum,
  paymentStatusEnum,
  reviewStatusEnum,
  reviewTargetTypeEnum,
  tripEndingStatusEnum,
  tripStatusEnum,
  userStatusEnum,
  vehicleDocumentTypeEnum,
  vehicleStatusEnum,
  walletTransactionTypeEnum,
} from './enums.js';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  image: text('image'),

  isAdmin: boolean('is_admin').notNull().default(false),

  name: varchar('name', { length: 255 }).notNull(),

  phone: varchar('phone', { length: 20 }).notNull().unique(),

  status: userStatusEnum('status').notNull().default('ACTIVE'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const locations = pgTable(
  'locations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    latitude: numeric('latitude', { precision: 10, scale: 7 }).notNull(),

    longitude: numeric('longitude', { precision: 10, scale: 7 }).notNull(),

    accuracy: numeric('accuracy', { precision: 8, scale: 2 }),

    heading: numeric('heading', { precision: 6, scale: 2 }),

    speed: numeric('speed', { precision: 8, scale: 2 }),

    recordedAt: timestamp('recorded_at', { withTimezone: true }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('locations_user_id_idx').on(table.userId),
    index('locations_user_id_recorded_at_idx').on(
      table.userId,
      table.recordedAt,
    ),
  ],
);

export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),

  deviceKey: varchar('device_key', {
    length: 255,
  })
    .notNull()
    .unique(),

  platform: varchar('platform', {
    length: 30,
  }).notNull(),

  platformVersion: varchar('platform_version', {
    length: 50,
  }),

  deviceType: varchar('device_type', {
    length: 20,
  }),

  deviceModel: varchar('device_model', {
    length: 100,
  }),

  manufacturer: varchar('manufacturer', {
    length: 100,
  }),

  appVersion: varchar('app_version', {
    length: 30,
  }),

  browser: varchar('browser', {
    length: 50,
  }),

  browserVersion: varchar('browser_version', {
    length: 30,
  }),

  userAgent: text('user_agent'),

  ipAddress: varchar('ip_address', {
    length: 45,
  }),

  country: varchar('country', {
    length: 2,
  }),

  city: varchar('city', {
    length: 100,
  }),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const userDevices = pgTable(
  'user_devices',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    deviceId: uuid('device_id')
      .notNull()
      .references(() => devices.id, {
        onDelete: 'cascade',
      }),

    pushToken: text('push_token'),

    isActive: boolean('is_active').notNull().default(true),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    lastSeenAt: timestamp('last_seen_at', {
      withTimezone: true,
    }),
  },
  (table) => [
    uniqueIndex('user_devices_user_device_idx').on(
      table.userId,
      table.deviceId,
    ),
  ],
);

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userDeviceId: uuid('user_device_id')
      .notNull()
      .references(() => userDevices.id, {
        onDelete: 'cascade',
      }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    isActive: boolean('is_active').notNull().default(true),

    refreshHash: text('refresh_hash').notNull().unique(),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }).notNull(),

    lastUsedAt: timestamp('last_used_at', {
      withTimezone: true,
    }),

    revokedAt: timestamp('revoked_at', {
      withTimezone: true,
    }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('sessions_user_id_idx').on(table.userId),
    index('sessions_user_device_id_idx').on(table.userDeviceId),
    index('sessions_expires_at_idx').on(table.expiresAt),
    index('sessions_active_idx').on(table.isActive),
  ],
);

export const challenges = pgTable(
  'challenges',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    hash: text('hash').notNull(),

    context: challengeContextEnum('context').notNull(),

    channel: challengeChannelEnum('channel').notNull().default('SMS'),

    target: varchar('target', { length: 255 }).notNull(),

    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

    used: boolean('used').notNull().default(false),

    attempts: integer('attempts').notNull().default(0),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('challenges_user_id_idx').on(table.userId),
    index('challenges_expires_at_idx').on(table.expiresAt),
  ],
);

export const driver = pgTable('drivers', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),

  // Criar esta linha É o "pedido para ser motorista".
  // status PENDING até os documentos (driverDocs) serem verificados.
  status: driverStatusEnum('status').notNull().default('PENDING'),

  acceptsPets: boolean('accepts_pets').notNull().default(true),
  allowsMusic: boolean('allows_music').notNull().default(true),
  acceptsCharge: boolean('accepts_charge').notNull().default(true),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const driverDocs = pgTable(
  'driver_docs',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, { onDelete: 'cascade' }),

    type: driverDocumentTypeEnum('type').notNull(), // BI | DRIVING_LICENSE

    documentNumber: varchar('document_number', { length: 100 }),

    fileUrl: text('file_url').notNull(),

    status: documentStatusEnum('status').notNull().default('PENDING'),

    expiresAt: timestamp('expires_at', { withTimezone: true }),

    // Quem (admin) reviu o documento
    reviewedBy: uuid('reviewed_by').references(() => users.id, {
      onDelete: 'restrict',
    }),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    rejectionReason: text('rejection_reason'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('driver_docs_driver_id_idx').on(table.driverId),
    // Um documento de cada tipo por motorista
    uniqueIndex('driver_docs_driver_id_type_unique_idx').on(
      table.driverId,
      table.type,
    ),
  ],
);

export const vehicles = pgTable(
  'vehicles',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, { onDelete: 'cascade' }),

    image: text('image').notNull(),

    plateNumber: varchar('plate_number', { length: 20 }).notNull().unique(),

    brand: varchar('brand', { length: 100 }).notNull(),
    model: varchar('model', { length: 100 }).notNull(),
    color: varchar('color', { length: 50 }).notNull(),
    year: varchar('year', { length: 4 }),

    status: vehicleStatusEnum('status').notNull().default('PENDING'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('vehicles_driver_id_idx').on(table.driverId)],
);

export const vehicleDocs = pgTable(
  'vehicle_docs',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    vehicleId: uuid('vehicle_id')
      .notNull()
      .references(() => vehicles.id, { onDelete: 'cascade' }),

    type: vehicleDocumentTypeEnum('type').notNull(), // REGISTRATION | OWNERSHIP_PROOF

    documentNumber: varchar('document_number', { length: 100 }),

    fileUrl: text('file_url').notNull(),

    status: documentStatusEnum('status').notNull().default('PENDING'),

    expiresAt: timestamp('expires_at', { withTimezone: true }),

    reviewedBy: uuid('reviewed_by').references(() => users.id, {
      onDelete: 'restrict',
    }),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    rejectionReason: text('rejection_reason'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('vehicle_docs_vehicle_id_idx').on(table.vehicleId),
    uniqueIndex('vehicle_docs_vehicle_id_type_unique_idx').on(
      table.vehicleId,
      table.type,
    ),
  ],
);

/* =========================================================
 * TRIP / BOOKING
 * ========================================================= */

export const trips = pgTable(
  'trips',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, { onDelete: 'restrict' }),

    vehicleId: uuid('vehicle_id')
      .notNull()
      .references(() => vehicles.id, { onDelete: 'restrict' }),

    fromName: varchar('from_name', { length: 255 }).notNull(),
    fromLatitude: numeric('from_latitude', {
      precision: 10,
      scale: 7,
    }).notNull(),
    fromLongitude: numeric('from_longitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    toName: varchar('to_name', { length: 255 }).notNull(),
    toLatitude: numeric('to_latitude', {
      precision: 10,
      scale: 7,
    }).notNull(),
    toLongitude: numeric('to_longitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    departureAt: timestamp('departure_at', { withTimezone: true }).notNull(),

    totalSeats: integer('total_seats').notNull(),
    availableSeats: integer('available_seats').notNull(),

    price: numeric('price', { precision: 20, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('AOA'),

    status: tripStatusEnum('status').notNull().default('DRAFT'),

    startedAt: timestamp('started_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('trips_driver_id_idx').on(table.driverId),
    index('trips_vehicle_id_idx').on(table.vehicleId),
    index('trips_status_departure_at_idx').on(table.status, table.departureAt),
  ],
);

export const bookings = pgTable(
  'bookings',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    tripId: uuid('trip_id')
      .notNull()
      .references(() => trips.id, { onDelete: 'restrict' }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    seats: integer('seats').notNull().default(1),

    unitPrice: numeric('unit_price', { precision: 20, scale: 2 }).notNull(),
    totalPrice: numeric('total_price', { precision: 20, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('AOA'),

    status: bookingStatusEnum('status').notNull().default('PENDING'),

    // Preenchido quando esta booking é confirmada no fluxo de endBooking (via QR)
    completedAt: timestamp('completed_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('bookings_trip_id_idx').on(table.tripId),
    index('bookings_user_id_idx').on(table.userId),
    index('bookings_status_idx').on(table.status),
  ],
);

export const wallets = pgTable(
  'wallets',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),

    balance: numeric('balance', { precision: 20, scale: 2 })
      .notNull()
      .default('0'),

    currency: varchar('currency', { length: 3 }).notNull().default('AOA'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('wallets_user_id_idx').on(table.userId)],
);

export const walletTransactions = pgTable(
  'wallet_transactions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    walletId: uuid('wallet_id')
      .notNull()
      .references(() => wallets.id, { onDelete: 'restrict' }),

    type: walletTransactionTypeEnum('type').notNull(),

    // Positivo = crédito (DEPOSIT, EARNING, REFUND) | Negativo = débito (PAYMENT, WITHDRAWAL)
    amount: numeric('amount', { precision: 20, scale: 2 }).notNull(),

    balanceAfter: numeric('balance_after', {
      precision: 20,
      scale: 2,
    }).notNull(),

    currency: varchar('currency', { length: 3 }).notNull().default('AOA'),

    bookingId: uuid('booking_id').references(() => bookings.id, {
      onDelete: 'restrict',
    }),

    paymentId: uuid('payment_id'),
    tripPayoutId: uuid('trip_payout_id'),

    // Referência externa (ex.: id da transação Multicaixa Express) — usada para idempotência de deposits
    reference: varchar('reference', { length: 255 }),

    description: text('description'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('wallet_transactions_wallet_id_idx').on(table.walletId),
    index('wallet_transactions_type_idx').on(table.type),
    index('wallet_transactions_booking_id_idx').on(table.bookingId),
    uniqueIndex('wallet_transactions_reference_unique_idx')
      .on(table.reference)
      .where(sql`${table.reference} IS NOT NULL`),
  ],
);

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    bookingId: uuid('booking_id')
      .notNull()
      .references(() => bookings.id, { onDelete: 'restrict' }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    grossAmount: numeric('gross_amount', {
      precision: 20,
      scale: 2,
    }).notNull(),

    platformFee: numeric('platform_fee', { precision: 20, scale: 2 })
      .notNull()
      .default('0'),
    platformFeeRate: numeric('platform_fee_rate', { precision: 7, scale: 4 })
      .notNull()
      .default('0'),

    // Parte estimada do motorista — o valor real só é efetivamente
    // creditado (wallet) através do tripPayouts, no endBooking.
    driverAmount: numeric('driver_amount', { precision: 20, scale: 2 })
      .notNull()
      .default('0'),

    currency: varchar('currency', { length: 3 }).notNull().default('AOA'),

    method: paymentMethodEnum('method').notNull(),

    status: paymentStatusEnum('status').notNull().default('PENDING'),

    // O pagamento canónico bem-sucedido da booking (permite retries)
    isDefault: boolean('is_default').notNull().default(false),

    // Só relevante para providers externos (TRANSFER / EXPRESS). NULL para CASH/WALLET.
    providerReference: varchar('provider_reference', { length: 255 }),

    paidAt: timestamp('paid_at', { withTimezone: true }),
    failedAt: timestamp('failed_at', { withTimezone: true }),
    refundedAt: timestamp('refunded_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('payments_booking_id_idx').on(table.bookingId),
    index('payments_user_id_idx').on(table.userId),
    index('payments_status_idx').on(table.status),
    index('payments_method_idx').on(table.method),

    uniqueIndex('payments_provider_reference_unique_idx')
      .on(table.providerReference)
      .where(sql`${table.providerReference} IS NOT NULL`),

    uniqueIndex('payments_booking_id_default_unique_idx')
      .on(table.bookingId)
      .where(sql`${table.isDefault} = true`),
  ],
);

export const tripEndings = pgTable(
  'trip_endings',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    tripId: uuid('trip_id')
      .notNull()
      .references(() => trips.id, { onDelete: 'restrict' }),

    initiatedBy: uuid('initiated_by')
      .notNull()
      .references(() => driver.id, { onDelete: 'restrict' }),

    // Token embutido no QR code que os passageiros escaneiam
    qrToken: varchar('qr_token', { length: 64 }).notNull().unique(),

    status: tripEndingStatusEnum('status').notNull().default('PENDING'),

    // Snapshot do nº de bookings ativas (CONFIRMED) no momento da emissão
    totalBookings: integer('total_bookings').notNull(),
    confirmedCount: integer('confirmed_count').notNull().default(0),

    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('trip_endings_trip_id_idx').on(table.tripId),
    index('trip_endings_status_idx').on(table.status),
    // Só pode existir um tripEnding PENDING por trip de cada vez
    uniqueIndex('trip_endings_trip_id_pending_unique_idx')
      .on(table.tripId)
      .where(sql`${table.status} = 'PENDING'`),
  ],
);

export const bookingConfirmations = pgTable(
  'booking_confirmations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    tripEndingId: uuid('trip_ending_id')
      .notNull()
      .references(() => tripEndings.id, { onDelete: 'restrict' }),

    bookingId: uuid('booking_id')
      .notNull()
      .references(() => bookings.id, { onDelete: 'restrict' }),

    method: bookingConfirmationMethodEnum('method')
      .notNull()
      .default('QR_CODE'),

    // Normalmente o próprio passageiro; pode ser um admin em confirmação manual
    confirmedBy: uuid('confirmed_by')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    confirmedAt: timestamp('confirmed_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('booking_confirmations_trip_ending_id_idx').on(table.tripEndingId),
    index('booking_confirmations_booking_id_idx').on(table.bookingId),
    // Idempotência: a mesma booking não pode confirmar 2x o mesmo tripEnding
    uniqueIndex('booking_confirmations_ending_booking_unique_idx').on(
      table.tripEndingId,
      table.bookingId,
    ),
  ],
);

export const tripPayouts = pgTable(
  'trip_payouts',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    // Unique -> garante que cada tripEnding só gera 1 payout (idempotência)
    tripEndingId: uuid('trip_ending_id')
      .notNull()
      .unique()
      .references(() => tripEndings.id, { onDelete: 'restrict' }),

    tripId: uuid('trip_id')
      .notNull()
      .references(() => trips.id, { onDelete: 'restrict' }),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, { onDelete: 'restrict' }),

    grossAmount: numeric('gross_amount', {
      precision: 20,
      scale: 2,
    }).notNull(),
    platformFee: numeric('platform_fee', {
      precision: 20,
      scale: 2,
    }).notNull(),
    driverAmount: numeric('driver_amount', {
      precision: 20,
      scale: 2,
    }).notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('AOA'),

    // Transação de crédito criada na wallet do motorista
    walletTransactionId: uuid('wallet_transaction_id')
      .unique()
      .references(() => walletTransactions.id, { onDelete: 'restrict' }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('trip_payouts_driver_id_idx').on(table.driverId),
    index('trip_payouts_trip_id_idx').on(table.tripId),
  ],
);

export const tripMessages = pgTable(
  'trip_messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    tripId: uuid('trip_id')
      .notNull()
      .references(() => trips.id, { onDelete: 'cascade' }),

    senderId: uuid('sender_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    content: text('content').notNull(),

    readAt: timestamp('read_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('trip_messages_trip_id_idx').on(table.tripId),
    index('trip_messages_trip_id_created_at_idx').on(
      table.tripId,
      table.createdAt,
    ),
    index('trip_messages_sender_id_idx').on(table.senderId),
  ],
);

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    bookingId: uuid('booking_id')
      .notNull()
      .references(() => bookings.id, { onDelete: 'restrict' }),

    reviewerId: uuid('reviewer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    revieweeId: uuid('reviewee_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    // DRIVER = passageiro avaliando o motorista | PASSENGER = motorista avaliando o passageiro
    targetType: reviewTargetTypeEnum('target_type').notNull(),

    rating: integer('rating').notNull(),

    comment: text('comment'),

    status: reviewStatusEnum('status').notNull().default('PENDING'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('reviews_reviewee_id_idx').on(table.revieweeId),
    // Cada lado só pode avaliar 1x por booking
    uniqueIndex('reviews_booking_id_reviewer_id_unique_idx').on(
      table.bookingId,
      table.reviewerId,
    ),
  ],
);

export const notifications = pgTable(
  'notifications',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),

    read: boolean('read').notNull().default(false),

    content: text('content').notNull(),

    isReminder: boolean('is_reminder').notNull().default(false),

    // Deep-link opcional para a entidade relacionada (trip, booking, payment, etc.)
    entityType: varchar('entity_type', { length: 30 }),
    entityId: uuid('entity_id'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('notifications_user_id_idx').on(table.userId),
    index('notifications_user_id_read_idx').on(table.userId, table.read),
  ],
);