"use client";

import Logo from "@/components/logo";
import { ReactNode } from "react";
import { GoogleButton, GithubButton } from "./social-buttons";
import { GoogleIcon, GithubIcon } from "./icons";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  showSocialLogin?: boolean;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showSocialLogin = true,
  onGoogleLogin,
  onGithubLogin 
}: AuthLayoutProps) {
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
                  {title}
                </h1>
                <p className="text-base-content/60 text-lg">
                  {subtitle}
                </p>
              </div>

              {children}

              {/* Social Login Section */}
              {showSocialLogin && (
                <div className="mt-10">
                  <div className="divider text-base-content/50">Or continue with</div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <GoogleButton onClick={onGoogleLogin}>
                      <GoogleIcon />
                      <span className="hidden sm:inline">Google</span>
                    </GoogleButton>
                    
                    <GithubButton onClick={onGithubLogin}>
                      <GithubIcon />
                      <span className="hidden sm:inline">Github</span>
                    </GithubButton>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-gradient-to-br from-primary to-secondary lg:w-1/2 flex items-center justify-center p-8 lg:p-12 text-primary-content">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Logo variant="auth" className="h-[36rem] w-[36rem] lg:h-[44rem] lg:w-[44rem] drop-shadow-2xl" />
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}
