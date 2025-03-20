"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import '@/app/globals.css';

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/resetLink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password reset link sent! Check your email.');
      } else {
        alert(data.message || 'Error sending reset link.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending reset link.');
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          DeKUT E-Learning
        </Link>
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Email to reset password
        </h2>
        <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleRequestReset}>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value) } name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@dkut.ac.ke" required="" />
          </div>
          <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-green-600">Reset passwod</button>
        </form>
        </div>
      </div>
    </section>
  );
};

export default RequestReset;
