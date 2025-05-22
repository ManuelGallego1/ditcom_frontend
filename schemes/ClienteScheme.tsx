import { z } from "zod";

export const clienteScheme = z.object({
  p_nombre: z.string()
    .nonempty({ message: "El primer nombre es obligatorio" })
    .max(50, { message: "Máximo 50 caracteres" }),

  s_nombre: z.string()
    .max(50, { message: "Máximo 50 caracteres" })
    .optional()
    .or(z.literal("")),

  p_apellido: z.string()
    .nonempty({ message: "El primer apellido es obligatorio" })
    .max(50, { message: "Máximo 50 caracteres" }),

  s_apellido: z.string()
    .max(50, { message: "Máximo 50 caracteres" })
    .optional()
    .or(z.literal("")),

  email: z.string()
    .nonempty({ message: "El correo electrónico es obligatorio" })
    .email({ message: "Debe ser un correo válido" })
    .max(100, { message: "Máximo 100 caracteres" }),

  numero: z.string()
    .nonempty({ message: "El número es obligatorio" })
    .max(20, { message: "Máximo 20 caracteres" }),

  cc: z.string()
    .nonempty({ message: "La cédula es obligatoria" })
    .max(20, { message: "Máximo 20 caracteres" }),
});
