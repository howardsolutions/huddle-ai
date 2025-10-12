"use client";

interface DashboardProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  };
}

export function DashboardProfileCard({ user }: DashboardProfileCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile Information
        </h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <span className="font-medium text-gray-600 mb-1 sm:mb-0">Full Name</span>
            <span className="text-gray-900 font-medium">{user.name}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <span className="font-medium text-gray-600 mb-1 sm:mb-0">Email Address</span>
            <span className="text-gray-900 font-medium">{user.email}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <span className="font-medium text-gray-600 mb-1 sm:mb-0">Email Verified</span>
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              user.emailVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.emailVerified ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Pending
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col py-3">
            <span className="font-medium text-gray-600 mb-2">User ID</span>
            <div className="font-mono text-sm bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg break-all text-gray-700">
              {user.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
