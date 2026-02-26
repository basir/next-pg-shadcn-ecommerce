import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { FaLeaf, FaSeedling, FaTools, FaTractor } from "react-icons/fa";
import { Product } from "../../types/Product";
import {
  StoreTab,
  filterBySubcategory,
  filterProductsByTab,
  getFallbackProductImage,
  getProductImageUrl,
  MENU_CONFIG,
} from "../../utils/storefront";
import ModernProductCard from "./ModernProductCard";

interface StorefrontPageProps {
  products: Product[];
  initialTab: StoreTab;
  initialSubcategory?: string;
  headerTitle: string;
  headerSubtitle: string;
  heroTitle?: string;
  heroSubtitle?: string;
  showHero?: boolean;
  compactCards?: boolean;
}

const tabIcons: Record<StoreTab, ReactElement> = {
  all: <FaLeaf />,
  machinery: <FaTractor />,
  mro: <FaTools />,
  seeds: <FaSeedling />,
};

const tabRoute: Record<StoreTab, string> = {
  all: "/all",
  machinery: "/agri-machineries",
  mro: "/mro-tools",
  seeds: "/seeds-fertilizers",
};

const StorefrontPage = ({
  products,
  initialTab,
  initialSubcategory = "",
  headerTitle,
  headerSubtitle,
  heroTitle,
  heroSubtitle,
  showHero = true,
  compactCards = true,
}: StorefrontPageProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StoreTab>(initialTab);
  const queryQ = typeof router.query.q === "string" ? router.query.q.trim() : "";
  const queryCategory = typeof router.query.category === "string" ? router.query.category.toLowerCase().trim() : "";

  useEffect(() => {
    if (initialTab !== "all") {
      return;
    }
    const queryTab: StoreTab | null =
      queryCategory === "machinery" ? "machinery" : queryCategory === "mro" ? "mro" : queryCategory === "seeds" ? "seeds" : null;
    if (queryTab) {
      setActiveTab(queryTab);
    }
  }, [initialTab, queryCategory]);

  const filteredProducts = useMemo(() => {
    const tabProducts = filterProductsByTab(products, activeTab);
    const subcategoryProducts = filterBySubcategory(tabProducts, initialSubcategory);
    if (!queryQ) {
      return subcategoryProducts;
    }

    const needle = queryQ.toLowerCase();
    return subcategoryProducts.filter((product) => {
      const haystack = `${product.name} ${product.description} ${product.brand} ${product.category}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [products, activeTab, initialSubcategory, queryQ]);

  const displayedProducts = compactCards ? filteredProducts.slice(0, 12) : filteredProducts;

  return (
    <div className="bg-[#f5f8f1] pb-12">
      <div className="mx-auto max-w-[1280px] px-3 pb-10 pt-3 md:px-5">
        {showHero && (
          <section className="relative overflow-hidden rounded-xl border border-[#d9e2d2]">
            <img src="/images/products/machinery-placeholder.png" alt="Agriculture hero" className="h-[310px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/45" />
            <div className="absolute inset-x-0 top-[26%] px-4 text-center text-white">
              <p className="text-4xl font-black md:text-6xl">{heroTitle || "MODERN MACHINERIES"}</p>
              <p className="mt-4 text-xl font-semibold text-[#f7bc4b] md:text-4xl">
                {heroSubtitle || "Upto 20% Off on Tractors"}
              </p>
            </div>
          </section>
        )}

        <section className={`${showHero ? "-mt-10" : "mt-2"} relative z-10`}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {MENU_CONFIG.map((item) => {
              const isSelected = activeTab === item.tab;
              return (
                <Link legacyBehavior key={item.tab} href={tabRoute[item.tab]}>
                  <a
                    onMouseEnter={() => setActiveTab(item.tab)}
                    className={`rounded-2xl border bg-white px-4 py-4 transition-all duration-200 ${
                      isSelected
                        ? "border-[#2d8a46] shadow-[0_10px_20px_rgba(0,0,0,0.16)]"
                        : "border-[#d6e0ce] hover:border-[#85b954] hover:shadow-[0_8px_16px_rgba(13,86,41,0.13)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cfdac6] bg-[#f4f8ef] text-[#547a4d]">
                        {tabIcons[item.tab]}
                      </div>
                      <div>
                        <p className="text-2xl font-black text-[#13212f]">{item.label}</p>
                        <p className={`text-xs font-bold uppercase tracking-[0.1em] ${isSelected ? "text-[#188946]" : "text-[#7a828d]"}`}>
                          {isSelected ? "Selected" : "View Category"}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between border-b border-[#dce4d6] pb-3">
            <div>
              <p className="text-4xl font-black text-[#091f38] md:text-5xl">{headerTitle}</p>
              <p className="mt-1 text-xl text-[#5b6470] md:text-2xl">{headerSubtitle}</p>
            </div>
            <Link legacyBehavior href={tabRoute[activeTab]}>
              <a className="text-lg font-bold text-[#167f43] underline underline-offset-8 md:text-2xl">View All Products</a>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="transition-all duration-200"
              >
                <ModernProductCard
                  product={product}
                  imageUrl={getProductImageUrl(product)}
                  fallbackImageUrl={getFallbackProductImage(product.category)}
                  detailsHref={`${tabRoute[activeTab]}?q=${encodeURIComponent(product.name || "")}`}
                />
              </div>
            ))}
          </div>

          {displayedProducts.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-[#9db294] bg-[#f7fbf4] p-5 text-base text-[#4d5a50]">
              No products found for this category.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StorefrontPage;
