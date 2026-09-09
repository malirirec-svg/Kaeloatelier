import React, { useMemo, useState } from 'react'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('recommended')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = products.filter((p) => activeCategory === 'All' || p.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, sort, query])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-2xl md:text-3xl text-navy-700 mb-6">All Products</h1>

      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, categories..."
          className="w-full border border-navy-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === c
                  ? 'bg-navy-700 text-white border-navy-700'
                  : 'border-navy-100 text-navy-700 hover:border-navy-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-navy-400">{filtered.length} items</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-navy-100 rounded-md px-2 py-1.5 text-sm"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-navy-400 py-16 text-center">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
