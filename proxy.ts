import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {
  apiAuthPrefix,
  authRoutes, 
  publicRoutes,
  publicRoutePrefixes,
  AdminPrefix,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicRoutePrefixes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith(AdminPrefix);
  const userRole = req.auth?.user?.role
  
  if(isApiAuthRoute) {
    return null;
  }

  if(isAuthRoute) {
    if(isLoggedIn) {
      const redirectPath = userRole === "ADMIN" ? "/admin/products" : "/settings";
      return Response.redirect(new URL(redirectPath, nextUrl));
    }
    return null;
  }

  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  if (isAdminRoute && userRole !== "ADMIN") {
            return Response.redirect(new URL("/settings", nextUrl)); 
  }

  if (nextUrl.pathname.startsWith('/settings') && userRole === "ADMIN") {
    return Response.redirect(new URL("/admin/dashboard", nextUrl));
  }
    
  return null;
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
;