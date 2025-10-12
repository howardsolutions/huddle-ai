"use client";

import { authClient } from "@/auth-client";
import {
  AuthButton,
  AuthLayout,
  EmailIcon,
  ErrorAlert,
  FormInput,
  LockIcon,
  signUpSchema,
  UserIcon,
  type SignUpFormData
} from "@/modules/auth/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

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
      });
      
      if (error) {
        setError(error.message || "An unexpected error occurred");
      } else {
        console.log("Sign up successful:", result);
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
          placeholder="antonio"
          {...register("name")}
          error={errors.name?.message}
          required
        />

        <FormInput
          type="email"
          label="Email"
          placeholder="antonio@"
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
