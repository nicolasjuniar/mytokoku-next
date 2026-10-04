'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { API_URL } from '@/lib/api'

export default function LogoutButton() {
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout?app=user`, { method: 'POST', credentials: 'include' })
      router.push('/login')
      router.refresh()
    } catch (e) {
      console.error('Logout failed')
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Keluar
    </Button>
  )
}
