"use client";

import Link from "next/link";

export interface DashboardNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export function DashboardNavItem({ label, href, icon, isActive = false }: DashboardNavItem) {
  return (
    <Link href={href}>
      <div className={`
        flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
        ${isActive 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'text-white/80 hover:text-white hover:bg-white/10'
        }
      `}>
        <div className={`
          transition-colors duration-200
          ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}
        `}>
          {icon}
        </div>
        <span className="font-medium text-sm">{label}</span>
        {isActive && (
          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
        )}
      </div>
    </Link>
  );
}
