import { getDatabase } from '@/lib/testsDB';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id, answers } = req.body;

  try {
    const db = await getDatabase();
    const quiz = await db.collection('tests').findOne({ _id: new ObjectId(id) });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // Check answers
    let score = 0;
    quiz.quizzes.forEach((quizItem, index) => {
      if (quizItem.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    res.status(200).json({ success: true, score, total: quiz.quizzes.length });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}