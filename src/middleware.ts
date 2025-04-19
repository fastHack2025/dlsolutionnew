import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/login", "/pricing"],
  ignoredRoutes: ["/api/webhook/stripe"]
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
}
