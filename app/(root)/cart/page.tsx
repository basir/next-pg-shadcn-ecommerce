import { getMyCart } from '@/lib/actions/cart.actions'
import CartForm from './cart-form'
import { APP_NAME } from '@/lib/constants'

export const metadata = {
  title: `Shopping Cart - ${APP_NAME}`,
}

export default async function CartPage() {
  const cart = await getMyCart()

  return <CartForm cart={cart} />
}
