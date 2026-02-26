import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
    accessToken?: string
  }

  export interface User {
    role?: string
    accessToken?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    accessToken?: string | null
  }
}
