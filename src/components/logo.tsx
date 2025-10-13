import Image from 'next/image';

interface LogoProps {
  variant?: "full" | "mark" | "mark-white" | "auth";
  className?: string;
}

export default function Logo({ variant = "full", className = '' }: LogoProps) {
  const baseClasses = 'transition-all duration-200 hover:scale-105';
  const combinedClassName = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  if (variant === "auth") {
    return (
      <Image
        src="/huddle-ai-logo-auth.svg"
        alt="Huddle AI - Intelligent Collaboration Platform"
        width={200}
        height={60}
        className={combinedClassName}
        priority
      />
    );
  }

  if (variant === "mark") {
    return (
      <div className={`w-8 h-8 flex items-center justify-center ${combinedClassName}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Central white circle */}
          <circle cx="12" cy="12" r="6" fill="white"/>
          {/* Top-left dark blue circle */}
          <circle cx="8" cy="8" r="5" fill="#1e3a8a"/>
          {/* Top-right purple circle */}
          <circle cx="16" cy="8" r="5" fill="#9333ea"/>
          {/* Bottom-right orange circle */}
          <circle cx="16" cy="16" r="5" fill="#f97316"/>
          {/* Bottom-left pink circle */}
          <circle cx="8" cy="16" r="5" fill="#ec4899"/>
        </svg>
      </div>
    );
  }

  return (
    <Image
      src='/huddle-ai-logo.svg'
      alt='Huddle AI - Intelligent Collaboration Platform'
      width={200}
      height={60}
      className={combinedClassName}
      priority
    />
  );
}
