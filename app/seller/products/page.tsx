"use client";

import { useState } from "react";
import { FaPlus, FaSearch, FaFilter, FaStar, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Mock Data for Visuals
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Premium Organic Urea 50kg",
    price: 1200,
    stock: 450,
    category: "Fertilizers",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=300&auto=format&fit=crop",
    status: "Active",
    rating: 4.8
  },
  {
    id: 2,
    name: "Solar Insect Trap",
    price: 3500,
    stock: 12,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=300&auto=format&fit=crop",
    status: "Low Stock",
    rating: 4.5
  },
  {
    id: 3,
    name: "Neem Oil Pesticide 1L",
    price: 450,
    stock: 0,
    category: "Pesticides",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=300&auto=format&fit=crop",
    status: "Out of Stock",
    rating: 4.2
  },
  {
    id: 4,
    name: "Drip Irrigation Kit",
    price: 8500,
    stock: 25,
    category: "Irrigation",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=300&auto=format&fit=crop",
    status: "Active",
    rating: 4.9
  },
];

const CATEGORIES = ["All", "Fertilizers", "Tools", "Pesticides", "Irrigation", "Seeds"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Products</h1>
          <p className="text-green-200 mt-1">Manage your inventory and listings</p>
        </div>
        <Link
          href="/seller/products/add"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4ade80] to-[#2E7D32] text-white font-semibold shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 active:scale-95"
        >
          <FaPlus /> Add New Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 glass-morphic p-4 rounded-2xl border border-white/10">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <div className="flex items-center gap-2 px-4 text-white/70">
            <FaFilter />
            <span className="hidden md:inline">Filter:</span>
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-green-500 text-white border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group glass-morphic rounded-2xl border border-white/10 overflow-hidden hover:border-green-400/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-white/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${
                  product.status === 'Active' ? 'bg-green-500/80 text-white' :
                  product.status === 'Low Stock' ? 'bg-yellow-500/80 text-black' :
                  'bg-red-500/80 text-white'
                }`}>
                  {product.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs text-green-300 bg-green-900/30 px-2 py-0.5 rounded border border-green-500/20">
                    {product.category}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <FaStar /> {product.rating}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-300 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-white">₹{product.price}</span>
                  <span className="text-sm text-white/40 line-through">₹{product.price + 200}</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm text-white/60">
                    Stock: <span className={product.stock < 10 ? "text-red-400 font-bold" : "text-white"}>{product.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-white/5 hover:bg-green-500 text-white hover:shadow-lg transition-all duration-300" title="Edit">
                      <FaEdit />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-red-500 text-white hover:shadow-lg transition-all duration-300" title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-morphic rounded-3xl border border-white/10">
          <div className="text-6xl text-white/20 mb-4">🌿</div>
          <h3 className="text-xl text-white font-medium">No products found</h3>
          <p className="text-white/50 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
