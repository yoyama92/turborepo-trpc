import { z } from "zod";

const envSchema = z.object({
  GITHUB_ID: z.string().default(""),
  GITHUB_SECRET: z.string().default(""),
  NEXTAUTH_SECRET: z.string().default(""),
  API_HOST: z.string().default(""),
});

export const env = envSchema.parse(process.env);
