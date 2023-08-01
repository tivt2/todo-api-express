import { lt } from "drizzle-orm";
import db from "../../db";
import { refreshSchema } from "../../models/refresh-model";

export async function deleteOldTokens(expiresInMs: number): Promise<void> {
  await db.delete(refreshSchema).where(lt(refreshSchema.createdAt, new Date(new Date().getTime() - expiresInMs)))
}