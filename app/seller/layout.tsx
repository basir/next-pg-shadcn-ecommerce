import React from 'react'
import Sidebar from '@/components/seller/Sidebar'

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full relative">
      {/* Full Screen Background Gradient - Lush Farm Green */}
      <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
              background: 'linear-gradient(135deg, #0a210c, #1b431e, #2E7D32)'
          }}
      />

      <div className="relative z-10 flex w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
                {children}
            </div>
        </main>
      </div>
    </div>
  )
}
