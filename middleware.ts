import { MiddlewareConfig } from "next/server";
import { auth } from "@/app/_lib/auth";

/* export function middleware(request: Request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
} */

export { auth as middleware };

export const config: MiddlewareConfig = {
  matcher: ["/account"],
};
