import { Client } from "pg"

const databaseURL = process.env.DATABASE_URL!

export const client = new Client({connectionString: databaseURL})

