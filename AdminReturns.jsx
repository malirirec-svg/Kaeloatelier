import React, { useState } from 'react'
import { returnRequests as initialReturns } from '../../data/orders.js'
import { formatUGX } from '../../data/products.js'

export default function AdminReturns() {
  const [returns, setReturns] = useState(initialReturns)

  function approveRefund(id) {
    setReturns((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Refund Approved', approved: true } : r)))
  }

  const activeCount = returns.filter((r) => !r.approved).length

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl md:text-3xl text-navy-700 mb-6 text-center md:text-left">
        Returns & Refunds
      </h1>

      <div className="flex justify-center md:justify-start mb-6">
        <span className="bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          Active · {activeCount} Request{activeCount !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-6 max-w-xl mx-auto md:mx-0">
        {returns.map((r) => (
          <div key={r.id} className="bg-white border border-navy-100 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-navy-700">Return Request {r.id}</h2>
            </div>
            <span
              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${
                r.approved ? 'bg-leaf/10 text-leaf' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {r.approved ? '✓ Refund Approved' : `⏱ ${r.status}`}
            </span>

            <div className="flex gap-3 border-t border-navy-100 pt-4 mb-4">
              <div className="w-16 h-16 bg-navy-50 rounded-md shrink-0" />
              <div>
                <p className="font-medium text-navy-700 text-sm">{r.item}</p>
                <p className="text-xs text-navy-400">
                  Order {r.order} · Purchased {r.purchased}
                </p>
              </div>
            </div>

            <div className="border-t border-navy-100 pt-4 mb-4">
              <p className="text-xs text-navy-400">Refund Amount</p>
              <p className="font-bold text-navy-700 text-lg">{formatUGX(r.refundAmount)}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-navy-400">Reason for Return</p>
              <p className="text-sm text-navy-700">
                <strong>Reason: {r.reason}</strong> — Customer requested refund.
              </p>
              <p className="text-sm text-navy-400 italic mt-1">Customer note: "{r.note}"</p>
            </div>

            <button
              onClick={() => approveRefund(r.id)}
              disabled={r.approved}
              className="w-full bg-navy-700 hover:bg-navy-800 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              ✓ {r.approved ? 'Refund Approved' : `Approve Refund ${formatUGX(r.refundAmount)}`}
            </button>
            <p className="text-center text-xs text-navy-400 mt-2">Customer will be notified once approved</p>
          </div>
        ))}
      </div>
    </div>
  )
}
