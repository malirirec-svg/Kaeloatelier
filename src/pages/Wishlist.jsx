import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatUGX } from '../data/products.js'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-navy-700 mb-3">Your wishlist is empty</h1>
        <p className="text-navy-400 mb-6">Save items you love for later.</p>
        <Link to="/products" className="bg-navy-700 text-white px-6 py-3 rounded-md text-sm font-semibold">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-navy-700 tracking-wide">WISHLIST / FAVORITES</h1>
        <span className="text-sm text-navy-400">{wishlist.length} items</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="border border-navy-100 rounded-lg overflow-hidden bg-white">
            <div className="relative aspect-square bg-navy-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                aria-label="Remove from wishlist"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#DC2626" stroke="#DC2626" strokeWidth="1.8">
                  <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.8 6.3 5 5.1c2.2-.8 4.3.1 5.5 1.8L12 8.1l1.5-1.2c1.2-1.7 3.3-2.6 5.5-1.8 3.2 1.2 4.1 5 2.3 7.8C18.7 16.65 12 21 12 21z" />
                </svg>
              </button>
            </div>
            <div className="p-3">
              <Link to={`/product/${product.id}`} className="text-sm font-medium text-navy-700 uppercase tracking-wide">
                {product.name}
              </Link>
              <p className="text-sm font-semibold text-navy-700 mt-1">{formatUGX(product.price)}</p>
              <p className="text-xs text-navy-400 mb-3">
                {product.stock > 0 ? 'In stock' : 'Out of stock'}
              </p>
              {product.stock > 0 ? (
                <button
                  onClick={() => addToCart(product, product.sizes[0], 1)}
                  className="w-full bg-navy-700 text-white text-xs font-semibold py-2 rounded-md"
                >
                  Add to Bag
                </button>
              ) : (
                <button className="w-full border border-navy-100 text-navy-700 text-xs font-semibold py-2 rounded-md">
                  Notify me when back in stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
