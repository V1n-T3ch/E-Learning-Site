"use client";
import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
        <Link href="#" className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image src="/logo.png" alt="logo" width={150} height={150} />
        </Link>
          <h1 className="text-5xl font-bold mb-2">Welcome to DeKUT E-Learning</h1>
          <p className="text-xl mb-8">Empowering students with quality education and resources.</p>
          <Link href="/auth/signup">
            <span className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Get Started
            </span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Features</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Image src="https://imgs.search.brave.com/VI9b27HGGRlVFEHnXo7egXsv_uQvTo9QOpwSQXBDgE0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/Mzg1MTk3Ni9waG90/by9jbGFzc21hdGVz/LWFyZS1sZWFybmlu/Zy10aHJvdWdoLWxh/cHRvcC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TnAxb3NM/R01hLWIxaktMdnJw/dGVKQk85dmluaGtT/SGtSVmdnLTdWQU9B/az0" alt="Feature 1" width={150} height={150} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Quality Courses</h3>
                <p className="text-gray-700">Access a wide range of courses designed by experts to help you succeed.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Image src="https://imgs.search.brave.com/ILeFYAHVgixxpwOYaHniHJbGXXWkDBf8yctEyzMapho/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/ZmFjMTYxOTI3YmY4/NjQ4NWJhNDNmZDAv/NjRlMGVlODE5MzA1/MjM5ZDUzMDQ4NzUy/X1lvdVR1YmUtdmlk/ZW8tbWFrZXIucG5n" alt="Feature 2" width={150} height={150} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Interactive Lessons</h3>
                <p className="text-gray-700">Engage with interactive lessons and quizzes to enhance your learning experience.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Image src="https://imgs.search.brave.com/gvfK3WHlohO72WCx7x-fnRIXJm3sMKmitTsI6sm_itI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/LmV4YW0ubmV0L3dl/YnNpdGUtMjAyNS0w/MS0yMi93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wMy9leGFt/bmV0LWRhdGEtaGln/aC1zZWN1cml0eS1t/b2RlLXVpLnBuZw" alt="Feature 3" width={150} height={150} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Online Tests</h3>
                <p className="text-gray-700">Take your tests online and receive real time results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">Join Us Today</h2>
          <p className="text-xl mb-8">Sign up now and start your journey towards success.</p>
          <Link href="/auth/signup">
            <span className="bg-white text-green-600 font-bold py-2 px-4 rounded cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;