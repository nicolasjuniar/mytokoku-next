import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { fetchProducts } from '@/lib/api';

const categoryImages = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400'
];

export default async function Home() {
  let latestProducts = [];
  try {
    const data = await fetchProducts(1, 10);
    latestProducts = data.data || [];
  } catch (error) {
    console.error('Failed to load latest products', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-surface to-muted border-b overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center relative z-10">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide border border-primary/20">
            SELAMAT DATANG DI MYTOKOKU
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-tight max-w-4xl mb-6">
            Belanja Kebutuhan <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-info">Lebih Mudah & Cepat</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Temukan ribuan produk pilihan dari berbagai kategori dengan harga terbaik. Mulai dari makanan, elektronik, hingga kebutuhan rumah tangga.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/katalog">
              <Button size="lg" className="w-full sm:w-auto px-10 py-6 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Mulai Belanja
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg rounded-2xl hover:bg-surface">
                Masuk ke Akun
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Kategori Populer</h2>
          <p className="text-muted-foreground text-lg">Pilihan kategori terbaik untuk Anda</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Makanan', 'Minuman', 'Elektronik', 'Fashion'].map((cat, i) => (
            <Link href={`/katalog`} key={i} className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-md hover:shadow-xl transition-all border border-border">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              <img src={categoryImages[i]} alt={cat} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <h3 className="absolute bottom-6 left-6 z-20 text-2xl font-bold text-white group-hover:text-primary-foreground transition-colors">{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Produk Terbaru</h2>
            <p className="text-muted-foreground text-lg">Koleksi teranyar di MyTokoKu</p>
          </div>
          <Link href="/katalog">
            <Button variant="outline" className="hidden sm:inline-flex rounded-xl">Lihat Semua</Button>
          </Link>
        </div>
        
        {latestProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-dashed">
            <p className="text-muted-foreground text-lg">Produk belum tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {latestProducts.map((product: any) => (
              <Link href={`/katalog/${product.id}`} key={product.id} className="block group">
                <Card className="overflow-hidden flex flex-col hover:border-primary/50 transition-all hover:shadow-lg h-full">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <Badge variant="secondary" className="shadow-sm backdrop-blur-sm bg-surface-elevated/80 border border-border text-foreground">
                        {product.category?.name || 'Umum'}
                      </Badge>
                    </div>
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-foreground line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-auto space-y-3">
                      <div className="text-xl font-extrabold text-primary">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-10 text-center sm:hidden">
          <Link href="/katalog">
            <Button variant="outline" className="w-full rounded-xl">Lihat Semua Katalog</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
