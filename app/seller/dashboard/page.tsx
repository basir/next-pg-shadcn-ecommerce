'use client'

import React from 'react'
import Link from 'next/link'
import {
  FaBoxOpen,
  FaClipboardList,
  FaDollarSign,
  FaPlus,
  FaEye,
} from 'react-icons/fa'
import { cn } from '@/lib/utils'

// Mock Data for Dashboard
const stats = [
  {
    label: 'Total Products',
    value: '24',
    icon: FaBoxOpen,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    label: 'Active Orders',
    value: '12',
    icon: FaClipboardList,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    label: 'Revenue',
    value: '₹45,200',
    icon: FaDollarSign,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
]

const recentOrders = [
  {
    id: 'ORD-001',
    product: 'Organic Fertilizer 5kg',
    customer: 'Rahul Kumar',
    date: '2024-05-10',
    amount: '₹450',
    status: 'Pending',
  },
  {
    id: 'ORD-002',
    product: 'Pesticide Sprayer',
    customer: 'Amit Singh',
    date: '2024-05-09',
    amount: '₹1,200',
    status: 'Shipped',
  },
  {
    id: 'ORD-003',
    product: 'Hybrid Tomato Seeds',
    customer: 'Sunita Devi',
    date: '2024-05-08',
    amount: '₹250',
    status: 'Delivered',
  },
]

export default function SellerDashboard() {
  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-white/70">Overview of your store performance</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/seller/products"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/10"
          >
            <FaEye /> View Products
          </Link>
          <Link
            href="/seller/products/add"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4ade80] to-[#2E7D32] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
          >
            <FaPlus /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-[40px] shadow-[0_8px_30px_0_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={cn('rounded-full p-3', stat.bg)}>
                <stat.icon className={cn('text-xl', stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-[40px] shadow-[0_8px_30px_0_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <div className="border-b border-white/10 p-6">
          <h3 className="text-lg font-bold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.product}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-white/70">{order.date}</td>
                  <td className="px-6 py-4 font-bold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-semibold',
                        order.status === 'Delivered'
                          ? 'bg-green-400/20 text-green-300'
                          : order.status === 'Shipped'
                          ? 'bg-blue-400/20 text-blue-300'
                          : 'bg-yellow-400/20 text-yellow-300'
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
