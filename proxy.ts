import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {
  apiAuthPrefix,
  authRoutes, 
  publicRoutes,
  apiAdminPrefix
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith(apiAdminPrefix);
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

  if(isLoggedIn && nextUrl.pathname === "/") {
    const redirectPath = userRole === "ADMIN" ? "/admin/products" : "/settings";
    return Response.redirect(new URL(redirectPath, nextUrl));
  }
  if (nextUrl.pathname.startsWith('/settings') && userRole === "ADMIN") {
    return Response.redirect(new URL("/admin/products", nextUrl));
  }
    
  return null;
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ico|woff2?|docx?|xlsx?|zip)|api|trpc).*)',
    '/(api|trpc)(.*)',],
}