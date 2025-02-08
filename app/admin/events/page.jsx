"use client"
import React, { useState } from 'react';
import AdminLayout from '../adminLayout';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  const handleAddEvent = () => {
    // Logic to add a new event
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-black">Manage Events</h1>
      <button
        onClick={handleAddEvent}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Event
      </button>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="mb-2 p-4 bg-white rounded shadow">
            {event.title}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default ManageEvents;