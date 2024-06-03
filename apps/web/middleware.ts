import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { encodeJwt } from "./utils/token";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const apiHost = new URL(process.env.API_HOST ?? request.url);

  url.port = apiHost.port;
  url.hostname = apiHost.hostname;
  const response = NextResponse.rewrite(url);

  const jwt = await getToken({ req: request });
  if (jwt) {
    const encodedJwt = await encodeJwt(jwt);

    response.headers.set("authorization", `Bearer ${encodedJwt}`);
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/trpc/:path*",
};
