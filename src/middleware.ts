import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse } from "./lib/helpers";
import { verifyJWT } from "./lib/token";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: number,
  };
};

let redirectToLogin = false;

export async function middleware(req: NextRequest){
  let token: string | undefined;
  if(req.cookies.has('token')) {
    token = req.cookies.get('token')?.value;
  } else if (req.headers.get('Authorization')?.startsWith('Bearer')) {
    token = req.headers.get('Authorization')?.substring(7);
  }
  if (req.nextUrl.pathname.startsWith('/login') && (!token || redirectToLogin))
    return;
  if (
    !token &&
    (req.nextUrl.pathname.startsWith('/api/users') ||
      req.nextUrl.pathname.startsWith('/api/auth/logout'))
  ) {
    return getErrorResponse(
      401,
      'Необходима авторизация, пожалуйста, войдите'
    );
  }
  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: number }>(token);
      response.headers.set('X-USER-ID', String(sub));
      (req as AuthenticatedRequest).user = { id: sub };
    }
  } catch (error) {
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith('/api')) {
      return getErrorResponse(401, 'Подпись недействительна или пользователь не существует');
    }
    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: 'badAuth' })}`, req.url)
    );
  }
  const authUser = (req as AuthenticatedRequest).user;

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: 'badAuth',
          forceLogin: 'true',
        })}`,
        req.url,
      )
    );
  }
  
  if (req.url.includes('/login') && authUser) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }
  return response;
}

export const config = {
  matcher: ['/profile', '/login', '/api/users/:path*', '/api/user/logout', '/api/admin/:path*'],
};