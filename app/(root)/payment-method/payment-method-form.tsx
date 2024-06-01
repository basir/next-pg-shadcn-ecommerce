'use client'

import CheckoutSteps from '@/components/shared/checkout-steps'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { updateUserPaymentMethod } from '@/lib/actions/user.actions'
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants'
import { paymentMethodSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function PaymentMethodForm({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  })

  const [isPending, startTransition] = useTransition()

  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values)
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
        return
      }
      router.push('/place-order')
    })
  }

  return (
    <>
      <CheckoutSteps current={2} />
      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <h1 className="h2-bold mt-4">Payment Method</h1>
            <p className="text-sm text-muted-foreground">
              Please select your preferred payment method
            </p>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-2"
                      >
                        {PAYMENT_METHODS.map((paymentMethod) => (
                          <FormItem
                            key={paymentMethod}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={paymentMethod}
                                checked={field.value === paymentMethod}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {paymentMethod}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
