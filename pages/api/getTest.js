import { getDatabase } from '@/lib/testsDB';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const db = await getDatabase();
    const test = await db.collection('tests').findOne({ _id: new ObjectId(id) });

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}