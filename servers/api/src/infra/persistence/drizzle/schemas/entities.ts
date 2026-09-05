import { sql } from 'drizzle-orm';
import {
  pgEnum,
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
  bookingStatusEnum,
  challengeChannelEnum,
  challengeContextEnum,
  documentStatusEnum,
  driverDocumentTypeEnum,
  driverStatusEnum,
  paymentMethodEnum,
  paymentStatusEnum,
  reviewStatusEnum,
  tripStatusEnum,
  userStatusEnum,
  vehicleDocumentTypeEnum,
  vehicleStatusEnum,
} from './enums.js';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  image: text('image').notNull(),
  isAdmin: boolean('is_admin').default(false),
  name: varchar('name', {
    length: 255,
  }).notNull(),

  phone: varchar('phone', {
    length: 20,
  })
    .notNull()
    .unique(),

  status: userStatusEnum('status').notNull().default('ACTIVE'),

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

export const locations = pgTable(
  'locations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    latitude: numeric('latitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    longitude: numeric('longitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    accuracy: numeric('accuracy', {
      precision: 8,
      scale: 2,
    }),

    heading: numeric('heading', {
      precision: 6,
      scale: 2,
    }),

    speed: numeric('speed', {
      precision: 8,
      scale: 2,
    }),

    recordedAt: timestamp('recorded_at', {
      withTimezone: true,
    }).notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
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

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    refreshHash: text('refresh_hash').notNull().unique(),

    deviceId: varchar('device_id', {
      length: 255,
    }),

    deviceName: varchar('device_name', {
      length: 100,
    }),

    userAgent: text('user_agent'),

    ipAddress: varchar('ip_address', {
      length: 45,
    }),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }).notNull(),

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
  (table) => [index('sessions_user_id_idx').on(table.userId)],
);

export const challenges = pgTable(
  'challenges',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    hash: text('hash').notNull(),
    context: challengeContextEnum('context').notNull(),
    channel: challengeChannelEnum('channel').notNull().default('SMS'),
    target: varchar('target', {
      length: 255,
    }).notNull(),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }).notNull(),
    used: boolean('used').notNull().default(false),
    attempts: integer('attempts').notNull().default(0),
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
  (table) => [index('challenges_user_id_idx').on(table.userId)],
);

export const wallets = pgTable('wallets', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),

  balance: numeric('balance', {
    precision: 20,
    scale: 2,
  })
    .notNull()
    .default('0'),

  prevBalance: numeric('prev_balance', {
    precision: 20,
    scale: 2,
  })
    .notNull()
    .default('0'),

  currency: varchar('currency', {
    length: 3,
  })
    .notNull()
    .default('AOA'),

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

export const driver = pgTable('drivers', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),

  status: driverStatusEnum('status').notNull().default('PENDING'),

  acceptsPets: boolean('accepts_pets').notNull().default(true),
  allowsMusic: boolean('allows_music').notNull().default(true),
  acceptsCharge: boolean('accepts_charge').notNull().default(true),

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

export const driverDocs = pgTable(
  'driver_docs',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, {
        onDelete: 'cascade',
      }),

    type: driverDocumentTypeEnum('type').notNull(),

    documentNumber: varchar('document_number', {
      length: 100,
    }),

    fileUrl: text('file_url').notNull(),

    status: documentStatusEnum('status').notNull().default('PENDING'),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }),

    verifiedAt: timestamp('verified_at', {
      withTimezone: true,
    }),

    rejectionReason: text('rejection_reason'),

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
  (table) => [index('driver_docs_driver_id_idx').on(table.driverId)],
);

export const vehicles = pgTable(
  'vehicles',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, {
        onDelete: 'cascade',
      }),

    image: text('image').notNull(),
    plateNumber: varchar('plate_number', {
      length: 20,
    })
      .notNull()
      .unique(),

    brand: varchar('brand', {
      length: 100,
    }).notNull(),

    model: varchar('model', {
      length: 100,
    }).notNull(),

    color: varchar('color', {
      length: 50,
    }).notNull(),

    year: varchar('year', {
      length: 4,
    }),

    status: vehicleStatusEnum('status').notNull().default('PENDING'),

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
  (table) => [index('vehicles_driver_id_idx').on(table.driverId)],
);

