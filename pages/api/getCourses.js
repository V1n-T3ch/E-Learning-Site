import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Get filter parameters from query string
        const { school, year } = req.query;

        // Build filter object
        const filter = {};
        if (school) filter.school = school;
        if (year) filter.year = year;

        // Connect to MongoDB
        const client = new MongoClient("mongodb://localhost:27017");
        await client.connect();

        const db = client.db('admin');
        const collection = db.collection('courses');

        // Fetch courses with optional filtering
        const courses = await collection.find(filter).toArray();

        // Close connection
        await client.close();

        // Return courses data
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses',
            error: error.message
        });
    }
}