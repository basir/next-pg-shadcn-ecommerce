import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/shared/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#eef3ee]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
