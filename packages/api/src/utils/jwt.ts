import crypto from "node:crypto";
import { type JWTPayload, jwtDecrypt } from "jose";

export const decode = async <Jwt extends JWTPayload = JWTPayload>(params: {
  token?: string;
  secret: string;
  salt?: string;
}): Promise<Jwt | null> => {
  const { token, secret, salt = "" } = params;
  if (!token) {
    return null;
  }
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  const { payload } = await jwtDecrypt<Jwt>(token, encryptionSecret, {
    clockTolerance: 15,
  });
  return payload;
};

const getDerivedEncryptionKey = async (keyMaterial: string | Buffer, salt: string): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    crypto.hkdf(
      "sha256",
      keyMaterial,
      salt,
      `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`,
      32,
      (err, arrayBuffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Uint8Array(arrayBuffer));
        }
      },
    );
  });
};
