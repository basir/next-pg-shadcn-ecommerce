import type { GetServerSideProps, NextPage } from "next";
import StorefrontPage from "../components/storefront/StorefrontPage";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";

interface AllPageProps {
  products: Product[];
  sub: string;
}

const AllPage: NextPage<AllPageProps> = ({ products, sub }) => {
  return (
    <StorefrontPage
      products={products}
      initialTab="all"
      initialSubcategory={sub}
      headerTitle="All Farm Products"
      headerSubtitle="Browse machinery, MRO tools, seeds and fertilizers"
      heroTitle="Bharat Krishi Mitra Store"
      heroSubtitle="Everything you need for your farm"
      compactCards={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps<AllPageProps> = async (context) => {
  return { props: await getProductsPageProps(context) };
};

export default AllPage;

