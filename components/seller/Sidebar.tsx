'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import {
  FaBoxOpen,
  FaChartLine,
  FaPlusCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    {
      name: 'Dashboard',
      href: '/seller/dashboard',
      icon: FaChartLine,
    },
    {
      name: 'My Products',
      href: '/seller/products',
      icon: FaBoxOpen,
    },
    {
      name: 'Add Product',
      href: '/seller/products/add',
      icon: FaPlusCircle,
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur-md md:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/20 bg-white/10 text-white backdrop-blur-[40px] transition-transform duration-300 md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col p-6">
          {/* Logo / Brand */}
          <div className="mb-10 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
            <span className="text-xl font-bold tracking-wide">Seller Portal</span>
          </div>

          <nav className="flex-1 space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-green-400/20 to-green-600/20 text-green-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                      : 'hover:bg-white/5 hover:translate-x-1'
                  )}
                >
                  <Icon className={cn('text-lg', isActive ? 'text-green-400' : 'text-white/70')} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* User / Sign Out */}
          <div className="mt-auto border-t border-white/10 pt-6">
            <button
               onClick={() => signOut({ callbackUrl: '/home' })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-300 transition-all hover:bg-red-500/10"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  )
}

export default Sidebar
