"use client";

import { ReactNode } from "react";

interface AuthButtonProps {
  type?: "button" | "submit";
  loading?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function AuthButton({
  type = "submit",
  loading = false,
  children,
  onClick,
  className = "w-full h-12 mt-6 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
}: AuthButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={className}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
