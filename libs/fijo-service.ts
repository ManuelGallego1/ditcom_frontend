import { FijoDTO, FijoServiceDetail, FijoServiceList, FijoUpdateDTO } from "@/interfaces/FijoInterface";
import { ErrorResponse } from "@/interfaces/DefaultInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleErrorResponse = async (response: Response) => {
    let errorData: ErrorResponse;
    try {
        errorData = await response.json();
    } catch {
        errorData = { status: response.status, message: response.statusText || 'Unknown error' };
    }
    console.error('Fetch error:', errorData.message);
    throw errorData;
};

export const getFijos = async (url: string): Promise<FijoServiceList> => {
    const apiUrl = url || `${API_URL}/api/fijos`;
    const token = Cookies.get('token');
    if (!token) {
        throw { message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: FijoServiceList = await response.json();
        return data;
    } catch (error) {
        if (error && (error as ErrorResponse).message) {
            console.error('Fetch error:', (error as ErrorResponse).message);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}

export const getFijoById = async (id: string): Promise<FijoServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: FijoServiceDetail = await response.json();
        return data;
    } catch (error) {
        if (error && (error as ErrorResponse).message) {
            console.error('Fetch error:', (error as ErrorResponse).message);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}

export const createFijo = async (fijo: FijoDTO): Promise<FijoServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: FijoServiceDetail = await response.json();
        return data;
    } catch (error) {
        if (error && (error as ErrorResponse).message) {
            console.error('Fetch error:', (error as ErrorResponse).message);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}

export const updateFijo = async (id: string, fijo: FijoUpdateDTO): Promise<FijoServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: FijoServiceDetail = await response.json();
        return data;
    } catch (error) {
        if (error && (error as ErrorResponse).message) {
            console.error('Fetch error:', (error as ErrorResponse).message);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}

export const deleteFijo = async (id: string): Promise<void> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
    } catch (error) {
        if (error && (error as ErrorResponse).message) {
            console.error('Fetch error:', (error as ErrorResponse).message);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}