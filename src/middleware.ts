import { authMiddleware, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { isAuthenticated} = getKindeServerSession();
    if (!isAuthenticated()) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()
  }

export const config = {
  matcher: ['/dashboard/:path*', '/auth-callback'],
}

export default authMiddleware
