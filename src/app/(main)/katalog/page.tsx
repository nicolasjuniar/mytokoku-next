import { fetchProducts } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShoppingCart } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export default async function KatalogPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams?.page) || 1;
  let data;
  try {
    data = await fetchProducts(page, 20);
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="max-w-md mx-auto p-8 text-center border-error/30 bg-error/5">
          <h3 className="text-lg font-bold text-error">Gagal memuat produk</h3>
          <p className="text-sm mt-2 text-muted-foreground">Pastikan backend MyTokoKu sudah berjalan.</p>
        </Card>
      </div>
    );
  }

  const { data: products, total_pages, page: currentPage } = data;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-surface to-muted border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Katalog Produk</h1>
          <p className="text-muted-foreground mt-2 text-lg">Pilihan terbaik untuk Anda hari ini</p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products?.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-dashed">
            <p className="text-muted-foreground text-lg">Belum ada produk yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product: any) => (
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
                      <div className="text-sm text-muted-foreground">
                        Sisa {product.stock} unit
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total_pages > 1 && (
          <div className="flex justify-center items-center mt-14 gap-3">
            {currentPage > 1 ? (
              <Link href={`/katalog?page=${currentPage - 1}`}>
                <Button variant="outline" className="rounded-xl">Sebelumnya</Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="rounded-xl">Sebelumnya</Button>
            )}
            <div className="px-5 py-2.5 bg-surface rounded-xl border font-medium text-sm">
              Halaman <span className="text-primary font-bold">{currentPage}</span> dari {total_pages}
            </div>
            {currentPage < total_pages ? (
              <Link href={`/katalog?page=${currentPage + 1}`}>
                <Button variant="outline" className="rounded-xl">Selanjutnya</Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="rounded-xl">Selanjutnya</Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
