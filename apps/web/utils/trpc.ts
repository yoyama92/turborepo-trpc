import { option } from "@/libs/authOption";
import { env } from "@/libs/env";
import type { AppRouter } from "@repo/api/router";
import { type TRPCError, trpcErrorSchema } from "@repo/api/utils/error";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getServerSession } from "next-auth";
import { encodeJwt } from "./token";

/**
 * クライアントかサーバーか判定してTRPCクライアントを取得する。
 */
const getTrpcClient = () => {
  if (typeof window === "undefined") {
    // サーバー処理用TRPCクライアント。
    // サーバーからリクエストする場合はAPIのホストを直接指定する。
    // ヘッダーの認証情報も付与する。
    return createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${env.API_HOST}/api/trpc`,
          headers: async () => {
            const session = await getServerSession(option);
            const token = session?.user;
            if (token) {
              const encodedJwt = await encodeJwt(token);
              return {
                authorization: `Bearer ${encodedJwt}`,
              };
            }
            return {};
          },
        }),
      ],
    });
  }

  // クライアント処理用のTRPCクライアント
  // 認証情報はmiddlewareで設定するため、ホストは指定しない。
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });
};

export const trpc = getTrpcClient();

/**
 * catchしたエラーがTRPCのエラーの場合に型を付けるエラーハンドラ
 * @param trpcErrorCallback TRPCのエラーの場合のCallback
 * @param anyCallback その他の場合のCallback
 * @returns エラーハンドル関数
 */
export const errorHandler = (
  trpcErrorCallback: (error: TRPCError) => void,
  anyCallback: (error: unknown) => void = () => undefined,
) => {
  return (error: unknown) => {
    const parsedError = trpcErrorSchema.safeParse(error);
    if (parsedError.success) {
      trpcErrorCallback(parsedError.data);
    } else {
      anyCallback(error);
    }
  };
};
