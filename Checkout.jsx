import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatUGX } from '../data/products.js'

const steps = ['Cart', 'Information', 'Payment', 'Review']

export default function Checkout() {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: 'John Mugisha',
    phone: '+256 772 123 456',
    address: 'Plot 45, Kampala Road, Kampala',
    city: 'Kampala',
  })
  const [payment, setPayment] = useState('momo')
  const [placing, setPlacing] = useState(false)

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-navy-700 mb-4">Your cart is empty.</p>
        <Link to="/products" className="text-leaf underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handlePlaceOrder(e) {
    e.preventDefault()
    setPlacing(true)
    // Mock payment processing delay
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation')
    }, 900)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-2xl text-navy-700 text-center tracking-widest2 mb-6">CHECKOUT</h1>

      <div className="flex items-center justify-between mb-8 text-xs">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                i <= 1 ? 'bg-navy-700 text-white' : 'border border-navy-100 text-navy-400'
              }`}
            >
              {i < 1 ? '✓' : ''}
            </div>
            <span className={`ml-1.5 ${i === 1 ? 'font-semibold text-navy-700' : 'text-navy-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-navy-100 mx-2" />}
          </div>
        ))}
      </div>

      <form onSubmit={handlePlaceOrder}>
        <section className="mb-8">
          <h2 className="font-semibold text-navy-700 mb-4 tracking-wide">1. SHIPPING ADDRESS</h2>
          <div className="space-y-4">
            <Field label="Name" name="name" value={form.name} onChange={handleChange} />
            <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Field label="Address" name="address" value={form.address} onChange={handleChange} />
            <Field label="City" name="city" value={form.city} onChange={handleChange} />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-navy-700 mb-4 tracking-wide">2. PAYMENT METHOD</h2>
          <div className="space-y-3">
            <PaymentOption
              id="momo"
              label="Mobile Money — MTN / Airtel"
              selected={payment === 'momo'}
              onSelect={setPayment}
              badge={
                <div className="flex gap-1">
                  <span className="bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded text-navy-900">MTN</span>
                  <span className="bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">Airtel</span>
                </div>
              }
            />
            <PaymentOption id="card" label="Card" selected={payment === 'card'} onSelect={setPayment} badge="💳" />
            <PaymentOption id="cod" label="Cash on Delivery" selected={payment === 'cod'} onSelect={setPayment} badge="💵" />
          </div>

          {payment === 'momo' && (
            <div className="mt-4 bg-navy-50 rounded-md p-4 text-sm text-navy-700">
              You'll receive a mobile money prompt on <strong>{form.phone}</strong> to approve payment of{' '}
              <strong>{formatUGX(total)}</strong>.
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-navy-700 mb-4 tracking-wide">3. ORDER SUMMARY</h2>
          <div className="border border-navy-100 rounded-lg divide-y divide-navy-100">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center gap-3 p-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md bg-navy-50" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy-700">{item.name}</p>
                  <p className="text-xs text-navy-400">
                    Qty: {item.qty} · Size: {item.size} · Color: {item.color}
                  </p>
                </div>
                <p className="text-sm font-semibold text-navy-700">{formatUGX(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-navy-400">
              <span>Subtotal</span>
              <span>{formatUGX(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-leaf">
                <span>Discount</span>
                <span>-{formatUGX(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-navy-400">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatUGX(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold text-navy-700 text-base border-t border-navy-100 pt-2">
              <span>Total</span>
              <span>{formatUGX(total)}</span>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-navy-700 hover:bg-navy-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-md transition-colors"
        >
          {placing ? 'Placing Order…' : 'Place Order'}
        </button>
        <p className="text-center text-xs text-navy-400 mt-3">🔒 Secure checkout · Your data is protected</p>
      </form>
    </div>
  )
}

function Field({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1.5">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-navy-100 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
      />
    </div>
  )
}

function PaymentOption({ id, label, selected, onSelect, badge }) {
  return (
    <label
      className={`flex items-center justify-between border rounded-md px-4 py-3.5 cursor-pointer ${
        selected ? 'border-navy-700 ring-1 ring-navy-700' : 'border-navy-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="payment"
          checked={selected}
          onChange={() => onSelect(id)}
          className="accent-navy-700"
        />
        <span className="text-sm text-navy-700">{label}</span>
      </div>
      <span>{badge}</span>
    </label>
  )
}
