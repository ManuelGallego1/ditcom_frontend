import { DefaultInterfaceResponse } from "./DefaultInterface";
import { UserDAO } from "./UserInterface";
import { SedeDAO } from "./SedeInterface";

export interface SedeAsesorDAO {
    id: number;
    vendedor_id: number;
    sede_id: number;
    created_at: string;
    updated_at: string;
    sede: SedeDAO;
    vendedor: UserDAO;
}

export interface SedeAsesorServiceDetail extends DefaultInterfaceResponse<SedeAsesorDAO> {}
export interface SedeAsesorServiceList extends DefaultInterfaceResponse<SedeAsesorDAO[]> {}

export interface SedeAsesorDTO {
    vendedor_id: number;
    sede_id: number;
}