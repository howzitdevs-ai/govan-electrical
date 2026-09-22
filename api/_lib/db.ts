import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// HTTP-mode Neon client — no connection pool lifecycle to manage, safe to
// call fresh in every serverless invocation.
export const sql = neon(process.env.DATABASE_URL);
