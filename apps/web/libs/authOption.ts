import { env } from "@/libs/env";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const option: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};
