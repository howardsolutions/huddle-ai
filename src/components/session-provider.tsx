"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
}

interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: Date;
    token: string;
  };
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.session && data?.user) {
          setSession(data as Session);
          setUser(data.user as User);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a SessionProvider");
  }
  return context;
}
