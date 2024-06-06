import { z } from "zod";

/**
 * TRPCからのエラーのスキーマ定義。
 * ライブラリのクラスと合わせる。
 */
export const trpcErrorSchema = z.object({
  meta: z.object({
    responseJSON: z.array(
      z.object({
        error: z.object({
          message: z.string(),
          data: z.object({
            httpStatus: z.number(),
          }),
        }),
      })
    ),
  }),
});

export type TRPCError = z.infer<typeof trpcErrorSchema>;
