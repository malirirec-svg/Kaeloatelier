import React, { useState } from 'react'
import { inventoryProducts as initialInventory } from '../../data/orders.js'
import { formatUGX } from '../../data/products.js'

export default function AdminInventory() {
  const [inventory, setInventory] = useState(initialInventory)
  const lowStockCount = inventory.filter((p) => p.status === 'Low Stock').length

  function addStock(id) {
    setInventory((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: p.stock + 10, status: p.stock + 10 > 10 ? 'In Stock' : 'Low Stock' }
          : p
      )
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl md:text-3xl text-navy-700 mb-6">Inventory Management</h1>

      {lowStockCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm rounded-md px-4 py-3 mb-6 flex items-center gap-2">
          ⚠️ Low stock alert · {lowStockCount} items need restocking
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-navy-700 text-lg">Products</h2>
        <span className="text-sm text-navy-400">{inventory.length} Total Items</span>
      </div>

      <div className="space-y-4">
        {inventory.map((p) => (
          <div key={p.id} className="bg-white border border-navy-100 rounded-lg p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-navy-50 rounded-md shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-navy-700">{p.name}</p>
                <p className="text-xs text-navy-400">{p.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-sm font-medium ${p.status === 'Low Stock' ? 'text-yellow-700' : 'text-leaf'}`}>
                    Stock: {p.stock} · {p.status}
                  </span>
                  <span className="text-sm font-semibold text-navy-700">{formatUGX(p.price)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => addStock(p.id)}
              className="w-full mt-4 bg-navy-700 hover:bg-navy-800 text-white text-sm font-semibold py-2.5 rounded-md transition-colors"
            >
              + Add Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
