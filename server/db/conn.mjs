import { MongoClient, ServerApiVersion } from 'mongodb';
import './../loadEnv.mjs';

const { ATLAS_USER, ATLAS_PWD, MONGO_LINK } = process.env;
const uri = `mongodb+srv://${ATLAS_USER}:${ATLAS_PWD}${MONGO_LINK}`;
//const uri = `${MONGO_LINK}`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
let conn;
try {
  // Connect the client to the server	(optional starting in v4.7)
  conn = await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch(e) {
  console.log('Error: ', e);
  await client.close();
}

const db = conn.db("stations");

export default db;
