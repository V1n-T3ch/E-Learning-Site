import { useEffect, useState } from "react";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/getCourse")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched courses:", data); // Check what's being fetched
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <div key={course._id} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>School: {course.school}</p>
            <p>Year: {course.year}</p>

            <div className="mt-4">
              <h3 className="font-medium">Materials:</h3>
              {course.materials.map((file, index) => (
                <div key={index} className="mt-2">
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {file.split("/").pop()} {/* Display the filename */}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
