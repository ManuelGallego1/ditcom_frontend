import { z } from 'zod';

export const sedeAsesorScheme = z.object({
  vendedor_id: z
    .number({
      required_error: 'El asesor es obligatorio',
      invalid_type_error: 'El asesor debe ser un número válido',
    })
    .min(1, 'Debe seleccionar un asesor'),
    
  sede_id: z
    .number({
      required_error: 'La sede es obligatoria',
      invalid_type_error: 'La sede debe ser un número válido',
    })
    .min(1, 'Debe seleccionar una sede'),
});

export type SedeAsesorDTO = z.infer<typeof sedeAsesorScheme>;
