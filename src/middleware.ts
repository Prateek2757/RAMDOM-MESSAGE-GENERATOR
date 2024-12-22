import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  const isPublicPath = ["/signin", "/signup", "/verify"].includes(path);

  if (isPublicPath && token) {
    // If already signed in and trying to access public pages, redirect to home
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // If trying to access private pages without a token, redirect to login
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  return NextResponse.next(); // Continue if no issues
}

export const config = {
  matcher: ["/signin", "/signup", "/", "/dashboard/:path*", "/verify/:path*"],
};
