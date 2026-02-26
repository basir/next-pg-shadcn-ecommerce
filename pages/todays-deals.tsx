import type { GetServerSideProps, NextPage } from "next";
import StorefrontPage from "../components/storefront/StorefrontPage";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";

interface PageProps {
  products: Product[];
  sub: string;
}

const TodaysDealsPage: NextPage<PageProps> = ({ products, sub }) => {
  const dealProducts = products.filter((product) => (product.discount || 0) > 0 || product.isFlashDeal);
  return (
    <StorefrontPage
      products={dealProducts.length > 0 ? dealProducts : products}
      initialTab="all"
      initialSubcategory={sub}
      headerTitle="Today's Deals"
      headerSubtitle="Limited-time discounts on top farm essentials"
      heroTitle="TODAY'S DEALS"
      heroSubtitle="Save more on trending agriculture products"
      compactCards={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  return { props: await getProductsPageProps(context) };
};

export default TodaysDealsPage;

