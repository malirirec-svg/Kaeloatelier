import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatUGX } from '../data/products.js'

const orderNumber = Math.floor(100000 + Math.random() * 900000)

const summaryItems = [
  { name: 'Cashmere Crew Sweater — Black', qty: 1, size: 'M', price: 245000 },
  { name: 'Linen Shirt — Sand', qty: 1, size: 'L', price: 220000 },
]

const trackingSteps = [
  { label: 'Order Placed', time: 'Today · 10:32 AM', done: true },
  { label: 'Processing', time: 'Today · 02:15 PM', done: true },
  { label: 'Shipped', time: 'Pending', done: false },
  { label: 'Out for Delivery', time: 'Pending', done: false },
  { label: 'Delivered', time: 'Expected in 2-3 days', done: false },
]

export default function OrderConfirmation() {
  const [tracking, setTracking] = useState(false)
  const subtotal = summaryItems.reduce((s, i) => s + i.price * i.qty, 0)

  if (tracking) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setTracking(false)} className="text-navy-700">
            ←
          </button>
          <h1 className="font-display text-2xl text-navy-700">Track Order</h1>
        </div>

        <div className="flex items-center justify-between border border-navy-100 rounded-md px-4 py-3 mb-6">
          <span className="font-semibold text-navy-700">Order #{orderNumber}</span>
          <span className="bg-leaf/10 text-leaf text-xs font-semibold px-2 py-1 rounded-full">In Transit</span>
        </div>

        <h2 className="font-semibold text-navy-700 mb-4">Delivery Progress</h2>
        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[9px] top-2 bottom-2 w-px bg-navy-100" />
          {trackingSteps.map((s) => (
            <div key={s.label} className="relative">
              <div
                className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
                  s.done ? 'bg-navy-700 text-white' : 'border-2 border-navy-100 bg-white'
                }`}
              >
                {s.done ? '✓' : ''}
              </div>
              <p className={`font-medium ${s.done ? 'text-navy-700' : 'text-navy-400'}`}>{s.label}</p>
              <p className="text-xs text-navy-400">{s.time}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-navy-100 rounded-lg p-4">
          <p className="font-semibold text-navy-700 mb-3">Courier Details</p>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=200&q=80"
              alt="Courier"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-navy-700 text-sm">David Kyobe</p>
              <p className="text-xs text-navy-400">Your Courier · +256 701 234 567</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 border border-navy-100 rounded-md py-2.5 text-sm font-medium">📞 Call</button>
            <button className="flex-1 bg-navy-700 text-white rounded-md py-2.5 text-sm font-medium">💬 Message</button>
          </div>
        </div>
        <p className="text-center text-xs text-navy-400 mt-4">Estimated delivery: Today, 4:00–6:00 PM · Kampala, Uganda</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="font-display text-lg tracking-widest2 text-navy-700 mb-8">KAELŌ ATELIER</div>
      <div className="w-16 h-16 rounded-full bg-leaf text-white flex items-center justify-center text-3xl mx-auto mb-6">
        ✓
      </div>
      <h1 className="font-display text-2xl text-navy-700 mb-2">Order Placed Successfully</h1>
      <p className="text-navy-400 mb-8">Thank you for your purchase! Your order is confirmed.</p>

      <div className="border border-navy-100 rounded-lg p-4 mb-6 text-left">
        <p className="text-xs text-navy-400">Order #</p>
        <p className="font-semibold text-navy-700 text-lg">{orderNumber}</p>
      </div>

      <div className="text-left mb-6">
        <h2 className="font-semibold text-navy-700 mb-3">Order Summary</h2>
        <div className="space-y-3">
          {summaryItems.map((i) => (
            <div key={i.name} className="flex justify-between text-sm">
              <div>
                <p className="text-navy-700">{i.name}</p>
                <p className="text-navy-400 text-xs">
                  Qty {i.qty} · Size {i.size}
                </p>
              </div>
              <p className="font-semibold text-navy-700">{formatUGX(i.price)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-100 mt-4 pt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-navy-400">
            <span>Subtotal</span>
            <span>{formatUGX(subtotal)}</span>
          </div>
          <div className="flex justify-between text-leaf">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-navy-700 text-base">
            <span>Total</span>
            <span>{formatUGX(subtotal)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setTracking(true)}
        className="w-full bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3.5 rounded-md transition-colors"
      >
        Track Order
      </button>
      <p className="text-xs text-navy-400 mt-4">A confirmation email has been sent to your email</p>
      <Link to="/products" className="block mt-4 text-sm text-leaf underline">
        Continue Shopping
      </Link>
    </div>
  )
}
