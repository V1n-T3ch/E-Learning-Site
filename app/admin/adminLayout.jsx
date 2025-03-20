"use client";
import React from 'react';
import Link from 'next/link';
import "@/app/globals.css";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, BookOpen, ClipboardList, Users, 
  Settings, LogOut, PieChart, Calendar, FileText, 
  ShieldCheck, Bell
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Set active link based on current path
    const path = pathname.split("/").pop();
    setActiveLink(path || 'dashboard');

    // Security check
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [status, session, router, pathname]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Only render children if user is admin
  if (status === "authenticated" && session?.user?.role === "admin") {
    return (
      <div className="min-h-screen flex">
        <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed">
          {/* Header */}
          <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
            <div className="bg-green-600 p-2 rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <Link href="/admin" className="text-xl font-bold">Admin Panel</Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="mb-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </div>
            <NavItem 
              href="/admin" 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              isActive={activeLink === 'admin' || activeLink === 'dashboard'} 
            />
            <NavItem 
              href="/admin/courses" 
              icon={<BookOpen size={18} />} 
              label="Courses" 
              isActive={activeLink === 'courses'} 
            />
            <NavItem 
              href="/admin/tests" 
              icon={<ClipboardList size={18} />} 
              label="Tests" 
              isActive={activeLink === 'tests'} 
            />
            <NavItem 
              href="/admin/users" 
              icon={<Users size={18} />} 
              label="Users" 
              isActive={activeLink === 'users'} 
            />

            <div className="my-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Reports
            </div>
            <NavItem 
              href="/admin/analytics" 
              icon={<PieChart size={18} />} 
              label="Analytics" 
              isActive={activeLink === 'analytics'} 
            />
            <NavItem 
              href="/admin/reports" 
              icon={<FileText size={18} />} 
              label="Reports" 
              isActive={activeLink === 'reports'} 
            />
            <NavItem 
              href="/admin/schedule" 
              icon={<Calendar size={18} />} 
              label="Schedule" 
              isActive={activeLink === 'schedule'} 
            />

            <div className="my-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              System
            </div>
            <NavItem 
              href="/admin/notifications" 
              icon={<Bell size={18} />} 
              label="Notifications" 
              isActive={activeLink === 'notifications'} 
              badge="4"
            />
            <NavItem 
              href="/admin/settings" 
              icon={<Settings size={18} />} 
              label="Settings" 
              isActive={activeLink === 'settings'} 
            />
          </nav>

          {/* User and Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">{session?.user?.name || session?.user?.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium rounded-lg bg-gray-800 hover:bg-red-600/20 transition-colors group"
            >
              <LogOut size={16} className="mr-2 text-gray-400 group-hover:text-red-400" />
              <span className="group-hover:text-red-400">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    );
  }

  // This should never render since middleware or useEffect should redirect
  return null;
}

// Helper component for navigation items
const NavItem = ({ href, icon, label, isActive, badge }) => (
  <Link 
    href={href}
    className={`flex items-center py-2.5 px-4 rounded-lg mb-1.5 transition-colors ${
      isActive 
        ? 'bg-green-600 text-white' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <div className="mr-3">{icon}</div>
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </Link>
);