import { getDatabase } from '@/lib/testsDB';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { quizTitle, startTitle, endTitle, startDate, endDate, quizzes } = req.body;

  if (!quizTitle || !startTitle || !endTitle || !startDate || !endDate || !quizzes || quizzes.length === 0) {
    return res.status(400).json({ message: 'All fields are required, including quizzes' });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('tests');

    const result = await collection.insertOne({ quizTitle, startTitle, endTitle, startDate, endDate, quizzes });

    res.status(201).json({ message: 'Event and quizzes saved successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error saving event and quizzes', error });
  }
}
