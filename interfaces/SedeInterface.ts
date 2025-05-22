import { DefaultInterfaceResponse } from "./DefaultInterface";

export interface SedeDAO {
    id: number;
    nombre: string;
    coordinador_id: number;
    activo: number;
    created_at: string;
    updated_at: string;
}

export interface SedeServiceDetail extends DefaultInterfaceResponse<SedeDAO> {}

export interface SedeDTO {
    nombre: string;
    coordinador_id: number;
    activo: number;
}