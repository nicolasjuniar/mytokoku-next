import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyTokoKu | Belanja Online Murah, Cepat & Terpercaya',
  description: 'Pusat belanja kebutuhan harian, fashion, elektronik, dan masih banyak lagi dengan harga paling terjangkau. Nikmati pengalaman belanja yang luar biasa hanya di MyTokoKu!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
