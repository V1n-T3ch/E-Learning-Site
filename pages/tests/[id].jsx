"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/app/globals.css";

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        try {
          const response = await axios.get(`/api/getTest?id=${id}`);
          console.log("API Response:", response.data);
          if (response.data.success) {
            setQuiz(response.data.data);
          } else {
            console.error("Error fetching quiz:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching quiz:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuiz();
    }
  }, [id]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/submitQuiz', { id, answers });
      console.log("Submission Response:", response.data);
      if (response.data.success) {
        setResult({ score: response.data.score, total: response.data.total });
      } else {
        console.error("Error submitting quiz:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading quiz...</p>;
  }

  if (!quiz) {
    return <p className="text-center text-red-600">Quiz not found.</p>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">{quiz.quizTitle}</h1>
        <form onSubmit={handleSubmit}>
          {quiz.quizzes.map((quizItem, questionIndex) => (
            <div key={questionIndex} className="mb-6 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-black">{quizItem.question}</h3>
              {quizItem.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    onChange={() => handleAnswerChange(questionIndex, option)}
                    className="mr-2"
                  />
                  <label className="text-lg text-black">{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
        {result && (
          <div className="mt-6 text-center">
            <p className="text-xl font-bold">Your Score: {result.score} / {result.total}</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default QuizPage;