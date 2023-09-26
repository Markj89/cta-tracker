import MongoClient from 'mongodb';
import './../loadEnv.mjs';

const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PWD;
const uri = `mongodb+srv://${user}:${password}@ctamapcluster.pobc97j.mongodb.net/?retryWrites=true&w=majority`;
const conn = new MongoClient.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then((error, client) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("stations");
    const stations = db.collection('Stations');
    console.log(stations);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch {
    console.log('Error: {}', error);
    // Ensures that the client will close when you finish/error
    //client.close();
  }
});

/*const conn = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};*/

export default conn;
