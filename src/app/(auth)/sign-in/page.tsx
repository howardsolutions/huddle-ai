"use client";

import { authClient, signInWithGithub, signInWithGoogle } from "@/auth-client";
import {
  AuthButton,
  AuthLayout,
  EmailIcon,
  ErrorAlert,
  FormInput,
  LockIcon,
  signInSchema,
  type SignInFormData
} from "@/modules/auth/ui";
import { useAuth } from "@/components/session-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { user, loading } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: SignInFormData) => {
    setError("");

    try {
      const { data: result, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/", // Better Auth will handle the redirect
      });
      
      if (error) {
        setError(error.message || "An unexpected error occurred");
      } else {
        console.log("Login successful:", result);
        // Better Auth will handle the redirect automatically
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle({
        callbackURL: "/", // Redirect to home page after successful login
      });
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error("Google login error:", err);
    }
  };

  const handleGithubLogin = async () => {
    setError("");
    try {
      await signInWithGithub({
        callbackURL: "/", // Redirect to home page after successful login
      });
    } catch (err) {
      setError("Failed to sign in with GitHub");
      console.error("GitHub login error:", err);
    }
  };

  // Show loading while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // Don't render if user is logged in (redirect will happen)
  if (user) {
    return null;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to your account"
      showSocialLogin={true}
      onGoogleLogin={handleGoogleLogin}
      onGithubLogin={handleGithubLogin}
    >
      {/* Error Message */}
      <ErrorAlert message={error} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
          icon={<EmailIcon />}
          required
        />
        
        <FormInput
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          icon={<LockIcon />}
          required
          minLength={6}
        />
        
        <AuthButton loading={isSubmitting}>
          Sign In
        </AuthButton>
      </form>
      
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={() => router.push("/sign-up")}
          className="btn btn-link text-base text-primary hover:text-primary/80"
        >
          Don&apos;t have an account? Sign up
        </button>
      </div>
    </AuthLayout>
  );
}
