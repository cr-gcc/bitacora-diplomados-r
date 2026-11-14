import { z } from "zod";

const professorFields = {
    name: z.string().trim()
        .min(1, "El nombre es obligatorio")
        .max(100),

    last_name: z.string().trim()
        .min(1, "Los apellidos son obligatorios")
        .max(100),

    email: z.string().trim()
        .min(1, "El correo es obligatorio")
        .email("Introduce un correo válido"),

    rfc: z.string().trim()
        .min(10, "El RFC debe tener al menos 10 caracteres")
        .max(13, "El RFC no puede superar 13 caracteres"),

    user: z.string().trim()
        .min(5, "El usuario debe tener al menos 5 caracteres")
        .max(20),
};

export const addProfessorSchema = z.object({
    ...professorFields,
});

export type AddProfessorForm = z.infer<
    typeof addProfessorSchema
>;

export const editProfessorSchema = z.object({
    ...professorFields,
    active: z.boolean(),
});

export type EditProfessorForm = z.infer<
    typeof editProfessorSchema
>;