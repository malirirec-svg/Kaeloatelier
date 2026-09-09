# Kaelō Atelier

Premium fashion e-commerce storefront for Uganda, built with React + Vite + Tailwind CSS.

## Stack
- React 18 + Vite
- Tailwind CSS (custom navy `#1A2B4C` / leaf green `#2E7D32` / white palette)
- React Router v6
- Context API (`CartContext`, `WishlistContext`) with `localStorage` persistence
- Mock data only — no backend required

## Getting started
```bash
npm install
npm run dev
```
Open the printed local URL (default `http://localhost:5173`).

To build for production:
```bash
npm run build
npm run preview
```

## Project structure
```
src/
  components/     Navbar, Footer, ProductCard, AdminSidebar
  context/        CartContext.jsx, WishlistContext.jsx
  data/           products.js, orders.js (mock data)
  pages/          12 route components (customer + admin)
  App.jsx         Routing — switches between storefront layout and admin layout
  main.jsx        App entry, wraps providers + router
```

## Routes
**Customer:** `/`, `/products`, `/product/:id`, `/cart`, `/checkout`, `/wishlist`, `/account`, `/order-confirmation`
**Admin:** `/admin`, `/admin/inventory`, `/admin/returns`

## Notable features
- Cart & wishlist persist across reloads via `localStorage`
- Coupon code `WELCOME10` applies 10% off in the cart
- Free shipping unlocks automatically over UGX 200,000
- Checkout offers Mobile Money (MTN/Airtel), Card, and Cash on Delivery (mock — no real payment processing)
- Admin dashboard: stats cards, recent orders table, 7-day sales trend
- Admin inventory: low-stock alert banner, "+ Add Stock" (adds 10 units)
- Admin returns: approve-refund workflow

## Next steps for production
- Replace mock data in `src/data/` with real API calls
- Wire Mobile Money / Card payment buttons to a real gateway (e.g. Flutterwave, Pesapal)
- Add authentication for `/account` and `/admin`
- Replace Unsplash placeholder images with real product photography
