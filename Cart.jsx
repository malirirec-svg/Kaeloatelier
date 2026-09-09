import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatUGX } from '../data/products.js'

export default function Cart() {
  const {
    items,
    updateQty,
    removeFromCart,
    coupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    shipping,
    total,
    itemCount,
    FREE_SHIPPING_THRESHOLD,
  } = useCart()
  const [code, setCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const navigate = useNavigate()

  const remainingForFreeShip = Math.max(FREE_SHIPPING_THRESHOLD - (subtotal - discount), 0)
  const progressPct = Math.min(((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100, 100)

  function handleApply() {
    const result = applyCoupon(code)
    if (!result.success) {
      setCouponError(result.message)
    } else {
      setCouponError('')
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-navy-700 mb-3">Your cart is empty</h1>
        <p className="text-navy-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-navy-700 text-white px-6 py-3 rounded-md text-sm font-semibold">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-navy-700">Cart</h1>
        <span className="text-sm text-navy-400">{itemCount} items</span>
      </div>

      {remainingForFreeShip > 0 ? (
        <div className="bg-leaf/10 border border-leaf/30 rounded-md p-4 mb-6 text-sm text-navy-700">
          Add {formatUGX(remainingForFreeShip)} more for FREE shipping over {formatUGX(FREE_SHIPPING_THRESHOLD)}
          <div className="w-full h-2 bg-navy-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-navy-700 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      ) : (
        <div className="bg-leaf/10 border border-leaf/30 rounded-md p-4 mb-6 text-sm text-leaf font-medium">
          🎉 You've unlocked FREE shipping!
        </div>
      )}

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="border border-navy-100 rounded-lg p-4 flex gap-4">
            <img src={item.image} alt={item.name} className="w-24 h-28 object-cover rounded-md bg-navy-50" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-navy-700">{item.name}</p>
                  <p className="text-xs text-navy-400">
                    {item.color} · Size {item.size}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-navy-400 hover:text-red-600 text-xs"
                >
                  Remove
                </button>
              </div>
              <p className="text-navy-700 font-semibold mt-2">{formatUGX(item.price)}</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                  className="w-8 h-8 border border-navy-100 rounded-md"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                  className="w-8 h-8 border border-navy-100 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-navy-700 mb-2">✨ Promo & Discount</p>
        {coupon ? (
          <div className="bg-leaf/10 border border-leaf/40 rounded-md p-3 flex items-center justify-between text-sm">
            <span className="text-leaf font-medium">✓ {coupon.code} — {coupon.discount * 100}% OFF applied</span>
            <button onClick={removeCoupon} className="text-navy-400 hover:text-red-600">
              ✕
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code (try WELCOME10)"
              className="flex-1 border border-navy-100 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
            />
            <button
              onClick={handleApply}
              className="bg-navy-700 text-white px-5 rounded-md text-sm font-semibold"
            >
              Apply
            </button>
          </div>
        )}
        {couponError && <p className="text-red-600 text-xs mt-2">{couponError}</p>}
      </div>

      <div className="border-t border-navy-100 pt-4 space-y-2 text-sm">
        <Row label="Subtotal" value={formatUGX(subtotal)} />
        {discount > 0 && <Row label={`Discount (${coupon.discount * 100}%)`} value={`-${formatUGX(discount)}`} valueClass="text-leaf" />}
        <Row label="Shipping" value={shipping === 0 ? 'Free' : formatUGX(shipping)} valueClass={shipping === 0 ? 'text-leaf' : ''} />
        <div className="border-t border-navy-100 pt-2 flex justify-between font-semibold text-navy-700 text-base">
          <span>Total</span>
          <span>{formatUGX(total)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full mt-6 bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3.5 rounded-md transition-colors"
      >
        Checkout
      </button>
      <p className="text-center text-xs text-navy-400 mt-3">🔒 Secure checkout · 30-day returns</p>
    </div>
  )
}

function Row({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between text-navy-700">
      <span className="text-navy-400">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  )
}
