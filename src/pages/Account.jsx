import React from 'react'
import { Link } from 'react-router-dom'
import { accountOrders } from '../data/orders.js'
import { useWishlist } from '../context/WishlistContext.jsx'
import { formatUGX } from '../data/products.js'

const statusColor = {
  Delivered: 'bg-leaf/10 text-leaf',
  Shipped: 'bg-navy-100 text-navy-700',
  Processing: 'bg-yellow-100 text-yellow-700',
}

export default function Account() {
  const { wishlist } = useWishlist()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl text-navy-700 text-center mb-8">My Account</h1>

      <div className="flex items-center gap-4 border-b border-navy-100 pb-6 mb-6">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80"
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-navy-700 text-lg">John Mugisha</p>
          <p className="text-sm text-navy-400">john.mugisha@email.com</p>
        </div>
        <span className="text-navy-400">›</span>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy-700 text-lg">Recent Orders</h2>
          <span className="text-sm text-leaf underline">See all</span>
        </div>
        <div className="space-y-3">
          {accountOrders.map((o) => (
            <div key={o.id} className="border border-navy-100 rounded-lg p-3 flex gap-3">
              <img src={o.image} alt={o.item} className="w-16 h-20 object-cover rounded-md bg-navy-50" />
              <div className="flex-1">
                <p className="font-semibold text-navy-700 text-sm">Order {o.id}</p>
                <p className="text-xs text-navy-400">
                  {o.date} · {o.item}
                </p>
                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${statusColor[o.status]}`}>
                  {o.status}
                </span>
              </div>
              <p className="font-semibold text-navy-700 text-sm">{formatUGX(o.total)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy-700 text-lg">Wishlist</h2>
          <Link to="/wishlist" className="text-sm text-leaf underline">
            See all ({wishlist.length})
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {wishlist.slice(0, 3).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <div className="aspect-square bg-navy-50 rounded-md overflow-hidden mb-1">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-navy-700">{p.name}</p>
              <p className="text-xs font-semibold text-navy-700">{formatUGX(p.price)}</p>
            </Link>
          ))}
          {wishlist.length === 0 && <p className="text-sm text-navy-400 col-span-3">No items saved yet.</p>}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-navy-700 text-lg mb-3">Account</h2>
        <div className="border border-navy-100 rounded-lg divide-y divide-navy-100">
          <AccountRow label="Order History" />
          <AccountRow label="Wishlist" />
          <AccountRow label="Saved Addresses" />
          <AccountRow label="Saved Payment Methods" />
        </div>
        <button className="w-full mt-6 border border-navy-700 text-navy-700 font-semibold py-3.5 rounded-md">
          ⇄ Login / Signup
        </button>
      </section>
    </div>
  )
}

function AccountRow({ label }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-sm text-navy-700">{label}</span>
      <span className="text-navy-400">›</span>
    </div>
  )
}
