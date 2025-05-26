import { z } from "zod";

export const planScheme = z.object({
  codigo: z.string()
    .nonempty({ message: "El código es obligatorio" })
    .max(50, { message: "Máximo 50 caracteres" }),

  nombre: z.string()
    .nonempty({ message: "El nombre es obligatorio" })
    .max(100, { message: "Máximo 100 caracteres" }),
});
