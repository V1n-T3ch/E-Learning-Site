"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import '@/app/globals.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    regno: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  // Handle all form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Special handling for email
    if (name === 'email') {
      const isAdminEmail = value.endsWith('@dkut.ac.ke');
      setIsAdmin(isAdminEmail);
      
      // Clear registration number if admin
      if (isAdminEmail) {
        setFormData(prev => ({
          ...prev,
          regno: ''
        }));
      }
    }

    // Check password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }

    // Clear errors when user types
    setError('');
  };

  const validateForm = () => {
    // Email validation
    if (!formData.email.match(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Domain validation
    const validDomains = ['@students.dkut.ac.ke', '@dkut.ac.ke'];
    if (!validDomains.some(domain => formData.email.endsWith(domain))) {
      setError('Please use a valid DeKUT email address (@students.dkut.ac.ke or @dkut.ac.ke)');
      return false;
    }

    // Registration number validation for students
    if (!isAdmin && !formData.regno.trim()) {
      setError('Registration number is required for students');
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const role = formData.email.endsWith('@students.dkut.ac.ke') ? 'student' : 'admin';
      
      const response = await axios.post('/api/addUser', {
        email: formData.email,
        regno: isAdmin ? '' : formData.regno,
        hashedPassword,
        role,
      });
      
      if (response.data.success) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        
        // Reset form
        setFormData({
          email: '',
          regno: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirect after showing success message
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.response?.data?.message === 'Email already exists') {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError(error.response?.data?.message || 'An error occurred during sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Password strength indicator color
  const strengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image 
            src="/logo.png" 
            alt="logo" 
            width={40} 
            height={40}
            className="mr-2"
          />
          DeKUT E-Learning
        </Link>
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-8">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            
            {/* Error message */}
            {error && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 flex items-center" role="alert">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Success message */}
            {successMessage && (
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400 flex items-center" role="alert">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{successMessage}</span>
              </div>
            )}
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@students.dkut.ac.ke"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use your DeKUT email (@students.dkut.ac.ke or @dkut.ac.ke)
                </p>
              </div>
              
              <div>
                <label htmlFor="regno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {isAdmin ? 'Staff ID' : 'Registration number'}
                </label>
                <input
                  type="text"
                  name="regno"
                  id="regno"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={isAdmin ? "Optional for staff" : "C027-000-000/2023"}
                  required={!isAdmin}
                  disabled={isLoading}
                  value={formData.regno}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="text-gray-500 dark:text-gray-400" /> : <Eye className="text-gray-500 dark:text-gray-400" />}
                  </div>
                </div>
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strengthColor()}`} 
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {passwordStrength === 0 && 'Enter a password'}
                      {passwordStrength === 1 && 'Weak password'}
                      {passwordStrength === 2 && 'Fair password'}
                      {passwordStrength === 3 && 'Good password'}
                      {passwordStrength === 4 && 'Strong password'}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="text-gray-500 dark:text-gray-400" /> : <Eye className="text-gray-500 dark:text-gray-400" />}
                  </div>
                </div>
                
                {/* Password match indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-xs text-green-500">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-xs text-red-500">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create account'
                )}
              </button>
              
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-green-600 hover:underline dark:text-green-500">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
