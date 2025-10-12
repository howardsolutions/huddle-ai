"use client";

import { ReactNode } from "react";

interface SocialButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function GoogleButton({ onClick, children, className }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-12 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors ${className || ""}`}
    >
      {children}
    </button>
  );
}

export function GithubButton({ onClick, children, className }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-12 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors ${className || ""}`}
    >
      {children}
    </button>
  );
}
