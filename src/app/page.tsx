'use client';

import { useAuth } from '@/components/session-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to meetings (default dashboard page)
        router.push('/meetings');
      } else {
        // User is not authenticated, redirect to sign-in
        router.push('/sign-in');
      }
    }
  }, [user, loading, router]);

  // Show loading state while determining authentication status
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10'>
      <div className='text-center'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
        <p className='mt-4 text-lg font-medium opacity-80'>Loading...</p>
      </div>
    </div>
  );
}
