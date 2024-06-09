import { env } from "@/libs/env";
import { type JWT, encode } from "next-auth/jwt";

/**
 * ヘッダに不要するためにJWTを暗号化する。
 * @param jwt 暗号化するJWT
 * @returns
 */
export const encodeJwt = async (jwt: JWT) => {
  // ヘッダに設定するときは寿命を短くする。
  return await encode({
    token: jwt,
    secret: env.NEXTAUTH_SECRET,
    maxAge: 5 * 60,
  });
};
