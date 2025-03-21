import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;

const dbName = 'admin';

export async function getDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}