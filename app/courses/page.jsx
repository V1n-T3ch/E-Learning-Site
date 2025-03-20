"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { Search, FileText, Download, School, Clock, Filter } from 'lucide-react';
import '@/app/globals.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [schools, setSchools] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch courses from API
    fetchCourses();
  }, []);

  useEffect(() => {
    // Apply filters when courses, search query, selected school, or selected year changes
    if (courses.length > 0) {
      let filtered = [...courses];
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply school filter
      if (selectedSchool) {
        filtered = filtered.filter(course => course.school === selectedSchool);
      }
      
      // Apply year filter
      if (selectedYear) {
        filtered = filtered.filter(course => course.year === selectedYear);
      }
      
      setFilteredCourses(filtered);
    }
  }, [courses, searchQuery, selectedSchool, selectedYear]);

  const fetchCourses = async (filters = {}) => {
    setLoading(true);
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams(filters).toString();
      const apiUrl = `/api/getCourses${queryParams ? `?${queryParams}` : ''}`;
      
      console.log('Fetching courses from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response:', data);
      
      if (data.success) {
        setCourses(data.data);
        setFilteredCourses(data.data);
        
        // Extract unique schools and years for filters
        const uniqueSchools = [...new Set(data.data.map(course => course.school))];
        const uniqueYears = [...new Set(data.data.map(course => course.year))];
        setSchools(uniqueSchools);
        setYears(uniqueYears);
      } else {
        console.error('API returned an error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (materialPath) => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = materialPath;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCourse = (courseId) => {
    router.push(`/courses/${courseId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSchool('');
    setSelectedYear('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8 ml-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Course Library</h1>
            <p className="text-gray-500 mt-1">Access all available course materials and resources</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search courses by title..."
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <select
                className="border border-gray-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="" className="text-black">All Schools</option>
                {schools.map((school, index) => (
                  <option key={index} value={school} className="text-black">{school}</option>
                ))}
              </select>
              
              <select
                className="border border-gray-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="" className="text-black">All Years</option>
                {years.map((year, index) => (
                  <option key={index} value={year} className="text-black">{year}</option>
                ))}
              </select>
              
              <button 
                onClick={clearFilters} 
                className="px-4 py-3 border border-gray-200 rounded-lg text-black hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">Try changing your search or filter criteria</p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course._id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      {course.school}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {course.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-5">
                    <School size={16} className="mr-2" />
                    <span className="mr-4">{course.school}</span>
                    <Clock size={16} className="mr-2" />
                    <span>{course.year}</span>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Course Materials</h4>
                    <div className="space-y-2">
                      {course.materials && course.materials.map((material, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center overflow-hidden">
                            <FileText size={16} className="text-gray-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 truncate">
                              {material.split('/').pop()}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleDownload(material)}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md"
                          >
                            <Download size={14} className="text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleViewCourse(course._id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:shadow-md transition-all flex items-center justify-center"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination - can be added if needed */}
      </div>
    </div>
  );
};

export default CoursesPage;