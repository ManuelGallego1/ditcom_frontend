import { DefaultInterfaceResponse } from "./DefaultInterface";

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
    vendedor: {
        id: number;
        name: string;
        username: string;
        role: string;
        activo: number;
        created_at: string;
        updated_at: string;
    }
    sede: {
        id: number;
        nombre: string;
        coordinador_id: number;
        activo: number;
        created_at: string;
        updated_at: string;
        coordinador?: {
            id: number;
            name: string;
            username: string;
            role: string;
            activo: number;
            created_at: string;
            updated_at: string;
        }
    }
    cliente: {
        cc: string;
        p_nombre: string;
        s_nombre: string;
        p_apellido: string;
        s_apellido: string | null;
        email: string;
        numero: string;
        created_at: string;
        updated_at: string;
    }
    plan: {
        id: number;
        codigo: string;
        nombre: string;
        activo: number;
        created_at: string;
        updated_at: string;
    }
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
}

export enum Estado {
    DIGITADO = "digitado",
    RECLAMAR = "reclamar",
    INSTALADO = "instalado",
    CANCELADO = "cancelado",
    RAZONADO = "razonado",
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