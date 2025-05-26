import { UserDAO } from "./UserInterface";

export interface MejorVendedor {
    mejor_vendedor: UserDAO;
    ventas_fijo: number;
    ventas_movil: number;
    ventas_totales: number;
}

export interface Total {
    fijos: number;
    moviles: number;
    clientes: number;
    celulares: number;
}

export interface VentasProductos {
    total: number;
    pyme: number;
    residencial: number;
}
export interface VentasPorMes {
    fijos: number[];
    moviles: number[];
}
