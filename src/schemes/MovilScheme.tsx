import { Financiera, TipoMovil, TipoProducto } from '@/src/interfaces/MovilInterface';
import { z } from "zod";

export const MovilSchema = z.object({
  min: z.string().length(10, { message: "El número MIN debe tener 10 dígitos" }),
  imei: z.string().length(15, { message: "El IMEI debe tener 15 dígitos" }),
  iccid: z.string().length(17, { message: "El ICCID debe tener 17 dígitos" }),
  tipo: z.nativeEnum(TipoMovil),
  plan_id: z.number({ message: "Seleccione un plan" }),
  celulares_id: z.number({ message: "Seleccione un celular" }),
  cliente_cc: z.string({ message: "Ingrese la cédula del cliente" }),
  tipo_producto: z.nativeEnum(TipoProducto, { message: "Seleccione un tipo de producto" }),
  factura: z.string({ message: "Ingrese el número de factura" }),
  ingreso_caja: z.string({ message: "Ingrese el ingreso de caja" }),
  valor_recarga: z.number().nullable().optional(),
  valor_total: z.number({ message: "Ingrese el valor total" }),
  vendedor_id: z.number({ message: "Seleccione un vendedor" }),
  financiera: z.nativeEnum(Financiera, { message: "Seleccione una financiera" }),
  marca: z.string({ message: "Seleccione una marca" }).optional(),
});
