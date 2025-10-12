"use client";

import { authClient, signInWithGithub, signInWithGoogle } from "@/auth-client";
import {
  AuthButton,
  AuthLayout,
  ErrorAlert,
  FormInput,
  signUpSchema,
  type SignUpFormData
} from "@/modules/auth/ui";
import { useAuth } from "@/components/session-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
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
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError("");

    try {
      const { data: result, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/", // Better Auth will handle the redirect
      });
      
      if (error) {
        setError(error.message || "An unexpected error occurred");
      } else {
        console.log("Sign up successful:", result);
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
      title="Let's get started"
      subtitle="Create your account"
      showSocialLogin={true}
      onGoogleLogin={handleGoogleLogin}
      onGithubLogin={handleGithubLogin}
    >
      {/* Error Message */}
      <ErrorAlert message={error} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          type="text"
          label="Name"
          placeholder="huddleai"
          {...register("name")}
          error={errors.name?.message}
          required
        />

        <FormInput
          type="email"
          label="Email"
          placeholder="huddleai@"
          {...register("email")}
          error={errors.email?.message}
          required
        />
        
        <FormInput
          type="password"
          label="Password"
          placeholder="********"
          {...register("password")}
          error={errors.password?.message}
          required
          minLength={6}
        />

        <FormInput
          type="password"
          label="Confirm Password"
          placeholder="********"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          required
          minLength={6}
        />
        
        <AuthButton loading={isSubmitting}>
          Sign in
        </AuthButton>
      </form>
      
      <div className="text-center mt-6">
        <span className="text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/sign-in")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </button>
        </span>
      </div>

      <div className="text-center mt-8 text-xs text-gray-500">
        By clicking continue, you agree to our Terms of Service and Privacy Policy
      </div>
    </AuthLayout>
  );
}
