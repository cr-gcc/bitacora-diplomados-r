import { z } from "zod";

export const editProfessorSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
    lastName: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
    email: z.union([
        z.email("Introduce un correo válido"),
        z.literal(""),
    ]),
    rfc: z.string().trim().max(13, "El RFC no puede superar 13 caracteres"),
    user: z.string().trim().min(1, "El usuario es obligatorio").max(20),
    active: z.boolean(),
});

export type EditProfessorForm = z.infer<typeof editProfessorSchema>;