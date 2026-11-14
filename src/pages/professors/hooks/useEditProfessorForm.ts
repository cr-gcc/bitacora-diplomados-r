import { useState } from "react";
import type { Professor } from "../types/professor.types";
import { editProfessorSchema, type EditProfessorForm } from "../schemas/professor.schema";

type FormErrors = Partial<Record<keyof EditProfessorForm, string>>;

export function useEditProfessorForm(professor: Professor) {
    const [form, setForm] = useState<EditProfessorForm>({
        name: professor.name,
        last_name: professor.last_name,
        email: professor.email ?? "",
        rfc: professor.rfc ?? "",
        user: professor.user,
        active: professor.active,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const updateField = <K extends keyof EditProfessorForm>(
        field: K,
        value: EditProfessorForm[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    const validateForm = (): EditProfessorForm | null => {
        const result = editProfessorSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: FormErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof EditProfessorForm;
                if (!fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            }
            setErrors(fieldErrors);
            return null;
        }
        setErrors({});
        return result.data;
    };

    return {
        form,
        errors,
        updateField,
        validateForm
    };
}