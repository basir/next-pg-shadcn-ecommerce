import AddToCart from '@/components/shared/product/add-to-cart'
import ProductImages from '@/components/shared/product/product-images'
import ProductPrice from '@/components/shared/product/product-price'
import QuickViewModalWrapper from '@/components/shared/product/quickview-modal-wrapper'
import Rating from '@/components/shared/product/rating'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getProductBySlug } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import ReloadButton from './reload-button'

export default async function StorefrontProductQuickView(props: {
  params: { slug: string }
}) {
  const product = await getProductBySlug(props.params.slug)
  if (!product) return notFound()
  const cart = await getMyCart()
  return (
    <QuickViewModalWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center md:items-start justify-start md:grid md:grid-cols-9 gap-8">
          <div className="col-span-4 w-full">
            <ProductImages images={product.images!} />
          </div>
          <div className="md:col-span-5 w-full flex flex-col gap-2">
            <h3 className="h3-bold">{product.name}</h3>
            <p>{product.description}</p>

            <div className="flex items-center gap-4">
              <Rating value={Number(product.rating)} />
              {product.stock > 0 ? (
                <ProductPrice value={Number(product.price)} />
              ) : (
                <p className="text-destructive">Out of Stock</p>
              )}
            </div>
            {product.stock !== 0 && (
              <div className="flex-center">
                <AddToCart
                  cart={cart}
                  item={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: Number(product.price),
                    qty: 1,
                    image: product.images![0],
                  }}
                />
              </div>
            )}

            <div className="my-2 flex items-start flex-col gap-2 justify-center">
              <ReloadButton />
            </div>
          </div>
        </div>
      </div>
    </QuickViewModalWrapper>
  )
}
