import { DefaultInterfaceResponse, PaginatedData } from "./DefaultInterface";

export interface FijoDAO {
    id: number;
    created_at: string;
    updated_at: string;
    fecha_instalacion: string;
    fecha_legalizacion: string | null;
    servicios_adicionales: string;
    estrato: string;
    cuenta: number;
    OT: number;
    tipo_producto: string;
    total_servicios: string;
    total_adicionales: string;
    cliente_cc: string;
    sede_id: number;
    vendedor_id: number;
    estado: string;
    convergente: string;
    ciudad: string;
}

export interface FijoServiceDetail extends DefaultInterfaceResponse<FijoDAO> {}
export interface FijoServiceList extends DefaultInterfaceResponse<PaginatedData<FijoDAO>> {}

export interface FijoDTO {
    fecha_instalacion: string;
    fecha_legalizacion: string | null;
    servicios_adicionales: string;
    estrato: string;
    cuenta: number;
    OT: number;
    tipo_producto: string;
    total_servicios: string;
    total_adicionales: string;
    cliente_cc: string;
    sede_id: number;
    vendedor_id: number;
    estado: string;
    convergente: string;
    ciudad: string;
}