import { FijoDTO, FijoServiceDetail, FijoServiceList } from "@/interfaces/FijoInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFijos = async (url: string): Promise<FijoServiceList> => {
    const apiUrl = url || `${API_URL}/api/fijos`;
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
        const data: FijoServiceList = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const getFijoById = async (id: string): Promise<FijoServiceDetail> => {
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
        const response = await fetch(`${API_URL}/api/fijos/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: FijoServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const createFijo = async (fijo: FijoDTO): Promise<FijoServiceDetail> => {
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
        body: JSON.stringify(fijo)
    };

    try {
        const response = await fetch(`${API_URL}/api/fijos`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: FijoServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const updateFijo = async (id: string, fijo: FijoDTO): Promise<FijoServiceDetail> => {
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
        body: JSON.stringify(fijo)
    };

    try {
        const response = await fetch(`${API_URL}/api/fijos/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: FijoServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const deleteFijo = async (id: string): Promise<void> => {
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
        const response = await fetch(`${API_URL}/api/fijos/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}