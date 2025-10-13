"use client";

import { useState } from "react";

interface AvatarProps {
  user: {
    name: string;
    image?: string;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ user, size = "md", className = "" }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm", 
    lg: "w-12 h-12 text-base"
  };

  const baseClasses = `${sizeClasses[size]} bg-white/20 rounded-full flex items-center justify-center text-white font-medium`;

  // If user has an image and it hasn't failed to load, show the image
  if (user.image && !imageError) {
    return (
      <div className={`${baseClasses} overflow-hidden ${className}`}>
        <img
          src={user.image}
          alt={`${user.name}'s avatar`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Fallback to initials
  return (
    <div className={`${baseClasses} ${className}`}>
      <span>
        {user.name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
