"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

const TestPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("/api/getTests");
        if (response.data.success) {
          const today = new Date();
          const availableTests = response.data.data.filter((test) => {
            const startDate = new Date(test.startDate);
            const endDate = new Date(test.endDate);
            return today >= startDate && today <= endDate;
          });

          setQuizzes(availableTests);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Available Tests</h1>

      {loading ? (
        <p>Loading tests...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-600">No available tests at this time.</p>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-600">{quiz.quizTitle}</h2>
            <p className="text-sm text-gray-500">
              Available from {new Date(quiz.startDate).toLocaleDateString()} to{" "}
              {new Date(quiz.endDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => router.push(`/tests/${quiz._id}`)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Attempt Test
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TestPage;