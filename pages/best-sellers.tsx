import type { GetServerSideProps, NextPage } from "next";
import StorefrontPage from "../components/storefront/StorefrontPage";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";

interface PageProps {
  products: Product[];
  sub: string;
}

const BestSellersPage: NextPage<PageProps> = ({ products, sub }) => {
  const topRated = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return (
    <StorefrontPage
      products={topRated}
      initialTab="all"
      initialSubcategory={sub}
      headerTitle="Best Sellers"
      headerSubtitle="Most loved by farmers and agri businesses"
      heroTitle="BEST SELLERS"
      heroSubtitle="Top rated products across all categories"
      compactCards={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  return { props: await getProductsPageProps(context) };
};

export default BestSellersPage;

