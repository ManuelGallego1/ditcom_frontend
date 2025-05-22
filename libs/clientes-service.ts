import { ClienteServiceDetail, ClienteServiceList, ClienteDTO } from "../interfaces/ClienteInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getClientes = async (): Promise<ClienteServiceList> => {
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
        const response = await fetch(`${API_URL}/api/clientes`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: ClienteServiceList = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const getClienteById = async (id: string): Promise<ClienteServiceDetail> => {
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
        const response = await fetch(`${API_URL}/api/clientes/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: ClienteServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const createCliente = async (cliente: ClienteDTO): Promise<ClienteServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'POST',
        body: JSON.stringify(cliente),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`${API_URL}/api/clientes`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: ClienteServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const updateCliente = async (id: string, cliente: ClienteDTO): Promise<ClienteServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headersOptions = {
        method: 'PUT',
        body: JSON.stringify(cliente),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`${API_URL}/api/clientes/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: ClienteServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const deleteCliente = async (id: string): Promise<void> => {
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
        const response = await fetch(`${API_URL}/api/clientes/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}