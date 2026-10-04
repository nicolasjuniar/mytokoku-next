import Link from 'next/link'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/Button'
import LogoutButton from './LogoutButton'
import { API_URL } from '@/lib/api'
import { ShoppingCart } from 'lucide-react'

export default async function AuthNav() {
  const cookieStore = await cookies()
  const token = cookieStore.get('user_token')?.value

  let cartCount = 0
  if (token) {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Cookie: `user_token=${token}` },
        cache: 'no-store'
      })
      if (res.ok) {
        const cartItems = await res.json()
        cartCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0)
      }
    } catch (e) {
      console.error('Failed to fetch cart', e)
    }

    return (
      <div className="flex items-center gap-6">
        <Link href="/keranjang" className="relative text-muted-foreground hover:text-primary transition-colors">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">Halo, Pengguna!</span>
          <LogoutButton />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Link href="/login">
        <Button variant="ghost" className="text-muted-foreground hover:text-primary">Masuk</Button>
      </Link>
      <Link href="/register">
        <Button>Daftar</Button>
      </Link>
    </div>
  )
}
