import { API_URL } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Package, CheckCircle } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

async function getProduct(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card className="max-w-md mx-auto p-8 border-error/30 bg-error/5">
          <h3 className="text-lg font-bold text-error">Produk tidak ditemukan</h3>
          <p className="text-muted-foreground mt-2 text-sm">Produk yang Anda cari tidak ada atau telah dihapus.</p>
          <Link href="/katalog" className="inline-block mt-6">
            <Button variant="outline">Kembali ke Katalog</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/katalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden border shadow-md">
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit mb-4 text-sm">{product.category?.name || 'Umum'}</Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">{product.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description || 'Deskripsi produk belum tersedia.'}
            </p>

            {/* Price Card */}
            <Card className="bg-surface p-6 mb-6 shadow-sm">
              <div className="text-3xl font-extrabold text-primary mb-3">
                Rp {product.price.toLocaleString('id-ID')}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  Stok: {product.stock} unit
                </span>
                {product.stock > 0 && (
                  <span className="flex items-center gap-1.5 text-success">
                    <CheckCircle className="w-4 h-4" />
                    Tersedia
                  </span>
                )}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <AddToCartButton productId={product.id} size="lg" className="flex-1 rounded-xl shadow-lg shadow-primary/20" />
              <Button variant="outline" size="lg" className="flex-1 rounded-xl">
                Beli Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
