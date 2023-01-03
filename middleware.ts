import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  console.log(session, error)
  // if (!session || error) {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  return res
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/event', '/contact'],
}
