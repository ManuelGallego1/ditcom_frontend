import { DefaultInterfaceResponse } from "./DefaultInterface";
import { UserDAO } from "./UserInterface";

export interface SedeDAO {
    id: number;
    nombre: string;
    coordinador_id: number;
    activo: number;
    created_at: string;
    updated_at: string;
    coordinador: UserDAO;
}

export interface SedeServiceDetail extends DefaultInterfaceResponse<SedeDAO> {}
export interface SedeServiceList extends DefaultInterfaceResponse<SedeDAO[]> {}

export interface SedeDTO {
    nombre: string;
    coordinador_id: number;
    activo: number;
}