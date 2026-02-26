import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { APP_NAME } from '@/lib/constants'

import CredentialsSignInForm from './credentials-signin-form'

export const metadata: Metadata = {
  title: `Sign In - ${APP_NAME}`,
}

export default async function SignIn({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string
  }
}) {
  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1592982537447-6f2a6a0a5b83?q=80&w=2000')] bg-cover bg-center bg-no-repeat p-6">
      <div className="w-[360px] h-[750px] border-[12px] border-gray-900 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col">
        <div className="absolute left-1/2 top-3 z-10 h-5 w-32 -translate-x-1/2 rounded-full bg-gray-900/90" />
        <div className="bg-black/40 backdrop-blur-md h-full w-full p-6 flex flex-col justify-center">
          <div className="mb-8 text-center space-y-3">
            <Link href="/home" className="inline-block text-white/90 text-sm font-semibold tracking-wide">
              {APP_NAME}
            </Link>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/80 text-sm">
              Sign in with your email and password
            </p>
          </div>
          <CredentialsSignInForm />
        </div>
      </div>
    </div>
  )
}
