import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const newArrivals = products.filter((p) => p.tag === 'New Arrival')
  const trending = products.filter((p) => p.tag === 'Trending')

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[480px] md:h-[560px] bg-navy-700 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600&q=80"
            alt="Autumn essentials"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
          <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <h1 className="font-display text-3xl md:text-5xl text-white mb-3">AUTUMN ESSENTIALS</h1>
            <p className="text-white/90 max-w-md mb-6">
              Timeless pieces for the season. Designed for modern living.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-navy-700 w-fit px-5 py-3 text-sm font-semibold rounded"
            >
              SHOP NOW →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl text-navy-700 mb-6">New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl text-navy-700 mb-6">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-leaf/5 border-y border-leaf/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-navy-700">
          Free shipping on orders over UGX 200,000 · Returns within 30 days · Customer Service
        </div>
      </section>
    </div>
  )
}
