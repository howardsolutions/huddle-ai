"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "info" | "warning" | "success";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, description, icon, color, trend }: StatCardProps) {
  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-purple-600", 
    accent: "text-orange-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
    success: "text-green-600",
  };

  const bgColorClasses = {
    primary: "bg-blue-50",
    secondary: "bg-purple-50", 
    accent: "bg-orange-50",
    info: "bg-blue-50",
    warning: "bg-yellow-50",
    success: "bg-green-50",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${bgColorClasses[color]} flex items-center justify-center`}>
          <div className={colorClasses[color]}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <svg 
              className={`h-3 w-3 mr-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className={`text-xl font-semibold ${colorClasses[color]}`}>{value}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  };
}

export function DashboardStats({ user }: DashboardStatsProps) {
  const stats = [
    {
      title: "Account Status",
      value: "Active",
      description: "Ready to collaborate",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: "primary" as const,
    },
    {
      title: "Email Status",
      value: user.emailVerified ? "Verified" : "Pending",
      description: user.emailVerified ? "All set!" : "Check your email",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
        </svg>
      ),
      color: user.emailVerified ? ("success" as const) : ("warning" as const),
    },
    {
      title: "Member Since",
      value: "Today",
      description: "Welcome to the team!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293h11.172a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      ),
      color: "accent" as const,
    },
    {
      title: "Security",
      value: "Protected",
      description: "Your data is safe",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: "info" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
