import type { GetServerSideProps, NextPage } from "next";
import StorefrontPage from "../components/storefront/StorefrontPage";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";

interface PageProps {
  products: Product[];
  sub: string;
}

const MroToolsPage: NextPage<PageProps> = ({ products, sub }) => {
  return (
    <StorefrontPage
      products={products}
      initialTab="mro"
      initialSubcategory={sub}
      headerTitle="MRO & Tools"
      headerSubtitle="Maintenance, repair and operation essentials"
      heroTitle="MRO ESSENTIALS"
      heroSubtitle="Professional tools for every farm task"
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  return { props: await getProductsPageProps(context) };
};

export default MroToolsPage;

