import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Product } from "../types/Product";
import { getProductsPageProps } from "../utils/serverProducts";
import { filterProductsByTab, getBadgeText, getFallbackProductImage, getProductImageUrl, StoreTab } from "../utils/storefront";

interface HomeProps {
  products: Product[];
  sub: string;
}
// Create responsive navbar using Tailwind with dropdown
interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  tab: StoreTab;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "machinery",
    title: "MODERN MACHINERIES",
    subtitle: "Up to 20% Off on Tractors",
    image: "/images/home/hero-machinery.jpg",
    cta: "SHOP NOW",
    tab: "machinery",
  },
  {
    id: "mro",
    title: "MRO ESSENTIALS",
    subtitle: "Tools for Every Need",
    image: "/images/home/hero-mro.jpg",
    cta: "SHOP NOW",
    tab: "mro",
  },
  {
    id: "seeds",
    title: "SEEDS & FERTILIZERS",
    subtitle: "Better Yield for Every Season",
    image: "/images/home/hero-seeds.jpg",
    cta: "SHOP NOW",
    tab: "seeds",
  },
  {
    id: "deals",
    title: "TODAY'S DEALS",
    subtitle: "Limited Time Discounts",
    image: "/images/home/hero-deals.jpg",
    cta: "VIEW DEALS",
    tab: "all",
  },
  {
    id: "seller",
    title: "BECOME A SELLER",
    subtitle: "Grow Your Agriculture Business",
    image: "/images/home/hero-seller.jpg",
    cta: "JOIN NOW",
    tab: "all",
  },
];

const CATEGORY_TABS: Array<{ key: StoreTab; label: string; icon: string }> = [
  { key: "machinery", label: "AGRI MACHINERIES", icon: "/images/home/icon-machinery.jpg" },
  { key: "mro", label: "MRO & TOOLS", icon: "/images/home/icon-mro.jpg" },
  { key: "seeds", label: "SEEDS & FERTILIZERS", icon: "/images/home/icon-seeds.jpg" },
];

