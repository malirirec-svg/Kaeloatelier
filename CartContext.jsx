import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'kaelo_cart_v1'
const COUPON_KEY = 'kaelo_coupon_v1'

const VALID_COUPONS = {
  WELCOME10: 0.1,
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [coupon, setCoupon] = useState(() => {
    try {
      const raw = localStorage.getItem(COUPON_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon))
  }, [coupon])

  function addToCart(product, size, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          color: product.color,
          size,
          qty,
        },
      ]
    })
  }

  function updateQty(id, size, qty) {
    if (qty < 1) return
    setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)))
  }

  function removeFromCart(id, size) {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
  }

  function clearCart() {
    setItems([])
    setCoupon(null)
  }

  function applyCoupon(code) {
    const normalized = code.trim().toUpperCase()
    if (VALID_COUPONS[normalized]) {
      setCoupon({ code: normalized, discount: VALID_COUPONS[normalized] })
      return { success: true }
    }
    return { success: false, message: 'Invalid coupon code' }
  }

  function removeCoupon() {
    setCoupon(null)
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discount = coupon ? subtotal * coupon.discount : 0
  const FREE_SHIPPING_THRESHOLD = 200000
  const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15000
  const total = subtotal - discount + shipping
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
