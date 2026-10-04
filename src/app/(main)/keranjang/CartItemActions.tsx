'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Trash2, Minus, Plus } from 'lucide-react'
import { API_URL } from '@/lib/api'

export default function CartItemActions({ itemId, quantity, stock }: { itemId: number, quantity: number, stock: number }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > stock) return
    setLoading(true)
    try {
      await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
        credentials: 'include'
      })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async () => {
    setLoading(true)
    try {
      await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-lg overflow-hidden bg-background">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-colors"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={loading || quantity <= 1}
        >
          <Minus className="w-3 h-3" />
        </button>
        <div className="w-10 h-8 flex items-center justify-center font-medium text-sm text-center">
          {loading ? '...' : quantity}
        </div>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-colors"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={loading || quantity >= stock}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      <Button variant="ghost" size="sm" onClick={removeItem} disabled={loading} className="text-error hover:bg-error/10 h-8 px-2">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
