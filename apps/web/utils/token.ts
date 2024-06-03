import { JWT, encode } from "next-auth/jwt";

/**
 * ヘッダに不要するためにJWTを暗号化する。
 * @param jwt 暗号化するJWT
 * @returns
 */
export const encodeJwt = async (jwt: JWT) => {
  // ヘッダに設定するときは寿命を短くする。
  return await encode({
    token: jwt,
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 5 * 60,
  });
};
