"use client";
import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../adminLayout';

const ManageEvents = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [startTitle, setStartTitle] = useState('');
  const [endTitle, setEndTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quizzes, setQuizzes] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    if (field === 'question') {
      updatedQuizzes[index].question = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.replace('option', ''), 10);
      updatedQuizzes[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      updatedQuizzes[index].correctAnswer = value;
    }
    setQuizzes(updatedQuizzes);
  };

  const addQuiz = () => {
    setQuizzes([...quizzes, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/setTests', { quizTitle, startTitle, endTitle, startDate, endDate, quizzes });
      alert(response.data.message);
    } catch (error) {
      alert('Failed to save event and quizzes');
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Upload Test</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter quiz title"
            required
          />
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={startTitle}
              onChange={(e) => setStartTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter start title"
              required
            />
            <input
              type="text"
              value={endTitle}
              onChange={(e) => setEndTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter end title"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-black">Add Quizzes</h2>
            {quizzes.map((quiz, index) => (
              <div key={index} className="mb-4 p-2 border rounded">
                <input
                  type="text"
                  value={quiz.question}
                  onChange={(e) => handleQuizChange(index, 'question', e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                  placeholder="Enter question"
                  required
                />
                {quiz.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleQuizChange(index, `option${optionIndex}`, e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-1"
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />
                ))}
                <select
                  value={quiz.correctAnswer}
                  onChange={(e) => handleQuizChange(index, 'correctAnswer', e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select Correct Answer</option>
                  {quiz.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuiz}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Add Quiz
            </button>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Save Event & Quizzes
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ManageEvents;
