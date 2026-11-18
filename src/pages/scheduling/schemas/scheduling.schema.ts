import { z } from "zod";

const schedulingFields = {
    module_id: z.number("Módulo es requerido").min(1, "Módulo es requerido"),
    professor_id: z.number("Profesor es requerido").min(1, "Profesor es requerido"),
    start_date: z.string().min(1, "Fecha de inicio es requerida"),
    end_date: z.string().min(1, "Fecha de fin es requerida"),
};

export const addSchedulingSchema = z
    .object({
        ...schedulingFields,
    })
    .refine(
        (data) => {
            if (!data.start_date || !data.end_date) return true;
            return data.end_date > data.start_date;
        },
        {
            message: "La fecha de fin debe ser posterior a la fecha de inicio",
            path: ["end_date"],
        }
    );

export type AddSchedulingForm = z.infer<typeof addSchedulingSchema>;