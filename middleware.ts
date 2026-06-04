import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? '')

const PROTECTED_PREFIXES = ['/dashboard']

const PROTECTED_API_PREFIXES = [
  '/api/agents',
  '/api/organizations',
  '/api/onboarding',
  '/api/pacientes',
  '/api/stripe/checkout',
  '/api/stripe/portal',
  '/api/whatsapp/accounts',
]

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const isDashboardRoute = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  const isProtectedApi = PROTECTED_API_PREFIXES.some(p => pathname.startsWith(p))

  // CSRF: reject cross-origin mutating requests to protected API routes.
  // SameSite=Lax already blocks most CSRF, but an explicit origin check adds defence-in-depth.
  if (isProtectedApi && MUTATING_METHODS.has(request.method)) {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  if (!isDashboardRoute && !isProtectedApi) {
    return NextResponse.next()
  }

  const token =
    request.cookies.get('auth_token')?.value ??
    request.cookies.get('auth-token')?.value

  if (!token) {
    if (isProtectedApi) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', String(payload.userId ?? ''))
    requestHeaders.set('x-org-id', String(payload.orgId ?? ''))
    requestHeaders.set('x-user-role', String(payload.role ?? ''))
    requestHeaders.set('x-user-email', String(payload.email ?? ''))

    return NextResponse.next({ request: { headers: requestHeaders } })
  } catch {
    if (isProtectedApi) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }
    // Clear both cookie name variants on expiry
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth_token')
    response.cookies.delete('auth-token')
    return response
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/agents/:path*',
    '/api/organizations/:path*',
    '/api/onboarding/:path*',
    '/api/pacientes/:path*',
    '/api/stripe/checkout',
    '/api/stripe/portal',
    '/api/whatsapp/accounts/:path*',
  ],
}
