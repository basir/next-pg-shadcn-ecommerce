'use client'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { signInDefaultValues } from '@/lib/constants'
import Link from 'next/link'

export default function CredentialsSignInForm() {
  const [data, action] = useFormState(signInWithCredentials, {
    message: '',
    success: false,
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/'

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        className="w-full bg-green-600/80 hover:bg-green-600 backdrop-blur-lg text-white font-bold rounded-full py-3 mt-4 transition-all"
        variant="default"
      >
        {pending ? 'Submitting...' : 'Sign In with credentials'}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="m@example.com"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
            className="bg-white/10 border border-white/20 text-white placeholder:text-gray-300 rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
            className="bg-white/10 border border-white/20 text-white placeholder:text-gray-300 rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-red-300">{data.message}</div>
        )}
        {!data && (
          <div className="text-center text-red-300">
            Unknown error happened.{' '}
            <Button
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
              onClick={() => window.location.reload()}
            >
              Please reload
            </Button>
          </div>
        )}

        <div className="text-sm text-center text-white/80">
          Don&apos;t have an account?{' '}
          <Link
            target="_self"
            className="font-semibold text-white underline underline-offset-4"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}
