import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/userDB';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const db = await getDatabase();
      const collectionName = email.endsWith('@dkut.ac.ke') ? 'admins' : 'students';
      const collection = db.collection(collectionName);

      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
