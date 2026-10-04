'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ShoppingCart } from 'lucide-react'
import { API_URL } from '@/lib/api'

export default function AddToCartButton({ productId, variant = 'default', size = 'md', className = '' }: { productId: number, variant?: any, size?: any, className?: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
        credentials: 'include'
      })
      
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login')
          return
        }
        const data = await res.json()
        alert(data.error || 'Gagal menambahkan ke keranjang')
        return
      }
      
      router.refresh()
    } catch (e) {
      alert('Gagal menambahkan ke keranjang')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={`gap-2 ${className}`} 
      onClick={handleAddToCart}
      disabled={loading}
    >
      <ShoppingCart className="w-5 h-5" />
      {loading ? 'Menambahkan...' : 'Tambahkan ke Keranjang'}
    </Button>
  )
}
