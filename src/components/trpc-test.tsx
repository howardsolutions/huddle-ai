'use client';

import { api } from '@/trpc/client';

export function TRPCTest() {
  const hello = api.hello.useQuery({ text: 'from tRPC!' });

  if (hello.isLoading) return <div>Loading...</div>;
  if (hello.error) return <div>Error: {hello.error.message}</div>;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">tRPC Test</h3>
      <p className="text-gray-600">{hello.data?.greeting}</p>
    </div>
  );
}
