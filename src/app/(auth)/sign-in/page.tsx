"use client";

import { authClient } from "@/auth-client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

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
      });
      
      if (error) {
        setError(error.message || "An unexpected error occurred");
      } else {
        console.log("Login successful:", result);
        // Redirect to dashboard or home page
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    console.log("Google login clicked");
  };

  const handleGithubLogin = () => {
    // TODO: Implement Github OAuth login
    console.log("Github login clicked");
  };

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
