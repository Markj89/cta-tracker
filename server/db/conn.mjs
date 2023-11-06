import { MongoClient } from 'mongodb';
import './../loadEnv.mjs';

const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PWD;
const uri = `mongodb+srv://${user}:${password}@ctamapcluster.pobc97j.mongodb.net/?retryWrites=true&w=majority`;
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
