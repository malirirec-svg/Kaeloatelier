import React from 'react'
import { Link } from 'react-router-dom'
import { formatUGX } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="group border border-navy-100 rounded-lg overflow-hidden bg-white flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block bg-navy-50 aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.tag && (
          <span className="absolute top-2 left-2 bg-white/90 text-navy-700 text-[10px] tracking-wide uppercase px-2 py-1 rounded">
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product)
          }}
          aria-label="Toggle wishlist"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={wishlisted ? '#DC2626' : 'none'}
            stroke={wishlisted ? '#DC2626' : '#1C1917'}
            strokeWidth="1.8"
          >
            <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.8 6.3 5 5.1c2.2-.8 4.3.1 5.5 1.8L12 8.1l1.5-1.2c1.2-1.7 3.3-2.6 5.5-1.8 3.2 1.2 4.1 5 2.3 7.8C18.7 16.65 12 21 12 21z" />
          </svg>
        </button>
      </Link>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-navy-700 line-clamp-2">
          {product.name}
        </Link>
        <div className="text-sm text-navy-700 font-semibold">
          {formatUGX(product.price)}
          {product.compareAt && (
            <span className="ml-2 text-xs text-navy-400 line-through font-normal">
              {formatUGX(product.compareAt)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product, product.sizes[0], 1)}
          className="mt-auto bg-navy-700 hover:bg-navy-800 text-white text-xs font-medium py-2 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
