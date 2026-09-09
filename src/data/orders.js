// Mock orders used by /account, /admin, /admin/returns

export const recentOrders = [
  { id: '#KWG-10284', customer: 'Brian Okello', total: 1250000, status: 'Completed' },
  { id: '#KWG-10283', customer: 'Naomi Achieng', total: 890000, status: 'Processing' },
  { id: '#KWG-10282', customer: 'David Mugisha', total: 2100000, status: 'Completed' },
  { id: '#KWG-10281', customer: 'Sarah Nalweyiso', total: 450000, status: 'Shipped' },
  { id: '#KWG-10280', customer: 'Peter Kato', total: 3400000, status: 'Cancelled' },
]

export const salesTrend = [
  { day: 'Mon', value: 2.4 },
  { day: 'Tue', value: 3.1 },
  { day: 'Wed', value: 2.9 },
  { day: 'Thu', value: 3.6 },
  { day: 'Fri', value: 3.3 },
  { day: 'Sat', value: 4.2 },
  { day: 'Today', value: 3.8 },
]

export const accountOrders = [
  {
    id: '#123456',
    date: 'Jan 12, 2024',
    item: 'Black Wool Blend Coat',
    total: 480000,
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&q=80',
  },
  {
    id: '#123455',
    date: 'Jan 18, 2024',
    item: 'Striped Linen Shirt',
    total: 149000,
    status: 'Shipped',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80',
  },
]

export const inventoryProducts = [
  { id: 'linen-shirt', name: 'Linen Shirt', category: 'Apparel · Classic Fit', stock: 45, price: 220000, status: 'In Stock' },
  { id: 'cotton-polo', name: 'Cotton Polo Tee', category: 'Apparel', stock: 5, price: 85000, status: 'Low Stock' },
  { id: 'silk-scarf', name: 'Silk Scarf', category: 'Accessories', stock: 5, price: 65000, status: 'Low Stock' },
]

export const returnRequests = [
  {
    id: '#R1021',
    status: 'Awaiting Pickup',
    item: 'Merino Wool Jacket',
    order: '#UG78921',
    purchased: '12 Aug 2025',
    refundAmount: 220000,
    reason: 'Size too small',
    note: 'The jacket is too small for me, please refund.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80',
  },
]
