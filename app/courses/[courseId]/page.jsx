"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { ChevronLeft, FileText, Download, School, Clock, BookOpen } from 'lucide-react';
import '@/app/globals.css';

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { courseId } = params;

  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, [courseId]);

  const fetchCourse = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getCourse?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.data);
      } else {
        console.error('Failed to fetch course:', data.message);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (materialPath) => {
    const link = document.createElement('a');
    link.href = materialPath;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 ml-20 flex items-center justify-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 ml-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
            <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.push('/courses')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Return to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-20">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto p-8">
            <button
              onClick={() => router.push('/courses')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ChevronLeft size={16} className="mr-1" /> Back to Courses
            </button>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <School size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{course.school}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{course.year}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Materials</h2>
              <div className="space-y-3">
                {course.materials && course.materials.length > 0 ? (
                  course.materials.map((material, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center flex-1 overflow-hidden">
                        <FileText size={20} className="text-green-600 mr-3 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="font-medium text-gray-800 truncate">{material.split('/').pop()}</p>
                          <p className="text-sm text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <a 
                          href={material} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          View
                        </a>
                        <button 
                          onClick={() => handleDownload(material)}
                          className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors flex items-center"
                        >
                          <Download size={16} className="mr-1" /> Download
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-800">No materials available</h3>
                    <p className="text-gray-500">This course doesn't have any materials yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Additional course content could be added here */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;