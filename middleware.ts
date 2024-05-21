export { auth as middleware } from '@/auth'
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_next/assets|favicon.ico).*)'],
}
