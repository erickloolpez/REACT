import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const config = {
  matcher: [
    '/login:path*',
    '/signup:path*'
  ]
}

export default function middlaware(request: NextRequest) {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  if (accessToken) {
    return NextResponse.redirect(new URL('/store', request.url));
  }
}