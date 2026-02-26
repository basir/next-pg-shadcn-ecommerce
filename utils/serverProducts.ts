import type { GetServerSidePropsContext } from "next";
import { Product } from "../types/Product";

interface ProductsPageProps {
  products: Product[];
  sub: string;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Field Tractor XT 45HP",
    description: "Reliable tractor for ploughing, haulage, and field transport.",
    price: 625000,
    category: "Machinery",
    brand: "BKM Agro",
    stock: 5,
    rating: 4.6,
    discount: 12,
    isFlashDeal: true,
    imageUrl: "/images/products/card-machinery.png",
  },
  {
    id: 2,
    name: "Smart Seeder Pro",
    description: "Precision seeding machine for uniform crop spacing.",
    price: 128000,
    category: "Machinery",
    brand: "BKM Agro",
    stock: 9,
    rating: 4.4,
    discount: 8,
    isFlashDeal: false,
    imageUrl: "/images/products/card-machinery.png",
  },
  {
    id: 3,
    name: "Industrial Tool Kit 72P",
    description: "Heavy-duty MRO toolkit for farm and workshop maintenance.",
    price: 5200,
    category: "MRO",
    brand: "FixWell",
    stock: 34,
    rating: 4.3,
    discount: 15,
    isFlashDeal: false,
    imageUrl: "/images/products/card-mro.png",
  },
  {
    id: 4,
    name: "Drip Irrigation Controller",
    description: "Programmable controller for water-efficient irrigation cycles.",
    price: 8900,
    category: "MRO",
    brand: "AgriFlow",
    stock: 22,
    rating: 4.5,
    discount: 10,
    isFlashDeal: true,
    imageUrl: "/images/products/card-mro.png",
  },
  {
    id: 5,
    name: "Hybrid Paddy Seeds (5kg)",
    description: "High-germination paddy seeds for improved yield.",
    price: 1750,
    category: "Seeds",
    brand: "GreenGrow",
    stock: 120,
    rating: 4.7,
    discount: 6,
    isFlashDeal: false,
    imageUrl: "/images/products/card-seeds.png",
  },
  {
    id: 6,
    name: "NPK Fertilizer Mix",
    description: "Balanced nutrient blend for strong root and canopy growth.",
    price: 980,
    category: "Fertilizers",
    brand: "CropPlus",
    stock: 200,
    rating: 4.2,
    discount: 18,
    isFlashDeal: true,
    imageUrl: "/images/products/card-seeds.png",
  },
];

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const normalizeProduct = (raw: any, index: number): Product => ({
  id: raw?.id ?? index + 1,
  name: raw?.name || `Product ${index + 1}`,
  description: raw?.description || "",
  price: toNumber(raw?.price),
  category: raw?.category || "Machinery",
  brand: raw?.brand || "Bharat Krishi Mitra",
  stock: toNumber(raw?.stock),
  rating: toNumber(raw?.rating),
  discount: toNumber(raw?.discount),
  mrp: toNumber(raw?.mrp),
  isFlashDeal: Boolean(raw?.isFlashDeal),
  imageUrl: raw?.imageUrl || (Array.isArray(raw?.images) ? raw.images[0] : undefined),
  images: Array.isArray(raw?.images) ? raw.images : undefined,
});

const fetchBackendProducts = async (backendBaseUrl: string): Promise<Product[]> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(`${backendBaseUrl}/api/products/all`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(normalizeProduct);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
};

export const getProductsPageProps = async (context: GetServerSidePropsContext): Promise<ProductsPageProps> => {
  const sub = typeof context.query.sub === "string" ? context.query.sub : "";
  const backendBaseUrl = process.env.BKM_BACKEND_URL || "http://localhost:8080";

  const apiProducts = await fetchBackendProducts(backendBaseUrl);
  const products = apiProducts.length > 0 ? apiProducts : FALLBACK_PRODUCTS;

  return { products, sub };
};
