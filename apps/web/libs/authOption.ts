import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const option: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};
