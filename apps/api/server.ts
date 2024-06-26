import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import helmet from "@fastify/helmet";
import { createContext } from "@repo/api/context";
import { appRouter, type AppRouter } from "@repo/api/router";

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

server.register(helmet);

server.register(fastifyTRPCPlugin, {
  prefix: "/api/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

(async () => {
  try {
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
