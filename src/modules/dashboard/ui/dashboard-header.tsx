"use client";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Menu button for mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right side - Empty space for future header actions */}
        <div className="hidden lg:block"></div>
      </div>
    </header>
  );
}
