import { z } from "zod";
import { Estrato, TipoProducto, TotalServicios, TotalAdicionales } from "@/interfaces/FijoInterface";

export const FijoScheme = z.object({
    fecha_instalacion: z.string().datetime({ offset: true }).nullable().optional(),
    fecha_legalizacion: z.string().datetime({ offset: true }).nullable().optional(),
    servicios_adicionales: z.string(),
    estrato: z.nativeEnum(Estrato),
    cuenta: z.number().int(),
    OT: z.number().int(),
    tipo_producto: z.nativeEnum(TipoProducto),
    total_servicios: z.nativeEnum(TotalServicios).nullable().optional(),
    total_adicionales: z.nativeEnum(TotalAdicionales).nullable().optional(),
    cliente_cc: z.string(),
    convergente: z.string(),
    ciudad: z.string(),
    vendedor_id: z.number().int(),
});