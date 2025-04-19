import { authMiddleware } from "@clerk/nextjs/server"

export default authMiddleware({
  publicRoutes: ["/", "/login", "/pricing"],
  ignoredRoutes: ["/api/webhook/stripe"],
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
