import { LoginDTO } from "@/interfaces/LoginInterface";
import { UserDTO } from "@/interfaces/UserInterface";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (body: LoginDTO) => {
    const headersOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Authorization": "Bearer tokentosendinservice",
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(`${API_URL}/api/login`, headersOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const registerUser = async (user: UserDTO) => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No se encontró el token de autenticación.');
        }

        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend responded with:', errorText);
            throw new Error('Error al crear el usuario.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const logoutUser = async (): Promise<boolean> => {
    const token = Cookies.get('token');
    if (!token) {
        console.error('No token found');
        return false;
    }

    try {
        const response = await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Logout:', data);

        Cookies.remove('user');
        Cookies.remove('token');

        return true;
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}
