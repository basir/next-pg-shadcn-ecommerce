import Head from "next/head";
import Link from "next/link";

export default function BecomeSellerPage() {
  return (
    <>
      <Head>
        <title>Become a Seller | Bharat Krishi Mitra</title>
      </Head>
      <div className="bg-[#f5f8f1] py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#dbe3d3] bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-[#102238]">Become a Seller</h1>
          <p className="mt-3 text-lg text-[#4b5563]">
            Join Bharat Krishi Mitra to reach more buyers and grow your agri business.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#374151]">
            <li>List your products with transparent pricing.</li>
            <li>Get discovered by farmers across categories.</li>
            <li>Manage orders and stock from one place.</li>
          </ul>
          <div className="mt-7 flex gap-3">
            <Link legacyBehavior href="/sign-up">
              <a className="rounded-lg bg-[#168a46] px-5 py-2.5 font-bold text-white">Create Seller Account</a>
            </Link>
            <Link legacyBehavior href="/home">
              <a className="rounded-lg border border-[#168a46] px-5 py-2.5 font-bold text-[#168a46]">Back to Home</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

