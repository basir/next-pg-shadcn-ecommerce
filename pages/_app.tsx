import type { AppProps } from "next/app";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/footer";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex min-h-screen flex-col bg-[#eef3ee]">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
}

