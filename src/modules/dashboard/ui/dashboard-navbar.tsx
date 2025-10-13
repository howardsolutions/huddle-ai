"use client";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
  onOpenSearch: () => void;
}

export function DashboardNavbar({ onToggleSidebar, isSidebarCollapsed, isMobile, isSidebarOpen, onOpenSearch }: DashboardNavbarProps) {

  return (
    <header className="bg-base-100 border-b border-base-300 shadow-sm">
      <div className="navbar px-4 lg:px-6">
        <div className="navbar-start">
          {/* Sidebar Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label={
              isMobile 
                ? (isSidebarOpen ? "Close sidebar" : "Open sidebar")
                : (isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar")
            }
          >
            {isMobile ? (
              // Mobile: Show hamburger or X icon based on sidebar state
              isSidebarOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )
            ) : (
              // Desktop: Show hamburger icon (always the same)
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Center - Search */}
        <div className="navbar-center">
          <div className="relative w-full max-w-2xl">
            <div className="join w-full">
              <div className="join-item">
                <button 
                  onClick={onOpenSearch} 
                  className="btn btn-primary rounded-l-2xl h-12 px-4 hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search meetings, agents, or anything..."
                onClick={onOpenSearch}
                readOnly
                className="input input-bordered join-item flex-1 cursor-pointer rounded-r-2xl h-12 text-base placeholder:text-base-content/60 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 pr-20 bg-base-100/80 backdrop-blur-sm"
              />
            </div>
            {/* Keyboard shortcut indicator */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <kbd className="kbd kbd-sm text-sm text-base-content/50 hidden sm:inline-flex bg-base-200/50 border-base-300/50 shadow-sm">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right side - Future user actions */}
        <div className="navbar-end">
          {/* Placeholder for future user actions */}
        </div>
      </div>
    </header>
  );
}

