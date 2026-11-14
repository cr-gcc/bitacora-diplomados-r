import { z } from "zod";

export const checkModuleSchema = z.object({
    id: z.number(),
    dates_reviewed: z.boolean(),
    exam_uploaded: z.boolean(),
    group_with_students: z.boolean(),
    regular_students: z
        .number("Ingresa un número válido")
        .int("Debe ser un número entero")
        .min(0, "No puede ser negativo"),
    repeating_students: z
        .number("Ingresa un número válido")
        .int("Debe ser un número entero")
        .min(0, "No puede ser negativo"),
    observations: z.string().trim().nullable(),
});

export type CheckModuleForm = z.infer<typeof checkModuleSchema>;
