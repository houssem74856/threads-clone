import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-pathname", req.nextUrl.pathname)

  const res = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  if (req.nextUrl.pathname === "/") {
    return res
  }

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: {
      session
    }
  } = await supabase.auth.getSession()
  
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}