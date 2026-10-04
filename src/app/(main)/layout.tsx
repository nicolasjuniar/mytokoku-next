import Link from 'next/link'
import AuthNav from './AuthNav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-surface-elevated/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md">
                M
              </div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-info">
                MyTokoKu
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-primary font-medium transition">Beranda</Link>
              <Link href="/katalog" className="text-muted-foreground hover:text-primary font-medium transition">Katalog</Link>
            </div>
            <div>
              <AuthNav />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="mb-2">© 2026 MyTokoKu. All rights reserved.</p>
          <p className="text-sm">MVP E-Commerce Project</p>
        </div>
      </footer>
    </div>
  )
}
