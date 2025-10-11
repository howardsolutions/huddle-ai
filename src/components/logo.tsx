import Image from "next/image";

interface LogoProps {
  variant?: "full" | "mark" | "mark-white";
  className?: string;
}

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  const baseClasses = "transition-all duration-200 hover:scale-105";
  const combinedClassName = className ? `${baseClasses} ${className}` : baseClasses;

  if (variant === "mark") {
    return (
      <Image
        src="/huddle-ai-logo-mark.svg"
        alt="Huddle AI"
        width={48}
        height={48}
        className={combinedClassName}
        priority
      />
    );
  }

  if (variant === "mark-white") {
    return (
      <Image
        src="/huddle-ai-logo-mark-white.svg"
        alt="Huddle AI"
        width={48}
        height={48}
        className={combinedClassName}
        priority
      />
    );
  }

  return (
    <Image
      src="/huddle-ai-logo.svg"
      alt="Huddle AI - Intelligent Collaboration Platform"
      width={200}
      height={60}
      className={combinedClassName}
      priority
    />
  );
}
