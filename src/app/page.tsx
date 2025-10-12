
"use client";

import { useAuth } from "@/components/session-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardLayout, DashboardStats, DashboardProfileCard } from "@/modules/dashboard";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg font-medium opacity-80">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg font-medium opacity-80">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onSignOut={signOut}>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">
          Ready to collaborate and create something amazing?
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to Huddle AI
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Transform the way your team works together with our intelligent collaboration platform
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              + Start Collaboration
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats user={user} />

      {/* Profile Information Card */}
      <DashboardProfileCard user={user} />
    </DashboardLayout>
  );
}
