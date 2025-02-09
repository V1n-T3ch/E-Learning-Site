import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const db = await getDatabase();
    const collectionName = email.endsWith('@dkut.ac.ke') ? 'admins' : 'students';
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection(collectionName).updateOne(
      { email },
      { $set: { hashedPassword: hashedPassword } }
    );

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}
