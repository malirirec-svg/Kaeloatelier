import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AdminSidebar from './components/AdminSidebar.jsx'

import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Account from './pages/Account.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'

import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminInventory from './pages/admin/AdminInventory.jsx'
import AdminReturns from './pages/admin/AdminReturns.jsx'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <div className="min-h-screen flex bg-navy-50/40">
        <AdminSidebar />
        <div className="flex-1 min-w-0 pb-16 md:pb-0">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/returns" element={<AdminReturns />} />
          </Routes>
        </div>
        <AdminSidebar mobile />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
