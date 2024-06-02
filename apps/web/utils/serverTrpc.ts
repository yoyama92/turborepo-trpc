import { option } from "@/libs/authOption";
import { AppRouter } from "@repo/api/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getServerSession } from "next-auth";
import { encode } from "next-auth/jwt";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.API_HOST}/api/trpc`,
      headers: async () => {
        const session = await getServerSession(option);
        const token = session?.user;
        if (token) {
          const encodedJwt = await encode({
            token: token,
            secret: process.env.NEXTAUTH_SECRET!,
            maxAge: 5 * 60,
          });
          return {
            Authorization: `Bearer ${encodedJwt}`,
          };
        }
        return {};
      },
    }),
  ],
});
