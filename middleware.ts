import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)

  const res = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: {
      session
    }
  } = await supabase.auth.getSession()

  if (req.nextUrl.pathname === "/" || "/profile/*") {
    return res
  }
  
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