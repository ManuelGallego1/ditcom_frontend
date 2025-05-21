import { DefaultInterfaceResponse } from "./DefaultInterface";

export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    role: string;
    activo: number;
    created_at: string;
    updated_at: string;
}

export interface UserDAO {
    id: number;
    name: string;
    username: string;
    role: string;
    activo: number;
    created_at: string;
    updated_at: string;
}

export interface UserDTO {
    name: string;
    username: string;
    password: string;
    role: string;
}

export interface UserResponse extends DefaultInterfaceResponse<UserDAO[]> {
    data: UserDAO[] | null;
}