import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { getDatabase } from "@/lib/courseDB";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ success: false, error: "Form parsing failed" });
    }

    console.log("Fields:", fields);
    console.log("Files:", files);

    const { title, school, year } = fields;
    let materials = [];

    const processFile = (file) => {
      const oldPath = file.filepath;
      const newPath = path.join(uploadDir, file.originalFilename);

      // Rename the file to its original name
      fs.renameSync(oldPath, newPath);

      // Store the relative path for database reference
      materials.push(`/uploads/${file.originalFilename}`);
    };

    if (Array.isArray(files.materials)) {
      files.materials.forEach(processFile);
    } else if (files.materials) {
      processFile(files.materials);
    }

    try {
      const db = await getDatabase();
      await db.collection("courses").insertOne({
        title: title[0],
        school: school[0],
        year: year[0],
        materials,
      });

      res.status(200).json({ success: true, materials });
    } catch (dbError) {
      console.error("Database error:", dbError);
      res.status(500).json({ success: false, error: "Database error" });
    }
  });
}
