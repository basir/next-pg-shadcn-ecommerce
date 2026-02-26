"use client";

import React, { useState } from "react";
import {
  FaBox,
  FaMoneyBillWave,
  FaPercent,
  FaBuilding,
  FaClipboardList,
  FaBolt,
  FaImage,
  FaCloudUploadAlt,
  FaSpinner
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Interface matching the Product.java backend entity exactly
interface ProductForm {
  name: string;
  price: number;
  mrp: number;
  discount: number;
  brand: string;
  stock: number;
  category: string;
  description: string;
  isFlashDeal: boolean;
  imageUrl: string;
}

const CATEGORIES = [
  "Seeds & Fertilizers",
  "Tools & Machinery",
  "Organic Pesticides",
  "Irrigation Systems",
  "Crop Protection",
  "Animal Husbandry",
  "Smart Farming Tech"
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    price: 0,
    mrp: 0,
    discount: 0,
    brand: "",
    stock: 0,
    category: CATEGORIES[0],
    description: "",
    isFlashDeal: false,
    imageUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isFlashDeal: e.target.checked }));
  };

  // Mock Image Upload Simulation
  const handleImageUpload = () => {
    // In a real scenario, this would upload to S3/Cloudinary and return a URL
    const mockImages = [
      "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=300&auto=format&fit=crop"
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setFormData(prev => ({ ...prev, imageUrl: randomImage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting payload to Spring Boot:", JSON.stringify(formData, null, 2));

      // Simulate API call to POST /api/seller/products
      // const response = await fetch('http://localhost:8080/api/seller/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert("Product added successfully! (Mock)");
      router.push("/seller/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <p className="text-green-200 mt-1">List a new item in your store</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
        >
          &times; Cancel
        </button>
      </div>

      <div className="glass-morphic rounded-2xl p-8 border border-white/20 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                <FaBox className="text-green-400" /> Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Organic Urea 50kg"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-400" /> Selling Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-400" /> MRP (₹)
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                  <FaPercent className="text-green-400" /> Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                  <FaClipboardList className="text-green-400" /> Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                <FaBox className="text-green-400" /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors appearance-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-green-900 text-white">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                <FaBuilding className="text-green-400" /> Brand Name
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Tata Chemicals"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                <FaClipboardList className="text-green-400" /> Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={5}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors resize-none"
              />
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <FaBolt className="text-yellow-400" /> Flash Deal
                </div>
                <div className="text-xs text-green-200">Highlight this product for quick sale</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-100 flex items-center gap-2">
                <FaImage className="text-green-400" /> Product Image
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  readOnly
                  placeholder="Image URL will appear here"
                  className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FaCloudUploadAlt /> Upload
                </button>
              </div>
              <p className="text-xs text-green-300/50">* Click upload to generate a mock URL for now.</p>

              {formData.imageUrl && (
                <div className="mt-2 relative h-32 w-full rounded-xl overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4ade80] to-[#2E7D32] text-white font-bold shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Adding Product...
                </>
              ) : (
                "Add Product Now"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
