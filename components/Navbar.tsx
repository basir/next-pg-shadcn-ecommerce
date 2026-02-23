import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaBars, FaChevronDown, FaMapMarkerAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import { MENU_CONFIG } from "../utils/storefront";

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/all",
      query: {
        ...(searchCategory !== "all" ? { category: searchCategory } : {}),
        ...(searchTerm.trim() ? { q: searchTerm.trim() } : {}),
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-[0_1px_0_rgba(0,0,0,0.09)]">
      <div className="border-b border-[#303743] bg-[#222b35] px-3 py-1 text-xs text-white/85 md:px-6">
        This app is in Design Mode which is best for rapid designs & websites.
      </div>

      <nav className="border-b border-[#42bf69] bg-[#20aa50] text-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 px-3 py-2 md:gap-4 md:px-5">
          <Link href="/home">
            <a className="min-w-[208px]">
              <div className="leading-tight">
                <p className="text-[20px] font-black italic tracking-tight">Bharat Krishi Mitra</p>
                <p className="text-xs text-white/85">Explore Plus</p>
              </div>
            </a>
          </Link>

          <div className="hidden items-center gap-2 text-white/95 lg:flex">
            <FaMapMarkerAlt className="text-base" />
            <div className="leading-tight">
              <p className="text-xs text-white/85">Deliver to</p>
              <p className="text-[15px] font-semibold">Select location</p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="ml-auto flex h-10 w-full max-w-[430px] items-center overflow-hidden rounded-md border border-[#0d8f3a] bg-white text-[#1f2937]"
          >
            <select
              value={searchCategory}
              onChange={(event) => setSearchCategory(event.target.value)}
              className="h-full border-r border-slate-200 bg-white px-3 text-sm outline-none"
            >
              <option value="all">All</option>
              <option value="machinery">Machinery</option>
              <option value="mro">MRO</option>
              <option value="seeds">Seeds</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for products,"
              className="h-full w-full px-3 text-sm outline-none"
            />
            <button type="submit" className="inline-flex h-full w-11 items-center justify-center bg-[#f5a623] text-white">
              <FaSearch />
            </button>
          </form>

          <div className="hidden items-center gap-6 text-base font-semibold md:flex">
            <Link href="/login">
              <a className="transition-colors hover:text-[#f8ffcb]">Login</a>
            </Link>
            <Link href="/become-seller">
              <a className="transition-colors hover:text-[#f8ffcb]">Become a Seller</a>
            </Link>
            <Link href="/cart">
              <a className="inline-flex items-center gap-2 transition-colors hover:text-[#f8ffcb]">
                <FaShoppingCart />
                Cart
              </a>
            </Link>
          </div>
        </div>
      </nav>

      <nav className="border-b border-[#2d3440] bg-[#1f2b3d] text-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-3 py-3 text-[17px] font-semibold md:px-5">
          <Link href="/all">
            <a className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[#9effcb]">
              <FaBars className="text-sm" />
              All
            </a>
          </Link>

          {MENU_CONFIG.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.label)}
              onMouseLeave={() => setOpenMenu((current) => (current === menu.label ? null : current))}
            >
              <button
                type="button"
                onClick={() => setOpenMenu((current) => (current === menu.label ? null : menu.label))}
                className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#9effcb]"
              >
                {menu.label}
                <FaChevronDown className="text-xs" />
              </button>

              <div className="absolute left-0 top-full z-50 pt-2">
                <div
                  className={`w-[290px] rounded-xl border border-[#d7e3cc] bg-white p-4 text-[#1f2937] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all duration-200 ${
                    openMenu === menu.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Top Categories</p>
                  <div className="mt-2 space-y-1 text-base font-semibold">
                    {menu.subcategories.map((sub) => (
                      <Link key={sub.slug} href={{ pathname: menu.href, query: { sub: sub.slug } }}>
                        <a className="block rounded-md px-2 py-1.5 transition-colors hover:bg-[#edf7ef] hover:text-[#137b40]">
                          {sub.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <Link href={menu.href}>
                    <a className="mt-3 block rounded-lg bg-[#ecf7ef] px-3 py-2 text-sm font-bold text-[#148d47] transition-colors hover:bg-[#ddf2e3]">
                      View All {menu.label}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <Link href="/best-sellers">
            <a className="whitespace-nowrap transition-colors hover:text-[#9effcb]">Best Sellers</a>
          </Link>
          <Link href="/todays-deals">
            <a className="whitespace-nowrap transition-colors hover:text-[#9effcb]">Today&apos;s Deals</a>
          </Link>
          <Link href="/customer-service">
            <a className="whitespace-nowrap transition-colors hover:text-[#9effcb]">Customer Service</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
