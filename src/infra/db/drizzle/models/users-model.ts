import { InferModel, relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { todosSchema } from './todos-model';
import { refreshSchema } from './refresh-model';

export const usersSchema = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username').notNull().unique(),
  password: varchar('password').notNull(),
  todosOrder: uuid('todosOrder').array().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const usersRelations = relations(usersSchema, ({ many }) => ({
  todos: many(todosSchema),
  refresh: many(refreshSchema),
}));

export type TUsersDB = InferModel<typeof usersSchema>;
