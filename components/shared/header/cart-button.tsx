import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getMyCart } from '@/lib/actions/cart.actions'

export default async function CartButton() {
  const cart = await getMyCart()
  return (
    <Button asChild variant="ghost">
      <Link href="/cart">
        <ShoppingCart className="mr-1" />
        Cart
        {cart && cart.items.length > 0 && (
          <Badge className="ml-1">
            {cart.items.reduce((a, c) => a + c.qty, 0)}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
