import { decodeAndVerifyJwtToken } from "@repo/api/utils/token";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  const getUserFromHeader = async () => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = await decodeAndVerifyJwtToken(token);
      return user;
    }
  };
  const user = await getUserFromHeader();
  return { req, res, user };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
