import { DefaultInterfaceResponse } from "./DefaultInterface";

export interface PlanDAO {
    id: number;
    codigo: string;
    nombre: string;
    activo: number;
    created_at: string;
    updated_at: string;
}

export interface PlanServiceDetail extends DefaultInterfaceResponse<PlanDAO> {}

export interface PlanDTO {
    codigo: string;
    nombre: string;
    activo: number;
}