'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import React from 'react'

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
