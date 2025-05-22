import { z } from "zod";

export const celularScheme = z.object({
  marca: z.string()
    .nonempty({ message: "La marca es obligatoria" })
    .max(50, { message: "La marca no debe superar los 50 caracteres" }),

  modelo: z.string()
    .nonempty({ message: "El modelo es obligatorio" })
    .max(50, { message: "El modelo no debe superar los 50 caracteres" }),
});
