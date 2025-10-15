# tRPC Setup for Next.js

This project has been configured with tRPC following the official Next.js documentation. Here's what has been set up:

## 📁 File Structure

```
src/
├── trpc/
│   ├── init.ts              # tRPC initialization and context
│   ├── client.tsx           # Client-side tRPC provider
│   └── routers/
│       └── _app.ts          # Main app router
├── app/
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts # API route handler
└── components/
    └── trpc-test.tsx        # Example component using tRPC
```

## 🚀 What's Configured

### 1. **Server Setup** (`src/trpc/init.ts`)
- tRPC initialization with superjson transformer
- Context creation for request handling
- Error formatting with Zod validation
- Router and procedure exports

### 2. **API Route** (`src/app/api/trpc/[trpc]/route.ts`)
- Next.js App Router API handler
- Handles both GET and POST requests
- Development error logging

### 3. **Client Setup** (`src/trpc/client.tsx`)
- React Query integration
- Client-side tRPC provider
- Automatic URL detection for different environments

### 4. **App Integration** (`src/app/layout.tsx`)
- tRPC provider wrapped around the entire app
- Proper provider hierarchy

## 🧪 Example Usage

### Server-side Router (`src/trpc/routers/_app.ts`)
```typescript
import { createTRPCRouter, publicProcedure } from '../init';
import { z } from 'zod';

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}!`,
      };
    }),
});
```

### Client-side Usage (`src/components/trpc-test.tsx`)
```typescript
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
```

## 📦 Dependencies Added

- `@trpc/react-query` - React Query integration
- `superjson` - Data transformation for complex types
- Updated `@tanstack/react-query` to compatible version

## 🔧 Key Features

1. **Type Safety**: Full end-to-end type safety from server to client
2. **Automatic Serialization**: Superjson handles complex data types
3. **Error Handling**: Proper error formatting with Zod validation
4. **SSR Support**: Works with Next.js App Router
5. **Development Tools**: Error logging in development mode

## 🎯 Next Steps

1. **Add more routers**: Create feature-specific routers in `src/trpc/routers/`
2. **Authentication**: Add auth context to `createTRPCContext`
3. **Database integration**: Connect your database in the context
4. **Mutations**: Add mutation procedures for data changes
5. **Subscriptions**: Add real-time features if needed

## 🧪 Testing the Setup

To test the setup, you can:

1. Add the `<TRPCTest />` component to any page
2. Run `npm run dev`
3. Check the browser console for any errors
4. The component should display "Hello from tRPC!"

## 📚 Resources

- [tRPC Documentation](https://trpc.io/)
- [Next.js tRPC Guide](https://trpc.io/docs/nextjs)
- [React Query Documentation](https://tanstack.com/query/latest)
