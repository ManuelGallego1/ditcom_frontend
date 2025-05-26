import { z } from "zod";

export const sedeScheme = z.object({
  nombre: z.string()
    .nonempty({ message: "El nombre es obligatorio" })
    .max(100, { message: "El nombre no debe superar los 100 caracteres" }),

  coordinador_id: z
    .number({ invalid_type_error: "Debe seleccionar un coordinador válido" })
    .min(1, { message: "Debe seleccionar un coordinador válido" }),
});
