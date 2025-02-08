"use client";
import { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Bell, Bookmark } from 'lucide-react';
import MyCalendar from '@/components/Calendar';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookmarks, setActiveBookmarks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeButton, setActiveButton] = useState('All Courses');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const events = [
    { date: new Date(2025, 0, 15), event: 'Math Test' }, // January is 0
    { date: new Date(2025, 0, 20), event: 'Science Quiz' }, // January is 0
  ];

  const courses = useMemo(() => [
    {
      title: 'Marketing',
      category: 'Business',
      lessonsCompleted: 5,
      totalLessons: 20,
      teacher: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
    },
    {
      title: 'Computer Science',
      category: 'Technology',
      lessonsCompleted: 10,
      totalLessons: 30,
      teacher: 'Jane Smith',
      image: 'https://randomuser.me/api/portraits/women/54.jpg',
    },
    {
      title: 'Psychology',
      category: 'Health',
      lessonsCompleted: 8,
      totalLessons: 25,
      teacher: 'Alice Johnson',
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
    },
  ], []);

  useEffect(() => {
    console.log('Search Query:', searchQuery);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered Courses:', filtered);
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  useEffect(() => {
    // Initialize filteredCourses with all courses on initial render
    setFilteredCourses(courses);
  }, [courses]);

  const handleBookmarkClick = (index) => {
    setActiveBookmarks((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white rounded-lg m-6 ml-24">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Welcome Message */}
              <h2 className="text-2xl font-bold mb-6 text-black">
                Welcome to <span className="text-green-600">DeKUT e-Learning</span>
              </h2>
            </div>
          </div>
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-black rounded-full px-4 py-2 w-50 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute top-2 right-4 text-gray-500" />
            </div>

            {/* Notifications */}
            <Bell className="text-xl text-black border border-black rounded-full py-2 w-10 h-10" />

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <FaUserAlt className="text-xl text-black border border-black rounded-full py-2 w-10 h-10" />
              <span className="font-semibold text-black">John Doe</span>
            </div>
          </div>
        </div>

        {/* My Courses Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black">My Courses</h3>
            <div className="flex space-x-4">
              {['All Courses', 'Marketing', 'Computer', 'Psychology'].map((button) => (
                <button
                  key={button}
                  className={`px-4 py-2 rounded-full border border-black text-black ${
                    activeButton === button ? 'bg-black text-white' : 'bg-white'
                  }`}
                  onClick={() => handleButtonClick(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {/* Course Cards */}
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg border border-black cursor-pointer"
                onClick={() => handleCourseClick(course)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-center text-sm font-semibold text-black border rounded-full bg-green-600 w-24">
                    {course.category}
                  </h4>
                  <Bookmark
                    className={`text-black ${activeBookmarks.includes(index) ? 'fill-current text-black' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(index);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <div>
                    <h1 className='text-black font-extrabold mb-2'>{course.title}</h1>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(course.lessonsCompleted / course.totalLessons) * 100}%` }}></div>
                  </div>
                  <p className="text-sm mt-1 text-black">{course.lessonsCompleted}/{course.totalLessons} lessons completed</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Image
                    src={course.image}
                    alt="Teacher"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    width={24}
                    height={24}
                  />
                  <span className="text-black">{course.teacher}</span>
                </div>
                <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-full">
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Next Lessons Section */}
        <div className="flex gap-6">
  {/* Table - Takes More Width */}
  <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-black text-center mb-6">My Units</h3>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Lesson</th>
          <th scope="col" className="px-6 py-3">Teacher</th>
          <th scope="col" className="px-6 py-3">Duration</th>
        </tr>
          </thead>
            <tbody>
              {[1, 2, 3].map((_, idx) => (
                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Lesson {idx + 1}
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <Image
                          src="https://randomuser.me/api/portraits/men/75.jpg"
                          alt="Teacher"
                          className="w-6 h-6 rounded-full"
                          width={24}
                          height={24}
                        />
                      <span>Teacher {idx + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">30 min</td>
                </tr>
              ))}
            </tbody>
      </table>
  </div>

  {/* Calendar - Takes Less Width */}
  <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-4 text-black text-center">Calendar</h3>
    <MyCalendar events={events} />
  </div>
</div>

        {/* New Course Suggestion Box */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Suggested Course</h4>
          <div className="flex justify-between items-center">
            <div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Big Data</span>
              <h5 className="font-semibold mt-2">Microsoft Future Ready: Fundamentals of Big Data</h5>
              <p className="text-sm text-gray-500">50 peers enrolled</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">More details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;