import { MovilDTO, MovilServiceDetail, MovilServiceList } from "@/interfaces/MovilInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMoviles = async (url?: string): Promise<MovilServiceList> => {
    const apiUrl = url || `${API_URL}/api/moviles`;
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(apiUrl, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: MovilServiceList = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const getMovilById = async (id: string): Promise<MovilServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`${API_URL}/api/moviles/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: MovilServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const createMovil = async (movil: MovilDTO): Promise<MovilServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movil)
    };

    try {
        const response = await fetch(`${API_URL}/api/moviles`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: MovilServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const updateMovil = async (id: string, movil: MovilDTO): Promise<MovilServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movil)
    };

    try {
        const response = await fetch(`${API_URL}/api/moviles/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: MovilServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const deleteMovil = async (id: string): Promise<void> => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`${API_URL}/api/moviles/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}