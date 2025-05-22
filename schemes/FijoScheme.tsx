import { z } from 'zod';

export const fijoSchema = z.object({
    fecha_instalacion: z
        .string()
        .nullable()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'Debe ser una fecha válida o nula',
        }),
    fecha_legalizacion: z
        .string()
        .nullable()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'Debe ser una fecha válida o nula',
        }),
    servicios_adicionales: z.string().nonempty('Los servicios adicionales son obligatorios'),
    estrato: z.enum(['1', '2', '3', '4', '5', '6', 'NR'], {
        errorMap: () => ({ message: 'El estrato debe ser 1, 2, 3, 4, 5, 6 o NR' }),
    }),
    cuenta: z.number().int('La cuenta debe ser un número entero').min(1, 'La cuenta es obligatoria'),
    OT: z.number().int('La OT debe ser un número entero').min(1, 'La OT es obligatoria'),
    tipo_producto: z.enum(['residencial', 'pyme'], {
        errorMap: () => ({ message: 'El tipo de producto debe ser residencial o pyme' }),
    }),
    total_servicios: z
        .enum(['0', '1', '2', '3'])
        .nullable()
        .optional()
        .refine((val) => val === null || val === undefined || ['0', '1', '2', '3'].includes(val), {
            message: 'El total de servicios debe ser 0, 1, 2 o 3',
        }),
    total_adicionales: z
        .enum(['0', '1', '2', '3'])
        .nullable()
        .optional()
        .refine((val) => val === null || val === undefined || ['0', '1', '2', '3'].includes(val), {
            message: 'El total de adicionales debe ser 0, 1, 2 o 3',
        }),
    cliente_cc: z.string().nonempty('El cliente CC es obligatorio'),
    convergente: z.string().nonempty('El campo convergente es obligatorio'),
    ciudad: z.string().nonempty('La ciudad es obligatoria'),
    vendedor_id: z
        .number()
        .int('El ID del vendedor debe ser un número entero')
        .min(1, 'El vendedor es obligatorio'),
    estado: z.enum(['digitado', 'reclamar', 'instalado', 'cancelado', 'razonado'], {
        errorMap: () => ({
            message: 'El estado debe ser digitado, reclamar, instalado, cancelado o razonado',
        }),
    }),
});