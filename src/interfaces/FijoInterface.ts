import { DefaultInterfaceResponse } from "./DefaultInterface";
import { UserDAO } from "./UserInterface";
import { SedeDAO } from "./SedeInterface";
import { ClienteDAO } from "./ClienteInterface";

export interface FijoDAO {
    id: number;
    created_at: string;
    updated_at: string;
    fecha_instalacion: string;
    fecha_legalizacion: string | null;
    servicios_adicionales: string;
    estrato: Estrato;
    cuenta: number;
    OT: number;
    tipo_producto: TipoProducto;
    total_servicios: TotalServicios;
    total_adicionales: TotalAdicionales;
    cliente_cc: string;
    sede_id: number;
    vendedor_id: number;
    estado: Estado;
    convergente: string;
    ciudad: string;
    vendedor: UserDAO;
    sede: SedeDAO;
    cliente: ClienteDAO;
}

export interface FijoServiceDetail extends DefaultInterfaceResponse<FijoDAO> { }
export interface FijoServiceList extends DefaultInterfaceResponse<FijoDAO[]> { }

export interface FijoDTO {
    fecha_instalacion: string;
    fecha_legalizacion: string | null;
    servicios_adicionales: string;
    estrato: Estrato;
    cuenta: number;
    OT: number;
    tipo_producto: TipoProducto;
    total_servicios: TotalServicios;
    total_adicionales: TotalAdicionales;
    cliente_cc: string;
    vendedor_id: number;
    convergente: string;
    ciudad: string;
}

export interface FijoUpdateDTO {
    id: number;
    fecha_instalacion?: string | null;
    fecha_legalizacion?: string | null;
    servicios_adicionales?: string | null;
    estrato?: Estrato | null;
    cuenta?: number | null;
    OT?: number | null;
    tipo_producto?: TipoProducto | null;
    total_servicios?: TotalServicios | null;
    total_adicionales?: TotalAdicionales | null;
    cliente_cc?: string | null;
    convergente?: string | null;
    ciudad?: string | null;
    vendedor_id?: number | null;
}

export enum Estrato {
    UNO = '1',
    DOS = '2',
    TRES = '3',
    CUATRO = '4',
    CINCO = '5',
    SEIS = '6',
    NR = 'NR',
}

export enum TipoProducto {
    RESIDENCIAL = 'residencial',
    PYME = 'pyme',
}

export enum TotalServicios {
    CERO = '0',
    UNO = '1',
    DOS = '2',
    TRES = '3',
}

export enum TotalAdicionales {
    CERO = '0',
    UNO = '1',
    DOS = '2',
    TRES = '3',
}

export enum Estado {
    DIGITADO = "digitado",
    RECLAMAR = "reclamar",
    INSTALADO = "instalado",
    CANCELADO = "cancelado",
    RAZONADO = "razonado",
}