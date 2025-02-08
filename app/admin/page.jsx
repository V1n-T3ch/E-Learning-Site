import React from 'react';
import AdminLayout from './adminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-black">Welcome to the Admin Dashboard</h1>
      <p className="text-lg text-black">Use the sidebar to manage courses, tests, and events.</p>
    </AdminLayout>
  );
};

export default AdminDashboard;