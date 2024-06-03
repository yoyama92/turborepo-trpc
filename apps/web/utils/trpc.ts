import { option } from "@/libs/authOption";
import { AppRouter } from "@repo/api/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getServerSession } from "next-auth";
import { encodeJwt } from "./token";

/**
 * サーバー処理用TRPCクライアント。
 * サーバーからリクエストする場合はAPIのホストを直接指定する。
 * ヘッダーの認証情報も付与する。
 */
const serverTRPCClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.API_HOST}/api/trpc`,
      headers: async () => {
        const session = await getServerSession(option);
        const token = session?.user;
        if (token) {
          const encodedJwt = await encodeJwt(token);
          return {
            Authorization: `Bearer ${encodedJwt}`,
          };
        }
        return {};
      },
    }),
  ],
});

/**
 * クライアント処理用のTRPCクライアント。
 * 認証情報はmiddlewareで設定するため、ホストは指定しない。
 */
const clientTRPCClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});

/**
 * クライアントかサーバーか判定してTRPCクライアントを取得する。
 */
const getTRPCClient = () => {
  if (typeof window === "undefined") {
    return serverTRPCClient;
  }
  return clientTRPCClient;
};

export const trpc = getTRPCClient();
