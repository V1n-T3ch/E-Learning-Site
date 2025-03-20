"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from './adminLayout';
import { 
  BarChart3, Users, BookOpen, ClipboardCheck, TrendingUp, 
  Calendar, Bell, AlertCircle, ArrowUpRight, CheckCircle,
  Clock, Activity, Zap, Settings, PlusCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalTests: 0,
    completionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard stats
    setTimeout(() => {
      setStats({
        totalStudents: 1248,
        totalCourses: 32,
        totalTests: 86,
        completionRate: 78
      });
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, Administrator</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
            <Calendar size={16} className="mr-2" />
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </button>
          <div className="relative">
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Students', value: stats.totalStudents, icon: <Users size={22} />, color: 'blue', trend: +12 },
          { title: 'Total Courses', value: stats.totalCourses, icon: <BookOpen size={22} />, color: 'green', trend: +3 },
          { title: 'Tests Created', value: stats.totalTests, icon: <ClipboardCheck size={22} />, color: 'purple', trend: +8 },
          { title: 'Completion Rate', value: `${stats.completionRate}%`, icon: <BarChart3 size={22} />, color: 'amber', trend: -2 },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow ${isLoading ? 'animate-pulse' : ''}`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                {isLoading ? (
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                )}
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                {React.cloneElement(stat.icon, { className: `text-${stat.color}-500` })}
              </div>
            </div>
            {!isLoading && (
              <div className="flex items-center mt-4">
                <span className={`text-xs font-medium ${stat.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend >= 0 ? '+' : ''}{stat.trend}%
                </span>
                <ArrowUpRight 
                  size={14} 
                  className={`ml-1 ${stat.trend >= 0 ? 'text-green-600' : 'text-red-600 transform rotate-90'}`}
                />
                <span className="text-xs text-gray-400 ml-2">from last month</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              [...Array(4)].map((_, idx) => (
                <div key={idx} className="animate-pulse flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <ActivityItem 
                  icon={<Users className="text-blue-500" />} 
                  title="5 new students registered" 
                  time="10 minutes ago" 
                  bgColor="bg-blue-50"
                />
                <ActivityItem 
                  icon={<BookOpen className="text-green-500" />} 
                  title="New course 'Advanced Programming' created" 
                  time="1 hour ago" 
                  bgColor="bg-green-50"
                />
                <ActivityItem 
                  icon={<ClipboardCheck className="text-purple-500" />} 
                  title="Test results uploaded for 'Data Structures'" 
                  time="2 hours ago" 
                  bgColor="bg-purple-50"
                />
                <ActivityItem 
                  icon={<Calendar className="text-amber-500" />} 
                  title="Event 'End of Semester' scheduled" 
                  time="Yesterday" 
                  bgColor="bg-amber-50"
                />
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction 
              icon={<PlusCircle size={20} />}
              title="Add Course"
              bgColor="bg-green-50"
              color="text-green-600"
              onClick={() => {/* Navigate to add course */}}
            />
            <QuickAction 
              icon={<Users size={20} />}
              title="Manage Users"
              bgColor="bg-blue-50"
              color="text-blue-600"
              onClick={() => {/* Navigate to users */}}
            />
            <QuickAction 
              icon={<ClipboardCheck size={20} />}
              title="Create Test"
              bgColor="bg-purple-50"
              color="text-purple-600"
              onClick={() => {/* Navigate to test creation */}}
            />
            <QuickAction 
              icon={<Calendar size={20} />}
              title="Schedule Event"
              bgColor="bg-amber-50"
              color="text-amber-600"
              onClick={() => {/* Navigate to event scheduling */}}
            />
            <QuickAction 
              icon={<Activity size={20} />}
              title="Reports"
              bgColor="bg-rose-50"
              color="text-rose-600"
              onClick={() => {/* Navigate to reports */}}
            />
            <QuickAction 
              icon={<Settings size={20} />}
              title="Settings"
              bgColor="bg-gray-50"
              color="text-gray-600"
              onClick={() => {/* Navigate to settings */}}
            />
          </div>
        </div>
      </div>

      {/* System Status & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">System Status</h2>
          <div className="space-y-4">
            <StatusItem 
              title="Server Status" 
              status="Operational" 
              icon={<CheckCircle size={18} />} 
              statusColor="text-green-600" 
            />
            <StatusItem 
              title="Database" 
              status="Operational" 
              icon={<CheckCircle size={18} />} 
              statusColor="text-green-600" 
            />
            <StatusItem 
              title="Storage Usage" 
              status="75% (18.7 GB / 25 GB)" 
              icon={<AlertCircle size={18} />} 
              statusColor="text-amber-500" 
            />
            <StatusItem 
              title="Last Backup" 
              status="Today, 04:30 AM" 
              icon={<Clock size={18} />} 
              statusColor="text-gray-600" 
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              Create Event
            </button>
          </div>
          <div className="space-y-4">
            <EventItem 
              title="End of Semester" 
              date="December 15, 2024" 
              type="Academic"
              bgColor="bg-blue-50"
              color="text-blue-600" 
            />
            <EventItem 
              title="Final Exams" 
              date="December 5-12, 2024" 
              type="Examination"
              bgColor="bg-red-50"
              color="text-red-600" 
            />
            <EventItem 
              title="Course Registration" 
              date="January 10-15, 2025" 
              type="Administrative"
              bgColor="bg-purple-50"
              color="text-purple-600" 
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Helper Components
const ActivityItem = ({ icon, title, time, bgColor }) => (
  <div className="flex items-start space-x-3">
    <div className={`${bgColor} p-2 rounded-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const QuickAction = ({ icon, title, bgColor, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${bgColor} ${color} p-4 rounded-xl flex flex-col items-center justify-center hover:shadow-md transition-shadow`}
  >
    <div className="mb-2">{icon}</div>
    <span className="font-medium text-sm">{title}</span>
  </button>
);

const StatusItem = ({ title, status, icon, statusColor }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{title}</span>
    <div className="flex items-center">
      <span className={`${statusColor} mr-1.5 font-medium`}>{status}</span>
      <div className={`${statusColor}`}>{icon}</div>
    </div>
  </div>
);

const EventItem = ({ title, date, type, bgColor, color }) => (
  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
    <div className="flex items-center space-x-3">
      <div className={`${bgColor} p-2 rounded-lg`}>
        <Calendar size={18} className={color} />
      </div>
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <span className={`text-xs font-medium ${color} ${bgColor} py-1 px-2 rounded-full`}>
      {type}
    </span>
  </div>
);

export default AdminDashboard;