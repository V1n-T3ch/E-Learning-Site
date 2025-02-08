import { useState } from 'react';
import { Book, GitGraph, Home, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-24 h-full fixed bg-black text-white p-4 space-y-8">
      <div className='flex items-center justify-center py-10'>
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <ul className='space-y-8'>
        <li
          className={`flex items-center justify-center rounded-lg space-x-2 py-2 hover:bg-green-600 cursor-pointer ${
            activeLink === 'Home' ? 'bg-green-600' : ''
          }`}
          onClick={() => handleLinkClick('Home')}
        >
          <Link href="/">
            <Home />
          </Link>
        </li>
        <li
          className={`flex items-center justify-center rounded-lg space-x-2 py-2 hover:bg-green-600 cursor-pointer ${
            activeLink === 'Courses' ? 'bg-green-600' : ''
          }`}
          onClick={() => handleLinkClick('Courses')}
        >
          <Link href="/courses">
            <Book />
          </Link>
        </li>
        <li
          className={`flex items-center justify-center rounded-lg space-x-2 py-2 hover:bg-green-600 cursor-pointer ${
            activeLink === 'Progress' ? 'bg-green-600' : ''
          }`}
          onClick={() => handleLinkClick('Progress')}
        >
          <Link href="/progress">
            <GitGraph />
          </Link>
        </li>
        <li
          className={`flex items-center justify-center rounded-lg space-x-2 py-2 hover:bg-green-600 cursor-pointer ${
            activeLink === 'Settings' ? 'bg-green-600' : ''
          }`}
          onClick={() => handleLinkClick('Settings')}
        >
          <Link href="/settings">
            <Settings />
          </Link>
        </li>
      </ul>
      <LogOut className="absolute bottom-4 left-8 cursor-pointer text-red-600" />
    </div>
  );
}