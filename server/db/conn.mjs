import { MongoClient } from 'mongodb';
import './../loadEnv.mjs';

const { ATLAS_USER, ATLAS_PWD, MONGO_LINK } = process.env;
const uri = `mongodb+srv://${ATLAS_USER}:${ATLAS_PWD}@${MONGO_LINK}/?appName=ctaMapCluster`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db;

export async function mongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    
    db = client.db("stations");
    const ping = client.db("stations").command({ ping: 1 });
    if (ping) console.log("Successfully connected to MongoDB.");

    return db;
  } catch (err) {
    throw err;
  }
}

export function getMongoCollection(collection) {
  if (!db) throw new Error("Database is not initialized.");
  return db.collection(collection);
}