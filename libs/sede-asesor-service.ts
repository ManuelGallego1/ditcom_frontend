import { SedeAsesorDTO, SedeAsesorServiceDetail, SedeAsesorServiceList } from "@/interfaces/SedeAsesorInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSedeAsesores = async (url: string): Promise<SedeAsesorServiceList> => {
    const apiUrl = url || `${API_URL}/api/sedes-vendedores`;
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
        const data: SedeAsesorServiceList = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const getSedeAsesorById = async (id: string): Promise<SedeAsesorServiceDetail> => {
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
        const response = await fetch(`${API_URL}/api/sedes-vendedores/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: SedeAsesorServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const createSedeAsesor = async (sedeAsesor: SedeAsesorDTO): Promise<SedeAsesorServiceDetail> => {
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
        body: JSON.stringify(sedeAsesor)
    };

    try {
        const response = await fetch(`${API_URL}/api/sedes-vendedores`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: SedeAsesorServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const updateSedeAsesor = async (id: string, sedeAsesor: SedeAsesorDTO): Promise<SedeAsesorServiceDetail> => {
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
        body: JSON.stringify(sedeAsesor)
    };

    try {
        const response = await fetch(`${API_URL}/api/sedes-vendedores/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: SedeAsesorServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const deleteSedeAsesor = async (id: string): Promise<void> => {
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
        const response = await fetch(`${API_URL}/api/sedes-vendedores/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}