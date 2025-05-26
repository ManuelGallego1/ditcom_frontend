import { DefaultInterfaceResponse } from "./DefaultInterface";
import { UserDAO } from "./UserInterface";
import { SedeDAO } from "./SedeInterface";
import { ClienteDAO } from "./ClienteInterface";
import { CelularDAO } from "./CelularInterface";
import { PlanDAO } from "./PlanInterface";

export interface MovilDAO {
    id: number;
    created_at: string;
    updated_at: string;
    min: string;
    imei: string;
    iccid: string;
    tipo: TipoMovil;
    plan_id: number;
    celulares_id: number;
    cliente_cc: string;
    factura: string;
    ingreso_caja: string;
    valor_total: number;
    valor_recarga: number;
    tipo_producto: TipoProducto;
    vendedor_id: number;
    sede_id: number;
    financiera: Financiera;
    coordinador_id: number;
    estado: Estado;
    vendedor: UserDAO
    sede: SedeDAO;
    cliente: ClienteDAO;
    plan: PlanDAO;
    celular: CelularDAO;
}

export interface MovilServiceDetail extends DefaultInterfaceResponse<MovilDAO> {}
export interface MovilServiceList extends DefaultInterfaceResponse<MovilDAO[]> {}

export interface MovilDTO {
    min: string;
    imei: string;
    iccid: string;
    tipo: TipoMovil;
    plan_id: number;
    celulares_id: number;
    cliente_cc: string;
    tipo_producto: TipoProducto;
    factura: string;
    ingreso_caja: string;
    valor_recarga?: number | null;
    valor_total: number;
    vendedor_id: number;
    financiera: Financiera;
    marca?: string;
}

export interface MovilUpdateDTO {
    id: number;
    min?: string | null;
    imei?: string | null;
    iccid?: string | null;
    tipo?: TipoMovil | null;
    plan_id?: number | null;
    celulares_id?: number | null;
    cliente_cc?: string | null;
    tipo_producto?: TipoProducto | null;
    factura?: string | null;
    ingreso_caja?: string | null;
    valor_recarga?: number | null;
    valor_total?: number | null;
    vendedor_id?: number | null;
    estado?: Estado | null;
    financiera?: Financiera | null;
}

export enum Estado {
    PENDIENTE = "pendiente",
    EXITOSA = "exitosa",
    RECHAZADA = "rechazada",
    CANCELADA = "cancelada",
    TERMINADA = "terminada",
}

export enum TipoMovil {
  KIT_PREPAGO = "kit prepago",
  KIT_FINANCIADO = "kit financiado",
  WB = "wb",
  UP_GRADE = "up grade",
  LINEA_NUEVA = "linea nueva",
  REPOSICION = "reposicion",
  PORTABILIDAD_PRE = "portabilidad pre",
  PORTABILIDAD_POS = "portabilidad pos",
  VENTA_DE_TECNOLOGIA = "venta de tecnologia",
  EQUIPO_POS = "equipo pos",
}

export enum TipoProducto {
  RESIDENCIAL = "residencial",
  PYME = "pyme",
}

export enum Financiera {
  CREDIMINUTO = "crediminuto",
  CELYA = "celya",
  BRILLA = "brilla",
  NA = "N/A",
}