// schemes/SedeScheme.ts
import { z } from 'zod';

export const sedeSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido'),
  coordinador_id: z.number().min(1, 'ID válido requerido'),
});
