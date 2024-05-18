import ProductList from '@/components/shared/product/product-list'
import { getLatestProducts } from '@/lib/actions/product.actions'

export default async function Home() {
  const latestProducts = await getLatestProducts()
  return (
    <div className="space-y-8">
      <ProductList title="Newest Arrivals" data={latestProducts} />
    </div>
  )
}
