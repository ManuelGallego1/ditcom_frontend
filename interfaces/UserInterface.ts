import { DefaultInterfaceResponse } from "./DefaultInterface";

export interface UserDAO {
    id: number;
    name: string;
    username: string;
    role: UserRole;
    activo: number;
    created_at: string;
    updated_at: string;
}

export interface UserServiceDetail extends DefaultInterfaceResponse<UserDAO> {}

export interface UserDTO {
    name: string;
    username: string;
    password: string;
    role: UserRole;
}

export type UserRole = 'admin' | 'administrador' | 'pyme' | 'coordinador' | 'vendedor'| 'ro';