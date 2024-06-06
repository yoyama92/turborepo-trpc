import { TRPCError, initTRPC } from "@trpc/server";

import { z } from "zod";
import { Context } from "@repo/api/context";

type User = {
  id: string;
  name: string;
  bio?: string;
};

const users: Record<string, User> = {};

const t = initTRPC.context<Context>().create();

const protectedProcedure = t.procedure.use((opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "認証エラー" });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const appRouter = t.router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  getUsers: t.procedure.query(() => {
    return users;
  }),
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
        bio: z.string().max(142).optional(),
      })
    )
    .mutation((opts) => {
      const id = Date.now().toString();
      const user: User = { id, ...opts.input };
      users[user.id] = user;
      return user;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
