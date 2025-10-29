import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: "sb-luxima-auth-token",
        domain: process.env.NODE_ENV === "development" ? ".localhost" : ".luxima.id",
        secure: true,
        path: "/",
        sameSite: "lax",
      },
      cookies: {
        getAll: () =>
          req.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          })),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set({
              name,
              value,
              ...options,
              //domain: '.luxima.id',
              domain: process.env.NODE_ENV === "development" ? ".localhost" : ".luxima.id",
              path: '/',
              sameSite: 'lax',
              secure: true,
            });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
  //   const redirectUrl = new URL(process.env.AUTH_URL!, req.url);
  //   redirectUrl.searchParams.set('redirectTo', req.nextUrl.href);
  //   return NextResponse.redirect(redirectUrl);
  // }

  if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
    // ✅ Gunakan host header agar dapat hostname aktual
    const protocol = req.headers.get('x-forwarded-proto') ?? 'https';
    const host = req.headers.get('host'); // ex: app.luxima.id
    const fullUrl = `${protocol}://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;

    const redirectUrl = new URL(process.env.AUTH_URL!);
    redirectUrl.searchParams.set('redirectTo', fullUrl);

    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|static).*)'],
};
