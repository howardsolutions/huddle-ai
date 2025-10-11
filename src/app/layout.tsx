import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/session-provider";
import Logo from "@/components/logo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Huddle AI - Intelligent Collaboration Platform",
  description: "Transform the way your team works together with our intelligent collaboration platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Logo className="h-8 w-auto" />
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#" className="text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
                  About
                </a>
                <a href="#" className="text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
