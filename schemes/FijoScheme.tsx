import { z } from "zod";
import { Estrato, TipoProducto, TotalServicios, TotalAdicionales } from "@/interfaces/FijoInterface";

export const FijoScheme = z.object({
    fecha_instalacion: z
        .string({ required_error: "La fecha de instalación es obligatoria" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha debe tener el formato YYYY-MM-DD" })
        .nullable()
        .optional(),
    fecha_legalizacion: z
        .string({ required_error: "La fecha de legalización es obligatoria" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha debe tener el formato YYYY-MM-DD" })
        .nullable()
        .optional(),
    servicios_adicionales: z
        .string({ required_error: "Los servicios adicionales son obligatorios" }),
    estrato: z
        .nativeEnum(Estrato, { errorMap: () => ({ message: "Seleccione un estrato válido" }) }),
    cuenta: z
        .number({ required_error: "La cuenta es obligatoria" })
        .int({ message: "La cuenta debe ser un número entero" }),
    OT: z
        .number({ required_error: "La OT es obligatoria" })
        .int({ message: "La OT debe ser un número entero" }),
    tipo_producto: z
        .nativeEnum(TipoProducto, { errorMap: () => ({ message: "Seleccione un tipo de producto válido" }) }),
    total_servicios: z
        .nativeEnum(TotalServicios, { errorMap: () => ({ message: "Seleccione un total de servicios válido" }) })
        .nullable()
        .optional(),
    total_adicionales: z
        .nativeEnum(TotalAdicionales, { errorMap: () => ({ message: "Seleccione un total de adicionales válido" }) })
        .nullable()
        .optional(),
    cliente_cc: z
        .string({ required_error: "La cédula del cliente es obligatoria" }),
    convergente: z
        .string({ required_error: "El campo convergente es obligatorio" }),
    ciudad: z
        .string({ required_error: "La ciudad es obligatoria" }),
    vendedor_id: z
        .number({ required_error: "El ID del vendedor es obligatorio" })
        .int({ message: "El ID del vendedor debe ser un número entero" }),
});