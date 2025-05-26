import { MovilDTO, MovilServiceDetail, MovilServiceList, MovilUpdateDTO } from "@/interfaces/MovilInterface";
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

export const getMoviles = async (url?: string): Promise<MovilServiceList> => {
    const apiUrl = url || `${API_URL}/api/moviles`;
    const token = Cookies.get('token');
    if (!token) {
        throw { status: 401, message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
        const data: MovilServiceList = await response.json();
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

export const getMovilById = async (id: string): Promise<MovilServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { status: 401, message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: MovilServiceDetail = await response.json();
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

export const createMovil = async (movil: MovilDTO): Promise<MovilServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { status: 401, message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: MovilServiceDetail = await response.json();
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

export const updateMovil = async (id: string, movil: MovilUpdateDTO): Promise<MovilServiceDetail> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { status: 401, message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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
            await handleErrorResponse(response);
        }
        const data: MovilServiceDetail = await response.json();
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

export const deleteMovil = async (id: string): Promise<void> => {
    const token = Cookies.get('token');
    if (!token) {
        throw { status: 401, message: 'No se encontró el token de autenticación.' } as ErrorResponse;
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