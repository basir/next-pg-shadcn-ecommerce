import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'

async function saveSettings(formData: FormData) {
  'use server'
  console.log('Mock settings save payload:', {
    name: formData.get('name'),
    email: formData.get('email'),
  })
}

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/sign-in?callbackUrl=%2Fsettings')
  }

  return (
    <div className="wrapper py-8">
      <div className="grid gap-6 rounded-2xl border border-[#d7e3cc] bg-white p-6 shadow-sm md:grid-cols-[220px_1fr]">
        <aside className="space-y-2 border-b border-[#e4eadc] pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#5f6b57]">
            Settings
          </p>
          <button
            type="button"
            className="w-full rounded-md bg-[#ecf7ef] px-3 py-2 text-left text-sm font-semibold text-[#137b40]"
          >
            Personal Info
          </button>
          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[#1f2937] hover:bg-[#f4f8ef]"
          >
            Security
          </button>
        </aside>

        <section className="space-y-5">
          <div>
            <h1 className="text-2xl font-black text-[#102238]">Personal Info</h1>
            <p className="text-sm text-[#5f6b57]">
              Update your profile details. Save button is mocked in this pass.
            </p>
          </div>

          <form action={saveSettings} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={session.user?.name || ''}
                className="border-[#d8e3d0]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={session.user?.email || ''}
                className="border-[#d8e3d0]"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#168a46] text-white hover:bg-[#12773c]"
            >
              Save Changes
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}
