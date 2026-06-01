import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GUEST_ROUTES = ["/login", "/register"];

const PROTECTED_ROUTES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isGuestOnly = GUEST_ROUTES.some((route) => pathname.startsWith(route));

  if (token && isGuestOnly) {
    return NextResponse.redirect(new URL("/events", request.url));
  }

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
