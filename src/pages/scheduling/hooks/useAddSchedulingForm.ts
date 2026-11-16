import { useState } from "react";
import { addSchedulingSchema, type AddSchedulingForm } from "../schemas/scheduling.schema";

type FormErrors = Partial<Record<keyof AddSchedulingForm, string>>;

export function useAddSchedulingForm() {
    const [form, setForm] = useState<AddSchedulingForm>({
        diploma_id: null,
        module_id: null,
        professor_id: null,
        start_date: "",
        end_date: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const updateField = <K extends keyof AddSchedulingForm>(
        field: K,
        value: AddSchedulingForm[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validateForm = (): AddSchedulingForm | null => {
        const result = addSchedulingSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: FormErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof AddSchedulingForm;
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
            diploma_id: null,
            module_id: null,
            professor_id: null,
            start_date: "",
            end_date: "",
        });
        setErrors({});
    };

    return {
        form,
        errors,
        updateField,
        validateForm,
        resetForm,
    };
}
