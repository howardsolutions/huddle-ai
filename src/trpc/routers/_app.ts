
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

// export type definition of API
export type AppRouter = typeof appRouter;
