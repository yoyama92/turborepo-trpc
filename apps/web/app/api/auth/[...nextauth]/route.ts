import NextAuth from "next-auth";
import { option } from "@/libs/authOption";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

/**
 * NextAuthに組み込まれたサインインページか判定する。
 * @param req リクエスト内容
 * @returns
 */
const isBuildInSignInPage = (req: NextApiRequest) => {
  if (req.method === "GET" && req.url && new URL(req.url).pathname.startsWith("/api/auth/signin")) {
    return true;
  }
  return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // NextAuthの組み込みサインインページは表示しないでホームにリダイレクトする。
  if (isBuildInSignInPage(req)) {
    const param = req.url ? new URL(req.url).searchParams.toString() : "";
    redirect(`/${param ? `?${param}` : ""}`);
  }

  return await NextAuth(req, res, option);
};

export { handler as GET, handler as POST };
