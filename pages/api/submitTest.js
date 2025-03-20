import { getDatabase } from "@/lib/testsDB";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { testId, answers } = req.body;
        const db = await getDatabase();

        await db.collection("submissions").insertOne({ testId, answers, submittedAt: new Date() });

        res.status(201).json({ success: true, message: "Test submitted successfully" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, error: "Database error" });
    }
}
