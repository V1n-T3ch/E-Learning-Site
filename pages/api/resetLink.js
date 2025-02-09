import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { getDatabase } from '@/lib/userDB';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const db = await getDatabase();
    const collectionName = email.endsWith('@dkut.ac.ke') ? 'admins' : 'students';
    const user = await db.collection(collectionName).findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error('Error sending reset link:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
