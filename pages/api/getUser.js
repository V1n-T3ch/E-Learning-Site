import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const db = client.db('users');

    // Determine which collection to check based on email domain
    const isAdmin = email.endsWith('@dkut.ac.ke');
    const collectionName = isAdmin ? 'admins' : 'students';

    console.log(`Authentication attempt for ${email} as ${isAdmin ? 'admin' : 'student'}`);
    console.log(`Checking collection: ${collectionName}`);

    const collection = db.collection(collectionName);

    // Find user by email
    const user = await collection.findOne({ email });

    // Close connection
    await client.close();

    if (!user) {
      console.log(`No user found for ${email} in ${collectionName} collection`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(`User found: ${user.email}`);

    // Determine which password field to use
    // It might be stored as 'password' or 'hashedPassword'
    const passwordField = user.password ? 'password' :
      user.hashedPassword ? 'hashedPassword' : null;

    if (!passwordField) {
      console.error(`No password field found for user ${email}`);
      return res.status(500).json({ message: 'Invalid user account structure' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user[passwordField]);

    if (!passwordMatch) {
      console.log(`Password mismatch for ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(`Authentication successful for ${email}`);

    // Return user without sensitive data
    const safeUser = {
      id: user._id.toString(),
      email: user.email,
      role: isAdmin ? 'admin' : 'student',  // Set role based on collection
      name: user.name || user.email.split('@')[0],
      regno: user.regno || ''
    };

    console.log(`Login successful, returning user:`, {
      email: safeUser.email,
      role: safeUser.role,
      id: safeUser.id
    });

    return res.status(200).json(safeUser);
  } catch (error) {
    console.error('Error in getUser:', error);
    return res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
}