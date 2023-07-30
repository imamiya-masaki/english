import postgres from "postgres";

const databaseURL = process.env.DATABASE_URL!

export const sql = postgres(databaseURL)

