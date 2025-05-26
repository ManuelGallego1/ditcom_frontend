import { MejorVendedor, Total, VentasProductos, VentasPorMes } from '../interfaces/EstadisticaInterface';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStatistics(): Promise<Total> {
    const token = Cookies.get('token');
    const response = await fetch(`${API_URL}/api/estadisticas/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Failed to fetch statistics');
    return response.json();
}

export async function getFijosStatistics(
    params?: { vendedor_id?: number; coordinador_id?: number; ventas_pyme?: boolean }
): Promise<VentasProductos> {
    const token = Cookies.get('token');
    const query = new URLSearchParams();
    if (params?.vendedor_id !== undefined) query.append('vendedor_id', params.vendedor_id.toString());
    if (params?.coordinador_id !== undefined) query.append('coordinador_id', params.coordinador_id.toString());
    if (params?.ventas_pyme !== undefined) query.append('ventas_pyme', params.ventas_pyme ? '1' : '0');

    const response = await fetch(
        `${API_URL}/api/estadisticas/fijos${query.toString() ? `?${query.toString()}` : ''}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) throw new Error('Failed to fetch ventas fijas');
    return response.json();
}

export async function getMovilesStatistics(
    params?: { vendedor_id?: number; coordinador_id?: number; ventas_pyme?: boolean }
): Promise<VentasProductos> {
    const token = Cookies.get('token');
    const query = new URLSearchParams();
    if (params?.vendedor_id !== undefined) query.append('vendedor_id', params.vendedor_id.toString());
    if (params?.coordinador_id !== undefined) query.append('coordinador_id', params.coordinador_id.toString());
    if (params?.ventas_pyme !== undefined) query.append('ventas_pyme', params.ventas_pyme ? '1' : '0');

    const response = await fetch(
        `${API_URL}/api/estadisticas/moviles${query.toString() ? `?${query.toString()}` : ''}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) throw new Error('Failed to fetch ventas moviles');
    return response.json();
}

export async function getVentasPorMesAnioActual(
    params?: { vendedor_id?: number; coordinador_id?: number; ventas_pyme?: boolean }
): Promise<VentasPorMes[]> {
    const token = Cookies.get('token');
    const query = new URLSearchParams();
    if (params?.vendedor_id !== undefined) query.append('vendedor_id', params.vendedor_id.toString());
    if (params?.coordinador_id !== undefined) query.append('coordinador_id', params.coordinador_id.toString());
    if (params?.ventas_pyme !== undefined) query.append('ventas_pyme', params.ventas_pyme ? '1' : '0');

    const response = await fetch(
        `${API_URL}/api/estadisticas/ventas-mes-actual${query.toString() ? `?${query.toString()}` : ''}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) throw new Error('Failed to fetch ventas por mes del año actual');
    return response.json();
}

export async function getMejorVendedor(): Promise<MejorVendedor> {
    const token = Cookies.get('token');
    const response = await fetch(`${API_URL}/api/estadisticas/mejor-vendedor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Failed to fetch mejor vendedor');
    return response.json();
}