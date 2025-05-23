import { cookies } from 'next/headers';
import { CelularServiceDetail } from '@/interfaces/CelularInterface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCelularByIdServer = async (id: string): Promise<CelularServiceDetail> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('Token no encontrado');
    }

    const res = await fetch(`${API_URL}/api/celulares/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
};