export const vehicleDocs = pgTable(
  'vehicle_docs',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    vehicleId: uuid('vehicle_id')
      .notNull()
      .references(() => vehicles.id, {
        onDelete: 'cascade',
      }),

    type: vehicleDocumentTypeEnum('type').notNull(),

    documentNumber: varchar('document_number', {
      length: 100,
    }),

    fileUrl: text('file_url').notNull(),

    status: documentStatusEnum('status').notNull().default('PENDING'),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }),

    verifiedAt: timestamp('verified_at', {
      withTimezone: true,
    }),

    rejectionReason: text('rejection_reason'),

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
  (table) => [index('vehicle_docs_vehicle_id_idx').on(table.vehicleId)],
);

export const trips = pgTable(
  'trips',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    driverId: uuid('driver_id')
      .notNull()
      .references(() => driver.id, {
        onDelete: 'restrict',
      }),

    vehicleId: uuid('vehicle_id')
      .notNull()
      .references(() => vehicles.id, {
        onDelete: 'restrict',
      }),

    fromName: varchar('from_name', {
      length: 255,
    }).notNull(),

    fromLatitude: numeric('from_latitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    fromLongitude: numeric('from_longitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    toName: varchar('to_name', {
      length: 255,
    }).notNull(),

    toLatitude: numeric('to_latitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    toLongitude: numeric('to_longitude', {
      precision: 10,
      scale: 7,
    }).notNull(),

    departureAt: timestamp('departure_at', {
      withTimezone: true,
    }).notNull(),

    totalSeats: integer('total_seats').notNull(),

    availableSeats: integer('available_seats').notNull(),

    price: numeric('price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .notNull()
      .default('AOA'),

    status: tripStatusEnum('status').notNull().default('DRAFT'),

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
    index('trips_driver_id_idx').on(table.driverId),
    index('trips_vehicle_id_idx').on(table.vehicleId),
    // listagem/busca de viagens por status + data de partida
    index('trips_status_departure_at_idx').on(table.status, table.departureAt),
  ],
);

export const bookings = pgTable(
  'bookings',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    tripId: uuid('trip_id')
      .notNull()
      .references(() => trips.id, {
        onDelete: 'restrict',
      }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'restrict',
      }),

    seats: integer('seats').notNull().default(1),

    unitPrice: numeric('unit_price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    totalPrice: numeric('total_price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .notNull()
      .default('AOA'),

    status: bookingStatusEnum('status').notNull().default('PENDING'),

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
    index('bookings_trip_id_idx').on(table.tripId),
    index('bookings_user_id_idx').on(table.userId),
  ],
);

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    bookingId: uuid('booking_id')
      .notNull()
      .references(() => bookings.id, {
        onDelete: 'restrict',
      }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'restrict',
      }),

    amount: numeric('amount', {
      precision: 20,
      scale: 2,
    }).notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .notNull()
      .default('AOA'),

    method: paymentMethodEnum('method').notNull(),

    status: paymentStatusEnum('status').notNull().default('PENDING'),
    isDefault: boolean('is_default').notNull().default(false),

    providerReference: varchar('provider_reference', {
      length: 255,
    }),

    paidAt: timestamp('paid_at', {
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
    index('payments_booking_id_idx').on(table.bookingId),
    index('payments_user_id_idx').on(table.userId),
    uniqueIndex('payments_booking_id_default_unique_idx')
      .on(table.bookingId)
      .where(sql`${table.isDefault} = true`),
  ],
);

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    bookingId: uuid('booking_id')
      .notNull()
      .unique()
      .references(() => bookings.id, {
        onDelete: 'restrict',
      }),

    reviewerId: uuid('reviewer_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'restrict',
      }),

    rating: integer('rating').notNull(),

    comment: text('comment'),

    status: reviewStatusEnum('status').notNull().default('PENDING'),

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
  (table) => [index('reviews_reviewer_id_idx').on(table.reviewerId)],
);

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'restrict',
    }),

  read: boolean().default(false),
  content: text(),
  isReminder: boolean('reminder').default(false),
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
