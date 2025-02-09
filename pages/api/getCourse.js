import { getDatabase } from "@/lib/courseDB";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const db = await getDatabase();
    const courses = await db.collection("courses").find({}).toArray();
    
    console.log("Courses fetched from DB:", courses); // Log the fetched data

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, error: "Database error" });
  }
}
