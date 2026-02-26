import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          cache: 'no-store',
        })
        if (!response.ok) {
          return null
        }
        const data = await response.json()
        const apiName =
          typeof data?.name === 'string' && data.name.trim()
            ? data.name.trim()
            : typeof data?.username === 'string' && data.username.trim()
              ? data.username.split('@')[0]
              : (credentials.email as string)?.split('@')[0] ?? 'User'

        return {
          id: (data?.username as string) || (credentials.email as string),
          name: apiName,
          email: (data?.username as string) || (credentials.email as string),
          role: data?.role ?? 'ROLE_USER',
          accessToken: data?.token ?? null,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        token.sub = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
        token.accessToken = user.accessToken
      }

      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name
      }

      return token
    },
    session: async ({ session, user, trigger, token }: any) => {
      session.user.id = token.sub
      session.user.name = token.name
      session.user.role = token.role
      session.accessToken = token.accessToken
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false
      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()
        const newRequestHeaders = new Headers(request.headers)
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        })
        response.cookies.set('sessionCartId', sessionCartId)
        return response
      } else {
        return true
      }
    },
  },
} satisfies NextAuthConfig
export const { handlers, auth, signIn, signOut } = NextAuth(config)
