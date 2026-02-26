import Head from "next/head";
import Link from "next/link";

export default function CustomerServicePage() {
  return (
    <>
      <Head>
        <title>Customer Service | Bharat Krishi Mitra</title>
      </Head>
      <div className="bg-[#f5f8f1] py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#dbe3d3] bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-[#102238]">Customer Service</h1>
          <p className="mt-3 text-lg text-[#4b5563]">Need help with orders, returns, or product details? We are here for you.</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#e5e7eb] p-4">
              <p className="font-bold text-[#102238]">Order Support</p>
              <p className="text-[#4b5563]">Track, cancel, or update your order using your account dashboard.</p>
            </div>
            <div className="rounded-xl border border-[#e5e7eb] p-4">
              <p className="font-bold text-[#102238]">Returns & Refunds</p>
              <p className="text-[#4b5563]">Eligible return requests are reviewed within 48 hours.</p>
            </div>
            <div className="rounded-xl border border-[#e5e7eb] p-4">
              <p className="font-bold text-[#102238]">Seller Help</p>
              <p className="text-[#4b5563]">For onboarding and catalog support, use the seller registration flow.</p>
            </div>
          </div>

          <div className="mt-7">
            <Link legacyBehavior href="/home">
              <a className="rounded-lg border border-[#168a46] px-5 py-2.5 font-bold text-[#168a46]">Back to Home</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

