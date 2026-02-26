import Head from "next/head";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Bharat Krishi Mitra</title>
      </Head>
      <div className="bg-[#f5f8f1] py-10">
        <div className="mx-auto max-w-md rounded-2xl border border-[#dbe3d3] bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-[#102238]">Login</h1>
          <p className="mt-3 text-[#4b5563]">
            Auth pages on this local setup require Postgres credentials.
          </p>
          <Link legacyBehavior href="/home">
            <a className="mt-6 inline-block rounded-lg border border-[#168a46] px-5 py-2.5 font-bold text-[#168a46]">Back to Home</a>
          </Link>
        </div>
      </div>
    </>
  );
}
