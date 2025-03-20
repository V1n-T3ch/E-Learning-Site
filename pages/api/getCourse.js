import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Course ID is required' 
    });
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    
    const db = client.db('admin');
    const collection = db.collection('courses');

    // Fetch course by ID
    const course = await collection.findOne({ _id: new ObjectId(id) });
    
    // Close connection
    await client.close();
    
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }
    
    // Return course data
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch course', 
      error: error.message 
    });
  }
}