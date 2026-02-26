import type { GetServerSideProps, NextPage } from "next";
import StorefrontPage from "../components/storefront/StorefrontPage";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";

interface PageProps {
  products: Product[];
  sub: string;
}

const SeedsFertilizersPage: NextPage<PageProps> = ({ products, sub }) => {
  return (
    <StorefrontPage
      products={products}
      initialTab="seeds"
      initialSubcategory={sub}
      headerTitle="Seeds & Fertilizers"
      headerSubtitle="Inputs for better yield and crop health"
      heroTitle="SEEDS & FERTILIZERS"
      heroSubtitle="Quality inputs for every season"
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  return { props: await getProductsPageProps(context) };
};

export default SeedsFertilizersPage;

