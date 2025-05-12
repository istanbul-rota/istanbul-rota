import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

async function auth(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Eğer kullanıcı giriş yapmışsa ve auth sayfalarına gitmeye çalışıyorsa
  if (
    user &&
    (request.nextUrl.pathname.endsWith("/sign-in") ||
      request.nextUrl.pathname.endsWith("/sign-up") ||
      request.nextUrl.pathname.endsWith("/forgot-password") ||
      request.nextUrl.pathname.endsWith("/reset-password"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Önce auth kontrolü
  const authResponse = await auth(request);
  if (authResponse.headers.has("location")) {
    return authResponse;
  }

  // Sonra i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // i18n routes
    "/((?!api|trpc|_next|_vercel|studio|.*\\..*).*)",
    // auth routes
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ],
};
