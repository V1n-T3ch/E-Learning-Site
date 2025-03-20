import { getDatabase } from '@/lib/testsDB';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const tests = await db.collection('tests').find({}).toArray();

    console.log('Tests fetched from DB:', tests);

    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}