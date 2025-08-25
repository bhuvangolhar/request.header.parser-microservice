import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Header parser response schemas
export const browserInfoSchema = z.object({
  name: z.string().nullable(),
  version: z.string().nullable(),
  major: z.string().nullable(),
});

export const osInfoSchema = z.object({
  name: z.string().nullable(),
  version: z.string().nullable(),
});

export const deviceInfoSchema = z.object({
  type: z.string().nullable(),
  vendor: z.string().nullable(),
  model: z.string().nullable(),
});

export const languageInfoSchema = z.object({
  code: z.string(),
  quality: z.number(),
});

export const parsedDataSchema = z.object({
  browser: browserInfoSchema,
  os: osInfoSchema,
  device: deviceInfoSchema,
  languages: z.array(languageInfoSchema),
});

export const headerParseResponseSchema = z.object({
  ipaddress: z.string(),
  language: z.string().nullable(),
  software: z.string().nullable(),
  parsed: parsedDataSchema,
  timestamp: z.string(),
});

export type BrowserInfo = z.infer<typeof browserInfoSchema>;
export type OSInfo = z.infer<typeof osInfoSchema>;
export type DeviceInfo = z.infer<typeof deviceInfoSchema>;
export type LanguageInfo = z.infer<typeof languageInfoSchema>;
export type ParsedData = z.infer<typeof parsedDataSchema>;
export type HeaderParseResponse = z.infer<typeof headerParseResponseSchema>;
