import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

const links = [
  { to: '/products', label: 'Women' },
  { to: '/products', label: 'Men' },
  { to: '/products', label: 'New In' },
  { to: '/products', label: 'Sale' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const { wishlist } = useWishlist()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl md:text-2xl tracking-widest2 text-navy-700">
            KAELŌ ATELIER
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-navy-700">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} className="hover:text-leaf transition-colors">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative p-1 text-navy-700 hover:text-leaf transition-colors" aria-label="Wishlist">
              <HeartIcon />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-leaf text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-1 text-navy-700 hover:text-leaf transition-colors" aria-label="Cart">
              <BagIcon />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-leaf text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="p-1 text-navy-700 hover:text-leaf transition-colors" aria-label="Account">
              <UserIcon />
            </Link>
            <button
              className="md:hidden p-1 text-navy-700"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-3 pb-4 text-sm text-navy-700 border-t border-navy-100 pt-3">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} onClick={() => setMenuOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.1 1.8 6.3 5 5.1c2.2-.8 4.3.1 5.5 1.8L12 8.1l1.5-1.2c1.2-1.7 3.3-2.6 5.5-1.8 3.2 1.2 4.1 5 2.3 7.8C18.7 16.65 12 21 12 21z" />
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 5-6 7.5-6s6 2 7.5 6" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}
