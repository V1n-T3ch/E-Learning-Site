import { getDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, regno, hashedPassword, role } = req.body;

    try {
      const db = await getDatabase();
      const collectionName = role === 'admin' ? 'admins' : 'students';
      const collection = db.collection(collectionName);

      const result = await collection.insertOne({ email, regno, hashedPassword, role });
      return res.status(200).json({ success: true, message: 'User added', result });
    } catch (error) {
      res.status(500).json({ message: 'Error adding user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
