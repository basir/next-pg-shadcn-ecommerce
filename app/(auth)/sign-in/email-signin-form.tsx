'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignInWithEmail } from '@/lib/actions/user.actions'
import { useFormStatus } from 'react-dom'

export default function EmailSigninForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? 'sending email...' : 'Sign In with email'}
      </Button>
    )
  }
  return (
    <form action={SignInWithEmail}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user_email">Email</Label>
          <Input
            id="user_email"
            name="email"
            placeholder="m@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <SignInButton />
        </div>
      </div>
    </form>
  )
}
