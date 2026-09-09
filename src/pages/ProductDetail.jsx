import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, formatUGX, products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [size, setSize] = useState(product?.sizes?.[1] || product?.sizes?.[0])
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-navy-700 mb-4">Product not found.</p>
        <Link to="/products" className="text-leaf underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)
  const lowStock = product.stock <= 3

  function handleAddToCart() {
    addToCart(product, size, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="text-navy-400 text-sm mb-4">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] bg-navy-50 rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <h1 className="font-display text-3xl text-navy-700">{product.name}</h1>
            <button onClick={() => toggleWishlist(product)} aria-label="Wishlist">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isWishlisted(product.id) ? '#DC2626' : 'none'}
                stroke={isWishlisted(product.id) ? '#DC2626' : '#1C1917'}
                strokeWidth="1.6"
              >
                <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.8 6.3 5 5.1c2.2-.8 4.3.1 5.5 1.8L12 8.1l1.5-1.2c1.2-1.7 3.3-2.6 5.5-1.8 3.2 1.2 4.1 5 2.3 7.8C18.7 16.65 12 21 12 21z" />
              </svg>
            </button>
          </div>
          <div className="text-lg text-navy-700 font-semibold mt-2">{formatUGX(product.price)}</div>
          <div className="flex items-center gap-2 mt-2 text-sm text-navy-400">
            <span className="text-amber-500">{'★'.repeat(Math.round(product.rating))}</span>
            {product.rating} ({product.reviews} reviews)
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium text-navy-700 mb-2">Size</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium ${
                    size === s
                      ? 'bg-navy-700 text-white border-navy-700'
                      : 'border-navy-100 text-navy-700 hover:border-navy-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {lowStock && (
              <p className="text-red-600 text-xs mt-2">Only {product.stock} left in {size}</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3.5 rounded-md transition-colors"
          >
            {added ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>

          <div className="mt-8 border-t border-navy-100 divide-y divide-navy-100">
            <Detail title="Fabric" body={product.fabric} />
            <Detail title="Model" body={product.modelInfo} />
            <Detail title="Description" body={product.description} />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl text-navy-700 mb-4">Complete the Look</h2>
            <div className="grid grid-cols-3 gap-3">
              {related.map((r) => (
                <Link key={r.id} to={`/product/${r.id}`} className="block">
                  <div className="aspect-square bg-navy-50 rounded-md overflow-hidden mb-2">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-navy-700">{r.name}</p>
                  <p className="text-xs text-navy-700 font-semibold">{formatUGX(r.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Detail({ title, body }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="py-4">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between text-left">
        <span className="font-semibold text-navy-700">{title}</span>
        <span className="text-navy-400">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="text-sm text-navy-400 mt-2">{body}</p>}
    </div>
  )
}
