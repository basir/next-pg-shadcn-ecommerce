import { Metadata } from 'next'

import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.actions'
import { APP_NAME } from '@/lib/constants'

import PaymentMethodForm from './payment-method-form'

export const metadata: Metadata = {
  title: `Payment Method - ${APP_NAME}`,
}

export default async function PaymentMethodPage() {
  const session = await auth()
  const user = await getUserById(session?.user.id!)
  return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
}
