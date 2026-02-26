import { Product } from "../types/Product";

export type StoreTab = "all" | "machinery" | "mro" | "seeds";

interface MenuSubcategory {
  label: string;
  slug: string;
}

interface MenuItem {
  label: string;
  href: string;
  tab: StoreTab;
  subcategories: MenuSubcategory[];
}

export const MENU_CONFIG: MenuItem[] = [
  {
    label: "Agri Machineries",
    href: "/agri-machineries",
    tab: "machinery",
    subcategories: [
      { label: "Tractors", slug: "tractors" },
      { label: "Harvesters", slug: "harvesters" },
      { label: "Irrigation", slug: "irrigation" },
      { label: "Power Tools", slug: "power-tools" },
    ],
  },
  {
    label: "MRO & Tools",
    href: "/mro-tools",
    tab: "mro",
    subcategories: [
      { label: "Hand Tools", slug: "hand-tools" },
      { label: "Safety Gear", slug: "safety-gear" },
      { label: "Electrical", slug: "electrical" },
      { label: "Hardware", slug: "hardware" },
    ],
  },
  {
    label: "Seeds & Fertilizers",
    href: "/seeds-fertilizers",
    tab: "seeds",
    subcategories: [
      { label: "Seeds", slug: "seeds" },
      { label: "Fertilizers", slug: "fertilizers" },
      { label: "Bio Inputs", slug: "bio-inputs" },
      { label: "Crop Care", slug: "crop-care" },
    ],
  },
];

const normalize = (value: string) => value.trim().toLowerCase();

export const inferTabFromCategory = (category?: string): StoreTab => {
  const categoryText = normalize(category || "");
  if (!categoryText) return "all";

  if (
    categoryText.includes("mro") ||
    categoryText.includes("tool") ||
    categoryText.includes("safety") ||
    categoryText.includes("hardware")
  ) {
    return "mro";
  }

  if (
    categoryText.includes("seed") ||
    categoryText.includes("fertilizer") ||
    categoryText.includes("bio") ||
    categoryText.includes("crop")
  ) {
    return "seeds";
  }

  if (
    categoryText.includes("tractor") ||
    categoryText.includes("machin") ||
    categoryText.includes("harvest") ||
    categoryText.includes("irrigation")
  ) {
    return "machinery";
  }

  return "all";
};

export const filterProductsByTab = (products: Product[], tab: StoreTab): Product[] => {
  if (tab === "all") return products;
  return products.filter((product) => inferTabFromCategory(product.category) === tab);
};

export const filterBySubcategory = (products: Product[], subcategory?: string): Product[] => {
  if (!subcategory) return products;
  const needle = normalize(subcategory);
  return products.filter((product) => {
    const haystack = `${product.name || ""} ${product.description || ""} ${product.category || ""} ${product.brand || ""}`;
    return normalize(haystack).includes(needle.replace(/-/g, " "));
  });
};

export const getFallbackProductImage = (category?: string): string => {
  const tab = inferTabFromCategory(category);
  if (tab === "seeds") return "/images/home/hero-seeds.png";
  if (tab === "mro") return "/images/home/hero-deals.png";
  return "/images/home/hero-machinery.png";
};

export const getProductImageUrl = (product: Product): string => {
  const candidate = product.imageUrl || product.images?.[0];
  if (candidate && candidate.trim()) return candidate;
  return getFallbackProductImage(product.category);
};

export const getBadgeText = (product: Product): string => {
  if ((product.discount || 0) > 0) return `${product.discount}% OFF`;
  if (product.isFlashDeal) return "Flash Deal";

  const tab = inferTabFromCategory(product.category);
  if (tab === "machinery") return "Machinery";
  if (tab === "mro") return "MRO";
  if (tab === "seeds") return "Seeds";
  return "Featured";
};
