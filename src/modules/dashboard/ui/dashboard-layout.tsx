"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardContent } from "./dashboard-content";
import { DashboardNavbar } from "./dashboard-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string;
  };
  onSignOut: () => void;
}

export function DashboardLayout({ children, user, onSignOut }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    // On mobile, toggle the sidebar open/closed state
    // On desktop, toggle the collapsed state
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onSignOut={onSignOut}
      />

      {/* Main Content Area */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Navbar */}
        <DashboardNavbar 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
          isSidebarOpen={sidebarOpen}
        />

        {/* Content */}
        <DashboardContent>
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}
