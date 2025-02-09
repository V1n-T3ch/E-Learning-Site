"use client"
import React, { useState } from 'react';
import AdminLayout from '../adminLayout';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  const [year, setYear] = useState('');
  const [materials, setMaterials] = useState([]);

  const handleAddCourse = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('school', school);
    formData.append('year', year);
  
    materials.forEach((file) => {
      formData.append('materials', file);  // Ensure 'materials' matches API field
    });
  
    try {
      const response = await fetch('/api/addCourse', {
        method: 'POST',
        body: formData,  // No need for headers
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload');
      }
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      if (data.success) {
        setCourses([...courses, { title, school, year, materials: data.materials }]);
        setTitle('');
        setSchool('');
        setYear('');
        setMaterials([]);
      }
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  };
  
  const handleFileChange = (e) => {
    setMaterials(Array.from(e.target.files));
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-black">Manage Courses</h1>
      <form onSubmit={handleAddCourse} className="mb-6">
        <div className="mb-4">
          <label htmlFor="course-title" className="block text-sm font-bold mb-2 text-black">Course Title</label>
          <input 
            type="text" 
            id="course-title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="school" className="block text-sm font-bold mb-2 text-black">Select School</label>
          <select 
            id="school" 
            value={school} 
            onChange={(e) => setSchool(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select School</option>
            <option value="CS & IT">CS & IT</option>
            <option value="Engineering">Engineering</option>
            <option value="Nursing">Nursing</option>
            <option value="FS & BT">FS & BT</option>
            <option value="ITHOM">ITHOM</option>
            <option value="GEGIS">GEGIS</option>
            <option value="IGS">IGS</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-bold mb-2 text-black">Select Unit Year</label>
          <select 
            id="year" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="5th Year">5th Year</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-black" htmlFor="materials">Course Materials</label>
          <input 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 h-15 p-3" 
            id="materials" 
            type="file" 
            multiple 
            onChange={handleFileChange}
          />
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
            <p>School: {course.school}</p>
            <p>Year: {course.year}</p>
            <p>Materials:</p>
            <ul>
              {(course.materials || []).map((material, idx) => (
                <li key={idx}>{material.name || material}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default ManageCourses;
