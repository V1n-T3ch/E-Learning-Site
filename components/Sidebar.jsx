'use client';
import { useState, useEffect } from 'react';
import { Book, GitGraph, Home, Settings, LogOut, BookOpen, BarChart3, Users, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Tooltip } from 'react-tooltip';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  
  // Set active link based on current path
  const getActiveLink = (path) => {
    if (path === '/') return 'Home';
    if (path.startsWith('/courses')) return 'Courses';
    if (path.startsWith('/progress')) return 'Progress';
    if (path.startsWith('/settings')) return 'Settings';
    if (path.startsWith('/admin')) return 'Admin';
    return '';
  };
  
  const [activeLink, setActiveLink] = useState('Home');
  
  useEffect(() => {
    setActiveLink(getActiveLink(pathname));
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className="w-24 h-full fixed bg-black text-white p-4 flex flex-col">
      <div className="flex items-center justify-center py-6">
        <Link href="/">
          <div className="bg-green-600 rounded-full p-2 flex items-center justify-center">
            {/* Use a more appropriate size that fits well in the sidebar */}
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={50} 
              height={50} 
              className="rounded-full object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/50?text=DE";
              }} 
            />
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-6 mt-8">
          <li data-tooltip-id="sidebar-tooltip" data-tooltip-content="Home">
            <Link href="/">
              <div 
                className={`flex items-center justify-center rounded-lg py-3 hover:bg-green-600 transition-colors ${
                  activeLink === 'Home' ? 'bg-green-600' : ''
                }`}
              >
                <Home size={22} />
              </div>
            </Link>
          </li>
          
          <li data-tooltip-id="sidebar-tooltip" data-tooltip-content="Courses">
            <Link href="/courses">
              <div 
                className={`flex items-center justify-center rounded-lg py-3 hover:bg-green-600 transition-colors ${
                  activeLink === 'Courses' ? 'bg-green-600' : ''
                }`}
              >
                <BookOpen size={22} />
              </div>
            </Link>
          </li>
          
          <li data-tooltip-id="sidebar-tooltip" data-tooltip-content="Progress">
            <Link href="/progress">
              <div 
                className={`flex items-center justify-center rounded-lg py-3 hover:bg-green-600 transition-colors ${
                  activeLink === 'Progress' ? 'bg-green-600' : ''
                }`}
              >
                <BarChart3 size={22} />
              </div>
            </Link>
          </li>
          
          {isAdmin && (
            <li data-tooltip-id="sidebar-tooltip" data-tooltip-content="Admin Dashboard">
              <Link href="/admin">
                <div 
                  className={`flex items-center justify-center rounded-lg py-3 hover:bg-green-600 transition-colors ${
                    activeLink === 'Admin' ? 'bg-green-600' : ''
                  }`}
                >
                  <Layers size={22} />
                </div>
              </Link>
            </li>
          )}
          
          <li data-tooltip-id="sidebar-tooltip" data-tooltip-content="Settings">
            <Link href="/settings">
              <div 
                className={`flex items-center justify-center rounded-lg py-3 hover:bg-green-600 transition-colors ${
                  activeLink === 'Settings' ? 'bg-green-600' : ''
                }`}
              >
                <Settings size={22} />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto mb-6 flex justify-center">
        <button 
          onClick={handleLogout}
          className="p-3 rounded-lg hover:bg-red-600/20 transition-colors group"
          data-tooltip-id="sidebar-tooltip"
          data-tooltip-content="Sign Out"
        >
          <LogOut size={22} className="text-gray-400 group-hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      {/* Tooltip component */}
      <Tooltip id="sidebar-tooltip" place="right" />
    </div>
  );
}