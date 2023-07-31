import { InferModel, relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersSchema } from './users-model';

export const todosSchema = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull(),
  content: varchar('content').notNull(),
  completed: boolean('completed').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const todosRelations = relations(todosSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [todosSchema.userId],
    references: [usersSchema.id],
  }),
}));

export type TTodosDB = InferModel<typeof todosSchema>;
