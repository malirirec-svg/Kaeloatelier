import React from 'react'
import { recentOrders, salesTrend } from '../../data/orders.js'
import { formatUGX } from '../../data/products.js'

const statusColor = {
  Completed: 'bg-leaf/10 text-leaf',
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-navy-100 text-navy-700',
  Cancelled: 'bg-red-100 text-red-600',
}

export default function AdminDashboard() {
  const totalSales = 24850000
  const ordersToday = 38
  const activeCustomers = 212
  const maxTrend = Math.max(...salesTrend.map((d) => d.value))

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl md:text-3xl text-navy-700">Overview</h1>
        <button className="hidden md:inline-flex bg-navy-700 text-white text-sm font-semibold px-4 py-2.5 rounded-md items-center gap-2">
          + Add/Edit Products
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="📈" label="Total Sales UGX" value={formatUGX(totalSales)} delta="+12.5% vs last week" />
        <StatCard icon="🛍️" label="Orders Today" value={ordersToday} delta="+5 · New orders: 12" />
        <StatCard icon="👥" label="Active Customers" value={activeCustomers} delta="+18 this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-navy-100 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-navy-100">
            <h2 className="font-semibold text-navy-700">Recent Orders</h2>
            <span className="text-xs text-navy-400">Latest 5 orders</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-400 text-left">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Order #</th>
                  <th className="px-4 py-2.5 font-medium">Customer</th>
                  <th className="px-4 py-2.5 font-medium">Total UGX</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 font-medium text-navy-700">{o.id}</td>
                    <td className="px-4 py-3 text-navy-700">{o.customer}</td>
                    <td className="px-4 py-3 text-navy-700">{o.total.toLocaleString()} UGX</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-navy-100 rounded-lg p-4">
          <h2 className="font-semibold text-navy-700">Sales Trend — Last 7 Days</h2>
          <p className="text-xs text-navy-400 mb-4">UGX revenue</p>
          <div className="flex items-end gap-2 h-32">
            {salesTrend.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-leaf/70 rounded-t"
                  style={{ height: `${(d.value / maxTrend) * 100}%` }}
                  title={`${d.value}M UGX`}
                />
                <span className="text-[10px] text-navy-400">{d.day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-navy-400 mt-3">Peak: Sat · 4.2M UGX</p>
        </div>
      </div>

      <button className="md:hidden w-full mt-6 bg-navy-700 text-white text-sm font-semibold py-3 rounded-md">
        + Add/Edit Products
      </button>
    </div>
  )
}

function StatCard({ icon, label, value, delta }) {
  return (
    <div className="bg-white border border-navy-100 rounded-lg p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-lg">{icon}</div>
      <div>
        <p className="text-xs text-navy-400">{label}</p>
        <p className="text-xl font-bold text-navy-700">{value}</p>
        <p className="text-xs text-leaf">{delta}</p>
      </div>
    </div>
  )
}
