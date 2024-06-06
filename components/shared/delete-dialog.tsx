'use client'

import { useState, useTransition } from 'react'
import { useToast } from '../ui/use-toast'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

export default function DeleteDialog({
  id,
  action,
}: {
  id: string
  // eslint-disable-next-line no-unused-vars
  action: (id: string) => Promise<{ success: boolean; message: string }>
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const res = await action(id)
                if (!res.success) {
                  toast({
                    variant: 'destructive',
                    description: res.message,
                  })
                } else {
                  setOpen(false)
                  toast({
                    description: res.message,
                  })
                }
              })
            }
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
