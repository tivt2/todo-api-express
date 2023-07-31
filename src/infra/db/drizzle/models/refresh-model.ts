import { InferModel, relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersSchema } from './users-model';

export const refreshSchema = pgTable('refresh', {
  token: varchar('token').primaryKey(),
  userId: uuid('userId').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export const refreshRelations = relations(refreshSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [refreshSchema.userId],
    references: [usersSchema.id],
  }),
}));

export type TRefreshDB = InferModel<typeof refreshSchema>;
