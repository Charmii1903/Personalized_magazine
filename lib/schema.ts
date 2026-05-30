import { pgTable, serial, varchar, text, timestamp, integer, boolean, index } from 'drizzle-orm/pg-core'

export const visitors = pgTable(
  'visitors',
  {
    id: serial('id').primaryKey(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    page: varchar('page', { length: 255 }),
    referrer: text('referrer'),
    timestamp: timestamp('timestamp').defaultNow(),
  },
  (table) => ({
    ipAddressIdx: index('visitors_ip_idx').on(table.ipAddress),
    pageIdx: index('visitors_page_idx').on(table.page),
    timestampIdx: index('visitors_timestamp_idx').on(table.timestamp),
  })
)

export const inquiries = pgTable(
  'inquiries',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    occasion: varchar('occasion', { length: 255 }).notNull(),
    theme: varchar('theme', { length: 255 }),
    deadline: varchar('deadline', { length: 255 }),
    whatsapp: varchar('whatsapp', { length: 20 }),
    notes: text('notes'),
    status: varchar('status', { length: 50 }).default('new'),
    source: varchar('source', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    emailIdx: index('inquiries_email_idx').on(table.email),
    statusIdx: index('inquiries_status_idx').on(table.status),
    createdAtIdx: index('inquiries_created_at_idx').on(table.createdAt),
  })
)

export type Visitor = typeof visitors.$inferSelect
export type InsertVisitor = typeof visitors.$inferInsert
export type Inquiry = typeof inquiries.$inferSelect
export type InsertInquiry = typeof inquiries.$inferInsert
