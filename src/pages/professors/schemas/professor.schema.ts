import { z } from "zod";

export const addProfessorSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
    lastName: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
    email: z.string().trim().min(1, "El correo es obligatorio").pipe(z.email("Introduce un correo válido")),
    rfc: z.string().trim().min(10, "El RFC es obligatorio").max(13, "El RFC no puede superar 13 caracteres"),
    user: z.string().trim().min(5, "El usuario es obligatorio").max(20),
});
export type AddProfessorForm = z.infer<typeof addProfessorSchema>;

export const editProfessorSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
    lastName: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
    email: z.string().trim().min(1, "El correo es obligatorio").pipe(z.email("Introduce un correo válido")),
    rfc: z.string().trim().max(13, "El RFC no puede superar 13 caracteres"),
    user: z.string().trim().min(5, "El usuario es obligatorio").max(20),
    active: z.boolean(),
});
export type EditProfessorForm = z.infer<typeof editProfessorSchema>;