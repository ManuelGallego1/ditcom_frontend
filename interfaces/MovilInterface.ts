import { DefaultInterfaceResponse, PaginatedData } from "./DefaultInterface";

export interface MovilDAO {
    id: number;
    created_at: string;
    updated_at: string;
    min: string;
    imei: string;
    iccid: string;
    tipo: string;
    plan_id: number;
    celulares_id: number;
    cliente_cc: string;
    factura: string;
    ingreso_caja: string;
    valor_total: number;
    valor_recarga: number;
    tipo_producto: string;
    vendedor_id: number;
    sede_id: number;
    financiera: string;
    coordinador_id: number;
    estado: string;
}

export interface MovilServiceDetail extends DefaultInterfaceResponse<MovilDAO> {}
export interface MovilServiceList extends DefaultInterfaceResponse<PaginatedData<MovilDAO>> {}

export interface MovilDTO {
    min: string;
    imei: string;
    iccid: string;
    tipo: string;
    plan_id: number;
    celulares_id: number;
    cliente_cc: string;
    factura: string;
    ingreso_caja: string;
    valor_total: number;
    valor_recarga: number;
    tipo_producto: string;
    vendedor_id: number;
    sede_id: number;
    financiera: string;
    coordinador_id: number;
    estado: string;
}