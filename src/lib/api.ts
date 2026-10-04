export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function fetchProducts(page: number = 1, limit: number = 20) {
  const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
