import { decode } from "@repo/api/utils/jwt";

export const decodeAndVerifyJwtToken = async (token?: string) => {
  if (!token) {
    return undefined;
  }

  const decodedToken = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET ?? "",
  });

  return decodedToken ?? undefined;
};
