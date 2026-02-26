import type { GetServerSideProps, NextPage } from "next";
import StorefrontPage from "../components/storefront/StorefrontPage";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";

interface PageProps {
  products: Product[];
  sub: string;
}

const AgriMachineriesPage: NextPage<PageProps> = ({ products, sub }) => {
  return (
    <StorefrontPage
      products={products}
      initialTab="machinery"
      initialSubcategory={sub}
      headerTitle="Top Agri Machineries"
      headerSubtitle="High performance equipment for modern farming"
      heroTitle="MODERN MACHINERIES"
      heroSubtitle="Up to 20% off on tractors and implements"
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  return { props: await getProductsPageProps(context) };
};

export default AgriMachineriesPage;

