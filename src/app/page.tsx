
"use client";

import { useAuth } from "@/components/session-provider";
import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";

export default function Home() {
  const { user, loading, signOut } = useAuth();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {user ? (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Hero Section */}
          <div className="hero bg-gradient-to-r from-primary to-secondary rounded-3xl text-primary-content mb-12 p-12">
            <div className="hero-content text-center max-w-2xl">
              <div className="mb-8">
                <Logo variant="mark" className="mx-auto h-20 w-20" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
                Ready to collaborate and create something amazing?
              </p>
              <button
                onClick={signOut}
                className="btn btn-outline btn-primary-content btn-lg px-8"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="stat bg-base-100 shadow-lg rounded-2xl">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title">Account Status</div>
              <div className="stat-value text-primary">Active</div>
              <div className="stat-desc">Ready to collaborate</div>
            </div>

            <div className="stat bg-base-100 shadow-lg rounded-2xl">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
              </div>
              <div className="stat-title">Email Status</div>
              <div className="stat-value text-secondary">
                {user.emailVerified ? "Verified" : "Pending"}
              </div>
              <div className="stat-desc">
                {user.emailVerified ? "All set!" : "Check your email"}
              </div>
            </div>

            <div className="stat bg-base-100 shadow-lg rounded-2xl">
              <div className="stat-figure text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293h11.172a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div className="stat-title">Member Since</div>
              <div className="stat-value text-accent">Today</div>
              <div className="stat-desc">Welcome to the team!</div>
            </div>

            <div className="stat bg-base-100 shadow-lg rounded-2xl">
              <div className="stat-figure text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title">Security</div>
              <div className="stat-value text-info">Protected</div>
              <div className="stat-desc">Your data is safe</div>
            </div>
          </div>

          {/* Profile Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Information
              </h2>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold">User ID</td>
                      <td className="font-mono text-sm bg-base-200 px-2 py-1 rounded">{user.id}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Full Name</td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Email Address</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Email Verified</td>
                      <td>
                        <div className="badge badge-outline">
                          {user.emailVerified ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Verified
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Pending
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
