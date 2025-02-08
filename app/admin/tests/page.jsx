"use client"
import React, { useState } from 'react';
import AdminLayout from '../adminLayout';

const ManageTests = () => {
  const [tests, setTests] = useState([]);

  const handleAddTest = () => {
    // Logic to add a new test
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-black">Manage Tests</h1>
      <button
        onClick={handleAddTest}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Test
      </button>
      <ul>
        {tests.map((test, index) => (
          <li key={index} className="mb-2 p-4 bg-white rounded shadow">
            {test.title}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default ManageTests;