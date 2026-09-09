import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-lg tracking-widest2 mb-3">KAELŌ ATELIER</div>
          <p className="text-navy-100">Timeless pieces for modern living. Kampala, Uganda.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Shop</div>
          <ul className="space-y-2 text-navy-100">
            <li>Women</li>
            <li>Men</li>
            <li>New In</li>
            <li>Sale</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Support</div>
          <ul className="space-y-2 text-navy-100">
            <li>Track Order</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Newsletter</div>
          <p className="text-navy-100 mb-3">Get updates on new arrivals & offers.</p>
          <div className="flex">
            <input
              className="flex-1 min-w-0 px-3 py-2 text-navy-700 text-sm rounded-l"
              placeholder="Email address"
            />
            <button className="bg-leaf px-4 rounded-r text-sm font-medium">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-navy-100 py-4">
        Free shipping on orders over UGX 200,000 · Returns within 30 days · © {new Date().getFullYear()} Kaelō Atelier
      </div>
    </footer>
  )
}
