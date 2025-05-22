import { DefaultInterfaceResponse } from "./DefaultInterface";

export interface ClienteDAO{
    cc: string;
    p_nombre: string;
    s_nombre: string;
    p_apellido: string;
    s_apellido: string;
    email: string;
    numero: string;
    created_at: Date;
    updated_at: Date;
}

export interface ClienteServiceDetail extends DefaultInterfaceResponse<ClienteDAO> {}
export interface ClienteServiceList extends DefaultInterfaceResponse<ClienteDAO[]> {}

export interface ClienteDTO {
    cc: string;
    p_nombre: string;
    s_nombre: string;
    p_apellido: string;
    s_apellido: string;
    email: string;
    numero: string;
}