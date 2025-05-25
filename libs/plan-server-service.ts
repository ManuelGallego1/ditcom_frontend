import { cookies } from 'next/headers';
import { PlanServiceDetail } from '@/interfaces/PlanInterface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPlanByIdServer = async (id: string): Promise<PlanServiceDetail> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('Token no encontrado');
    }

    const res = await fetch(`${API_URL}/api/planes/${id}`, {
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