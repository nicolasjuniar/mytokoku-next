import { cookies } from 'next/headers'
import Link from 'next/link'
import { API_URL } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import CartItemActions from './CartItemActions'
import { ShoppingCart } from 'lucide-react'

export default async function CartPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('user_token')?.value

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card className="max-w-md mx-auto p-10 border-border bg-surface">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Keranjang Kosong</h2>
          <p className="text-muted-foreground mb-8">Silakan masuk ke akun Anda untuk melihat keranjang belanja.</p>
          <Link href="/login">
            <Button size="lg" className="w-full rounded-xl">Masuk ke Akun</Button>
          </Link>
        </Card>
      </div>
    )
  }

  let cartItems: any[] = []
  try {
    const res = await fetch(`${API_URL}/cart`, {
      headers: { Cookie: `user_token=${token}` },
      cache: 'no-store'
    })
    if (res.ok) {
      cartItems = await res.json()
    }
  } catch (e) {}

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-8">Keranjang Belanja</h1>
        
        {cartItems.length === 0 ? (
          <Card className="p-16 text-center border-dashed">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-foreground mb-2">Keranjang Anda kosong</h2>
            <p className="text-muted-foreground mb-6">Yuk temukan barang impianmu di katalog!</p>
            <Link href="/katalog">
              <Button size="lg" className="rounded-xl">Mulai Belanja</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="p-4 flex gap-6 items-center">
                  <img src={item.product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200'} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg border" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-1">{item.product.name}</h3>
                    <div className="text-primary font-bold mb-3">Rp {item.product.price.toLocaleString('id-ID')}</div>
                    <CartItemActions itemId={item.id} quantity={item.quantity} stock={item.product.stock} />
                  </div>
                  <div className="text-right flex flex-col justify-between h-full py-2">
                    <div className="font-bold text-foreground">
                      Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div>
              <Card className="p-6 sticky top-24 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Ringkasan Belanja</h3>
                <div className="flex justify-between items-center mb-4 text-muted-foreground">
                  <span>Total Harga ({cartItems.length} barang)</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-extrabold text-2xl text-primary">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <Button size="lg" className="w-full rounded-xl shadow-lg shadow-primary/20">
                  Beli ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
