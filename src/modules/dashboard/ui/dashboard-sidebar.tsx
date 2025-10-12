"use client";

import { DashboardNavItem } from "./dashboard-nav-item";
import Logo from "@/components/logo";
import { MdVideoCall, MdSmartToy, MdUpgrade } from "react-icons/md";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  };
  onSignOut: () => void;
}

const navigationItems = [
  {
    id: "meetings",
    label: "Meetings",
    href: "/meetings",
    icon: <MdVideoCall className="h-5 w-5" />,
    isActive: true,
  },
  {
    id: "agents",
    label: "Agents",
    href: "/agents",
    icon: <MdSmartToy className="h-5 w-5" />,
  },
  {
    id: "upgrade",
    label: "Upgrade",
    href: "/upgrade",
    icon: <MdUpgrade className="h-5 w-5" />,
  },
];

export function DashboardSidebar({ isOpen, onClose, user, onSignOut }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-primary/95 to-secondary/95 backdrop-blur-lg
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <Logo variant="mark" className="h-8 w-8 text-white" />
              <span className="text-xl font-semibold text-white">Huddle AI</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item) => (
              <DashboardNavItem
                key={item.id}
                {...item}
              />
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{user.name}</p>
                <p className="text-white/70 text-xs truncate">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
