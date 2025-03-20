'use client';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import { motion } from 'framer-motion';
import { ChevronRight, Book, Users, Award, Monitor, Menu, X, Clock, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DeKUTElearning = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`${scrolled
        ? "bg-white text-gray-800 shadow-md"
        : "bg-transparent text-white"
        } py-4 px-6 fixed w-full transition-all duration-300 z-50`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="DeKUT Logo" width={40} height={40} className="rounded-md" />
            <h1 className="text-2xl font-bold">DeKUT <span className="text-green-500">E-Learning</span></h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="hover:text-green-500 transition-colors">Features</a></li>
              <li><a href="#courses" className="hover:text-green-500 transition-colors">Courses</a></li>
              <li><a href="#testimonials" className="hover:text-green-500 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-green-500 transition-colors">Contact</a></li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="px-4 py-2 rounded-lg hover:text-green-500 transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg rounded-b-lg mt-4 overflow-hidden"
          >
            <ul className="flex flex-col">
              <li><a href="#features" className="block py-3 px-6 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Features</a></li>
              <li><a href="#courses" className="block py-3 px-6 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Courses</a></li>
              <li><a href="#testimonials" className="block py-3 px-6 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Testimonials</a></li>
              <li><a href="#contact" className="block py-3 px-6 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              <li className="border-t border-gray-200">
                <Link href="/auth/login" className="block py-3 px-6 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="block py-3 px-6 bg-green-500 text-white" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-r from-blue-600 to-green-500 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full opacity-10">
            {/* Add some subtle geometric patterns */}
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white"></div>
          </div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Transform Your Learning Experience</h1>
              <p className="text-lg mb-8 text-blue-50">Access world-class education from anywhere, anytime. Join over 50,000 students advancing their careers.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                  Get Started <ChevronRight size={18} />
                </Link>
                <a href="#features" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2">
                  Learn More <ChevronRight size={18} />
                </a>
              </div>
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-blue-50 p-4 border-b">
                  <div className="flex space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Book size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Programming Fundamentals</h3>
                      <p className="text-xs text-gray-500">75% completed</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div className="bg-green-500 h-2.5 rounded-full w-3/4"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Introduction to Variables</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Control Flow Basics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Functions & Methods</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700">
                    Continue Learning
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm flex items-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Award size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600">95%</h3>
                <p className="text-gray-600">Course Completion Rate</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm flex items-center"
            >
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <Book size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-600">500+</h3>
                <p className="text-gray-600">Specialized Courses</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm flex items-center"
            >
              <div className="bg-purple-100 p-4 rounded-full mr-4">
                <Clock size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600">24/7</h3>
                <p className="text-gray-600">Learning Support</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium inline-block mb-4"
            >
              KEY BENEFITS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose DeKUT E-Learning?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600"
            >
              Our platform combines cutting-edge technology with expert instruction to deliver an unmatched learning experience
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Users size={32} className="text-blue-600" />,
                title: "Expert Instructors",
                content: "Learn from industry professionals with real-world experience and proven track records."
              },
              {
                icon: <Monitor size={32} className="text-green-600" />,
                title: "Interactive Content",
                content: "Engage with videos, quizzes, and hands-on projects designed to reinforce your learning."
              },
              {
                icon: <Award size={32} className="text-purple-600" />,
                title: "Certification",
                content: "Earn recognized certificates that can help advance your career and open new opportunities."
              },
              {
                icon: <Book size={32} className="text-red-600" />,
                title: "Mobile Access",
                content: "Learn on-the-go with our fully responsive platform that works on any device."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 p-3 bg-gray-50 inline-block rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="px-4 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium inline-block mb-4"
            >
              EXPLORE KNOWLEDGE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Popular Course Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Browse our diverse range of courses designed to help you achieve your personal and professional goals
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {[
              { name: 'Computer Science', count: 126, icon: '🖥️' },
              { name: 'Business', count: 98, icon: '💼' },
              { name: 'Engineering', count: 113, icon: '⚙️' },
              { name: 'Data Science', count: 87, icon: '📊' },
              { name: 'Design', count: 64, icon: '🎨' }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-400 transition-all text-center"
              >
                <div className="text-4xl mb-3 text-black">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}+ Courses</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All Courses <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="px-4 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium inline-block mb-4"
            >
              STUDENT VOICES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Success Stories from Our Students
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Hear from students who have transformed their careers through our platform
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The platform's intuitive design made it easy to balance my studies with full-time work. Within months, I was able to apply new skills to my job.",
                author: "Sarah Johnson",
                role: "Software Engineer",
                avatar: "/avatars/avatar1.png",
                stars: 5
              },
              {
                quote: "I doubled my salary within 6 months of completing my certification. The hands-on projects gave me real-world experience that impressed employers.",
                author: "Michael Chen",
                role: "Data Analyst",
                avatar: "/avatars/avatar2.png",
                stars: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-sm relative"
              >
                <div className="absolute -top-5 left-8 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl">
                  {/* Added the missing quote icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                    {/* Replace with actual avatar images */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#FBBF24" stroke="#FBBF24" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-12 text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Start Learning Today
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-blue-100 mb-8"
                >
                  Join thousands of students advancing their careers with DeKUT E-Learning. Get unlimited access to our premium courses.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/auth/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    Get Started <ChevronRight size={18} />
                  </Link>
                  <Link href="/courses" className="border-2 border-white bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                    View Courses
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2 p-8 flex items-center">
                <div className="w-full bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-xl">
                  <h3 className="text-white text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-white text-opacity-80 text-sm mt-3">
                    Get the latest updates, news and course information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="DeKUT Logo" width={40} height={40} className="rounded-md" />
                <h3 className="text-xl font-bold">DeKUT <span className="text-green-400">E-Learning</span></h3>
              </div>
              <p className="text-gray-400 mb-4">Empowering learners worldwide since 2015. Our mission is to provide accessible, quality education to everyone.</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div id="contact">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">DeKUT, Nyeri, Kenya</li>
                <li className="text-gray-400">info@dekut-elearning.edu</li>
                <li className="text-gray-400">+254 700 000 000</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-gray-400 text-center">
            <p>&copy; {new Date().getFullYear()} DeKUT E-Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeKUTElearning;