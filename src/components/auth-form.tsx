"use client";

import { authClient } from "@/auth-client";
import Logo from "@/components/logo";
import { useState } from "react";
import { z, ZodError, ZodIssue } from "zod";

// Zod validation schemas
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});



export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | undefined>("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    setErrors({});
    
    try {
      if (isLogin) {
        signInSchema.parse({
          email: formData.email,
          password: formData.password,
        });
      } else {
        signUpSchema.parse(formData);
      }
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err: ZodIssue) => {
          if (err.path && err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          } else {
            fieldErrors["general"] = "An unexpected error occurred";
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          setError(error.message);
        } else {
          console.log("Login successful:", data);
          // Redirect or update UI as needed
        }
      } else {
        const { data, error } = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        
        if (error) {
          setError(error.message);
        } else {
          console.log("Sign up successful:", data);
          // Redirect or update UI as needed
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-2xl w-full max-w-4xl rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Form Section */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-base-content mb-3">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-base-content/60 text-lg">
                  {isLogin ? "Login to your account" : "Sign up to get started"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-error mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {!isLogin && (
                <div className="form-control">
                  <label className={`input w-full input-bordered flex items-center gap-3 px-4 py-3 h-12 ${errors.name ? 'input-error' : 'input-primary'}`}>
                    <svg className="h-5 w-5 opacity-50 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      type="text"
                      className="grow bg-transparent placeholder:text-base-content/60 focus:outline-none"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </label>
                    {errors.name && (
                      <div className="label">
                        <span className="label-text-alt text-error">{errors.name}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="form-control">
                  <label className={`input w-full input-bordered flex items-center gap-3 px-4 py-3 h-12 ${errors.email ? 'input-error' : 'input-primary'}`}>
                    <svg className="h-5 w-5 opacity-50 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      className="grow bg-transparent placeholder:text-base-content/60 focus:outline-none"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </label>
                  {errors.email && (
                    <div className="label">
                      <span className="label-text-alt text-error">{errors.email}</span>
                    </div>
                  )}
                </div>
                
                <div className="form-control">
                  <label className={`input w-full input-bordered flex items-center gap-3 px-4 py-3 h-12 ${errors.password ? 'input-error' : 'input-primary'}`}>
                    <svg className="h-5 w-5 opacity-50 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type="password"
                      className="grow bg-transparent placeholder:text-base-content/60 focus:outline-none"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      minLength={6}
                    /> 
                  </label>
                  {errors.password && (
                    <div className="label">
                      <span className="label-text-alt text-error">{errors.password}</span>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full h-12 mt-6"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Loading...
                    </>
                  ) : (
                    isLogin ? "Sign In" : "Sign Up"
                  )}
                </button>
              </form>
              
              <div className="mt-10">
                <div className="divider text-base-content/50">Or continue with</div>
                
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="btn btn-link btn-sm text-primary hover:text-primary/80"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-gradient-to-br from-primary to-secondary lg:w-1/2 flex items-center justify-center p-8 lg:p-12 text-primary-content">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Logo variant="mark-white" className="h-48 w-48 lg:h-56 lg:w-56" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Huddle AI</h2>
                <p className="text-primary-content/80 text-lg font-medium">Intelligent Collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
