import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// OAuth methods
export const signInWithGithub = (options?: { callbackURL?: string }) => 
  authClient.signIn.social({ provider: "github", callbackURL: options?.callbackURL });

export const signInWithGoogle = (options?: { callbackURL?: string }) => 
  authClient.signIn.social({ provider: "google", callbackURL: options?.callbackURL });
