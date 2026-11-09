import { useState } from "react";
import { addProfessorSchema, type AddProfessorForm } from "../schemas/professor.schema";

type FormErrors = Partial<Record<keyof AddProfessorForm, string>>;

export function useAddProfessorForm() {
    const [form, setForm] = useState<AddProfessorForm>({
        name: "",
        last_name: "",
        email: "",
        rfc: "",
        user: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const updateFile = <K extends keyof AddProfessorForm>(
        field: K,
        value: AddProfessorForm[K]
    ) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
        setErrors(prev => ({
            ...prev,
            [field]: undefined
        }));
    }

    const validateForm = () => {
        const result = addProfessorSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: FormErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof AddProfessorForm;
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

    const resetForm = () => {
        setForm({
            name: "",
            last_name: "",
            email: "",
            rfc: "",
            user: "",
        });
        setErrors({});
    }

    return {
        form,
        errors,
        updateFile,
        validateForm,
        resetForm
    };
}