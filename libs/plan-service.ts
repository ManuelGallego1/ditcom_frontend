import { PlanDTO, PlanServiceDetail, PlanServiceList } from "@/interfaces/PlanInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPlans = async (): Promise<PlanServiceList> => {
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
        const response = await fetch(`${API_URL}/api/plans`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: PlanServiceList = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const getPlanById = async (id: string): Promise<PlanServiceDetail> => {
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
        const response = await fetch(`${API_URL}/api/plans/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: PlanServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const createPlan = async (plan: PlanDTO): Promise<PlanServiceDetail> => {
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
        body: JSON.stringify(plan)
    };

    try {
        const response = await fetch(`${API_URL}/api/plans`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: PlanServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const updatePlan = async (id: string, plan: PlanDTO): Promise<PlanServiceDetail> => {
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
        body: JSON.stringify(plan)
    };

    try {
        const response = await fetch(`${API_URL}/api/plans/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: PlanServiceDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const deletePlan = async (id: string): Promise<void> => {
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
        const response = await fetch(`${API_URL}/api/plans/${id}`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}