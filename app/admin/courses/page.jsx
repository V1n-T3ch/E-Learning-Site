"use client"
import React, { useState } from 'react';
import AdminLayout from '../adminLayout';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [materials, setMaterials] = useState([]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = { title, category, year, materials };
    setCourses([...courses, newCourse]);
    setTitle('');
    setCategory('');
    setYear('');
    setMaterials([]);
  };

  const handleFileChange = (e) => {
    setMaterials([...materials, ...e.target.files]);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-black">Manage Courses</h1>
      <form onSubmit={handleAddCourse} className="mb-6">
        <div className="mb-4">
          <label for="base-input" className="block text-sm font-bold mb-2 text-black">Course Title</label>
          <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-4">
        <label htmlFor="base-input" className="block text-sm font-bold mb-2 text-black">Course Category</label>
        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-bold mb-2 text-black">Select Unit Year</label>
        <select id="year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
          <option>5th Year</option>
        </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="materials">
            Course Materials
          </label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 h-15 p-3" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Course
        </button>
      </form>
      <ul>
        {courses.map((course, index) => (
          <li key={index} className="mb-2 p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p>Category: {course.category}</p>
            <p>Year: {course.year}</p>
            <p>Materials:</p>
            <ul>
              {course.materials.map((material, idx) => (
                <li key={idx}>{material.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default ManageCourses;