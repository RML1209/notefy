import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = [
  "/",
];

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/verify-email",
  "/verify-2fa",
  "/forgot-password",
  "/reset-password",
];

export default auth((req) => {
  const { nextUrl } = req;

  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  // Allow Auth.js API routes
  if (pathname.startsWith("/api/auth")) {
    return;
  }

  // Prevent authenticated users from visiting auth pages
  if (
    AUTH_ROUTES.includes(pathname) &&
    isLoggedIn
  ) {
    return Response.redirect(
      new URL("/dashboard", nextUrl)
    );
  }

  // Protect private routes
  if (
    !isLoggedIn &&
    !PUBLIC_ROUTES.includes(pathname) &&
    !AUTH_ROUTES.includes(pathname)
  ) {
    return Response.redirect(
      new URL("/login", nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};