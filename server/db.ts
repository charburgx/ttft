import { MongoClient } from "mongodb";

const client: MongoClient = new MongoClient(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/')

export async function database() {
    await client.connect()
    return client.db(process.env.MONGO_DB ?? 'ttft_prod')
}