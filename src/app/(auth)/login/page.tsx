'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login?app=user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Username atau password salah.');
            }
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Username atau password salah.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

            <Card className="max-w-md w-full shadow-xl border-border/50 rounded-2xl relative z-10">
                <CardHeader className="text-center pb-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-info rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg mx-auto mb-4">
                      M
                    </div>
                    <CardTitle className="text-2xl font-extrabold">Masuk ke Akun</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Masuk untuk melanjutkan belanja</p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-error/10 text-error p-3 rounded-xl text-sm text-center font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-1.5 ml-0.5">Username</label>
                                <Input type="text" required placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-xl h-11" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-1.5 ml-0.5">Password</label>
                                <Input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl h-11" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full rounded-xl h-12 text-base shadow-lg shadow-primary/20" disabled={loading}>
                            {loading ? 'Memproses...' : 'Masuk'}
                        </Button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-muted-foreground">
                            Belum punya akun?{' '}
                            <Link href="/register" className="font-semibold text-primary hover:underline">
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
