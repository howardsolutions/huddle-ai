"use client";

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
}
