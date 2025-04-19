// src/middleware.ts
import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  publicRoutes: ['/', '/login', '/pricing'],
  ignoredRoutes: ['/api/webhook/stripe'],
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
