import React from 'react';
import Link from 'next/link';
import "../../app/globals.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-34 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold"><Link href="/admin">Dashboard</Link></div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <Link href="/admin/courses">Courses</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link href="/admin/tests">Tests</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link href="/admin/events">Events</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
};

export default AdminLayout;