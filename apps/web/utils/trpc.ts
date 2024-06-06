import { option } from "@/libs/authOption";
import { AppRouter } from "@repo/api/router";
import { trpcErrorSchema, type TRPCError } from "@repo/api/utils/error";
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

/**
 * catchしたエラーがTRPCのエラーの場合に型を付けるエラーハンドラ
 * @param trpcErrorCallback TRPCのエラーの場合のCallback
 * @param anyCallback その他の場合のCallback
 * @returns エラーハンドル関数
 */
export const errorHandler = (
  trpcErrorCallback: (error: TRPCError) => void,
  anyCallback?: (error: unknown) => void
) => {
  return (error: unknown) => {
    const parsedError = trpcErrorSchema.safeParse(error);
    if (parsedError.success) {
      trpcErrorCallback(parsedError.data);
    } else {
      console.log(JSON.stringify(parsedError.error));
      anyCallback && anyCallback(error);
    }
  };
};
