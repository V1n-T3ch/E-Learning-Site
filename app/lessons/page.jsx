"use client";
import { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Bell, Bookmark, Clock, BookOpen, User, ChevronRight } from 'lucide-react';
import MyCalendar from '@/components/Calendar';
import '@/app/globals.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookmarks, setActiveBookmarks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeButton, setActiveButton] = useState('All Courses');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  // Extract name from email function
  const extractNameFromEmail = (email) => {
    if (!email) return 'Student';
    
    // Extract the part before the @ symbol
    const namePart = email.split('@')[0];
    
    // Extract the part before any numbers
    const nameWithoutNumbers = namePart.replace(/\d+$/, '');
    
    // Split by dot and capitalize each part
    const nameParts = nameWithoutNumbers.split('.');
    const formattedName = nameParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
      
    return formattedName;
  };

  useEffect(() => {
    // Get email from session or localStorage
    const userEmail = session?.user?.email || localStorage.getItem('userEmail');
    
    if (userEmail) {
      const name = extractNameFromEmail(userEmail);
      setUserName(name);
    } else {
      // Fallback to a mock email for development/testing
      const mockEmail = 'wambui.gichomo23@students.dkut.ac.ke';
      const name = extractNameFromEmail(mockEmail);
      setUserName(name);
    }
  }, [session]);

  const courses = useMemo(() => [
    {
      title: 'Marketing Fundamentals',
      category: 'Business',
      lessonsCompleted: 5,
      totalLessons: 20,
      teacher: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Computer Science 101',
      category: 'Technology',
      lessonsCompleted: 10,
      totalLessons: 30,
      teacher: 'Jane Smith',
      image: 'https://randomuser.me/api/portraits/women/54.jpg',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Intro to Psychology',
      category: 'Health',
      lessonsCompleted: 8,
      totalLessons: 25,
      teacher: 'Alice Johnson',
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50'
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

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getExamDates');
        const { data } = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-20">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {/* Welcome Message */}
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome back, <span className="text-green-600">{userName}</span>
            </h2>
            <p className="text-gray-500 mt-1">Continue your learning journey</p>
          </div>
          
          {/* Search and User */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-64 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 hover:text-green-600 transition-colors cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-10 h-10 rounded-full flex items-center justify-center text-white">
                {userName.split(' ').map(name => name[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Courses', value: '6', icon: <BookOpen className="h-6 w-6 text-blue-500" />, color: 'bg-blue-50 text-blue-600' },
            { title: 'Hours Spent', value: '42', icon: <Clock className="h-6 w-6 text-green-500" />, color: 'bg-green-50 text-green-600' },
            { title: 'Completed', value: '12', icon: <BookOpen className="h-6 w-6 text-purple-500" />, color: 'bg-purple-50 text-purple-600' },
            { title: 'Certificates', value: '2', icon: <User className="h-6 w-6 text-amber-500" />, color: 'bg-amber-50 text-amber-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1 text-black">{stat.value}</h3>
                </div>
                <div className={`${stat.color.split(' ')[0]} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My Courses Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">My Courses</h3>
            <div className="flex space-x-2">
              {['All Courses', 'Marketing', 'Computer', 'Psychology'].map((button) => (
                <button
                  key={button}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeButton === button 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
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
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer group"
                onClick={() => handleCourseClick(course)}
              >
                <div className={`h-3 bg-gradient-to-r ${course.color}`}></div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`${course.bgColor} text-black text-xs font-medium px-3 py-1 rounded-full`}>
                      {course.category}
                    </span>
                    <Bookmark
                      className={`h-5 w-5 cursor-pointer transition-colors ${
                        activeBookmarks.includes(index) 
                          ? 'fill-amber-500 text-amber-500' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(index);
                      }}
                    />
                  </div>
                  <h4 className="font-bold text-black text-lg mb-3 group-hover:text-green-600 transition-colors">{course.title}</h4>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{Math.round((course.lessonsCompleted / course.totalLessons) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${course.color}`} 
                        style={{ width: `${(course.lessonsCompleted / course.totalLessons) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={course.image}
                        alt={course.teacher}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        width={32}
                        height={32}
                      />
                      <span className="text-sm text-gray-600">{course.teacher}</span>
                    </div>
                    <span className="text-sm text-gray-500">{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center group-hover:shadow-md transition-all">
                    Continue Learning <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Units and Calendar Section */}
        <div className="grid grid-cols-3 gap-8">
          {/* Units Table */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">My Units</h3>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Unit</th>
                    <th className="pb-3 font-medium">Instructor</th>
                    <th className="pb-3 font-medium">Progress</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      name: 'Introduction to Marketing', 
                      instructor: { name: 'Prof. Andrew Kim', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
                      progress: 80
                    },
                    { 
                      name: 'Data Structures & Algorithms', 
                      instructor: { name: 'Dr. Lisa Wong', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
                      progress: 65
                    },
                    { 
                      name: 'Cognitive Psychology', 
                      instructor: { name: 'Prof. James Carter', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
                      progress: 40
                    },
                  ].map((unit, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-medium text-gray-800">{unit.name}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <Image
                            src={unit.instructor.image}
                            alt={unit.instructor.name}
                            className="w-8 h-8 rounded-full"
                            width={32}
                            height={32}
                          />
                          <span className="text-gray-600 text-sm">{unit.instructor.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-100 rounded-full h-2 max-w-[100px]">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" 
                              style={{ width: `${unit.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{unit.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <button className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                          Resume
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendar - Keeping this component as requested */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Calendar</h3>
            <MyCalendar events={events} />
          </div>
        </div>

        {/* Suggested Course */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block mb-2">
                Recommended For You
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-1">Microsoft Future Ready: Fundamentals of Big Data</h4>
              <p className="text-gray-600 text-sm">Learn the essential concepts of big data analysis and processing</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Image 
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${50 + i}.jpg`}
                      alt="Student" 
                      className="w-6 h-6 rounded-full border-2 border-white"
                      width={24}
                      height={24}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">50+ peers enrolled</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                className="px-4 py-2.5 rounded-lg font-medium border border-green-200 text-green-700 hover:bg-green-100 transition-colors"
                onClick={() => router.push('/tests')}
              >
                View Tests
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg font-medium hover:shadow-md transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