const Home: NextPage<HomeProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState<StoreTab>("machinery");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const activeSlide = HERO_SLIDES[slideIndex];

  useEffect(() => {
    setActiveTab(activeSlide.tab);
  }, [activeSlide.tab]);

  const tabProducts = useMemo(() => filterProductsByTab(products, activeTab), [products, activeTab]);

  const featuredProducts = tabProducts.slice(0, 8);
  const dealProducts = [...products]
    .filter((item) => (item.discount || 0) >= 10 || item.isFlashDeal)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);

  const trendingProducts = [...tabProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 2)
    .concat([
      {
        id: 900001,
        name: "Agri Drone Survey Pro",
        description: "Precision mapping drone for crop monitoring and spray planning.",
        price: 120000,
        imageUrl: "/images/home/hero-machinery.jpg",
        category: "Machinery",
        brand: "AgriTech",
        stock: 10,
        rating: 4.8,
        discount: 0,
        isFlashDeal: false,
      },
      {
        id: 900002,
        name: "Smart Soil Moisture Sensor",
        description: "IoT soil monitor with mobile alerts for irrigation decisions.",
        price: 1800,
        imageUrl: "/images/home/hero-seeds.jpg",
        category: "MRO",
        brand: "FarmSense",
        stock: 100,
        rating: 4.6,
        discount: 0,
        isFlashDeal: false,
      },
    ]);

  const sectionTitle =
    activeTab === "machinery" ? "Top in Agri Machineries" : activeTab === "mro" ? "Top in MRO & Tools" : "Top in Seeds & Fertilizers";

  const viewAllHref = activeTab === "machinery" ? "/agri-machineries" : activeTab === "mro" ? "/mro-tools" : "/seeds-fertilizers";
  const slideHref =
    activeSlide.id === "deals"
      ? "/todays-deals"
      : activeSlide.id === "seller"
      ? "/become-seller"
      : activeSlide.tab === "mro"
      ? "/mro-tools"
      : activeSlide.tab === "seeds"
      ? "/seeds-fertilizers"
      : "/agri-machineries";

  return (
    <>
      <Head>
        <title>Bharat Krishi Mitra | Home</title>
      </Head>

      <div className="bg-[#f5f8f1] pb-14">
        <div className="mx-auto max-w-[1280px] px-3 pt-3 md:px-5">
          <section className="relative overflow-hidden rounded-xl border border-[#dbe3d3]">
            <img src={activeSlide.image} alt={activeSlide.title} className="h-[370px] w-full object-cover md:h-[520px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-black/20" />

            <div className="absolute left-8 top-1/4 z-10 text-white md:left-12">
              <h1 className="text-5xl font-black leading-none md:text-8xl">{activeSlide.title}</h1>
              <p className="mt-4 text-3xl font-semibold text-[#f6ad3a] md:text-6xl">{activeSlide.subtitle}</p>
              <Link href={slideHref}>
                <a className="mt-6 inline-block bg-white px-8 py-3 text-2xl font-black text-[#168a46] md:px-10 md:py-4 md:text-4xl">
                  {activeSlide.cta}
                </a>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center bg-white/90 text-[#2f3e31] transition-colors hover:bg-white"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center bg-white/90 text-[#2f3e31] transition-colors hover:bg-white"
            >
              <FaArrowRight />
            </button>
          </section>

          <section className="border-x border-b border-[#dce4d6] bg-[#f0f4f0]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {CATEGORY_TABS.map((tab) => {
                const active = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex flex-col items-center px-4 py-6 transition-colors ${
                      active ? "bg-[#edf3ee] text-[#2a9a59]" : "text-[#7a818c] hover:bg-[#f6f8f5]"
                    }`}
                  >
                    <img src={tab.icon} alt={tab.label} className="h-16 w-16 rounded-full border-4 border-[#d6ddd0] object-cover" />
                    <span className="mt-3 text-4xl font-black tracking-tight">{tab.label}</span>
                    <span className={`mt-4 h-[5px] w-full ${active ? "bg-[#2a9a59]" : "bg-transparent"}`} />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-end justify-between border-b border-[#dce4d6] pb-3">
              <div>
                <h2 className="text-5xl font-black text-[#0b1d34] md:text-6xl">
                  {sectionTitle} <span className="text-[#f2a22c]">•</span>
                </h2>
                <p className="mt-1 text-2xl font-bold uppercase tracking-[0.08em] text-[#9098a4] md:text-3xl">
                  Handpicked for your farm&apos;s success
                </p>
              </div>
              <Link href={viewAllHref}>
                <a className="border-2 border-[#2a9a59] px-6 py-3 text-2xl font-black text-[#2a9a59] transition-colors hover:bg-[#2a9a59] hover:text-white md:text-3xl">
                  VIEW ALL {activeTab === "machinery" ? "AGRI MACHINERIES" : activeTab === "mro" ? "MRO & TOOLS" : "SEEDS & FERTILIZERS"}
                </a>
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
              {featuredProducts.map((product) => (
                <article key={product.id} className="rounded-2xl border border-[#dbe3d3] bg-white p-3 shadow-sm">
                  <div className="relative h-40 overflow-hidden rounded-xl bg-[#edf2ea]">
                    <img
                      src={getProductImageUrl(product)}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = getFallbackProductImage(product.category);
                      }}
                    />
                    {!!product.discount && (
                      <span className="absolute right-2 top-2 rounded-full bg-[#1f9a57] px-2 py-0.5 text-sm font-bold text-white">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-[#7a838f]">{getBadgeText(product)}</p>
                  <p className="line-clamp-2 text-2xl font-black text-[#102238]">{product.name}</p>
                  <p className="mt-2 text-4xl font-black text-[#1a9953]">₹{Math.round(product.price).toLocaleString("en-IN")}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#dbe3d3] bg-white p-4 lg:col-span-1">
              <h3 className="text-4xl font-black text-[#102238]">DEALS OF THE DAY</h3>
              <div className="mt-4 space-y-3">
                {dealProducts.map((deal) => (
                  <div key={deal.id} className="flex items-center gap-3 border-b border-[#edf1eb] pb-3 last:border-b-0 last:pb-0">
                    <img
                      src={getProductImageUrl(deal)}
                      alt={deal.name}
                      className="h-16 w-16 rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.src = getFallbackProductImage(deal.category);
                      }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xl font-bold text-[#1a2738]">{deal.name}</p>
                      <p className="text-2xl font-black text-[#1a9953]">₹{Math.round(deal.price).toLocaleString("en-IN")}</p>
                      <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#f3a329]">Limited Time</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#dbe3d3] bg-white p-4 lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="border-l-4 border-[#2aa45e] pl-3 text-5xl font-black text-[#102238] md:text-6xl">
                  Trending in Farming Tech
                </h3>
                <Link href="/best-sellers">
                  <a className="text-3xl font-black text-[#2a9a59]">See More</a>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {trendingProducts.map((item) => (
                  <article key={item.id} className="rounded-xl border border-[#e3e9df] p-3">
                    <div className="h-36 overflow-hidden rounded-lg bg-[#f1f4f0]">
                      <img
                        src={getProductImageUrl(item)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src = getFallbackProductImage(item.category);
                        }}
                      />
                    </div>
                    <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-[#7a838f]">{getBadgeText(item)}</p>
                    <p className="line-clamp-2 text-2xl font-black text-[#17263a]">{item.name}</p>
                    <p className="mt-2 text-4xl font-black text-[#1a9953]">₹{Math.round(item.price).toLocaleString("en-IN")}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const props = await getProductsPageProps(context);
  return { props };
};

export default Home;
