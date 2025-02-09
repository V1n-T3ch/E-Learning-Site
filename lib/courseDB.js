import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;

const dbName = 'admin';

export async function getDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}