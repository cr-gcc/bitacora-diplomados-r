import { useState } from "react";
import type { Review } from "../types/group-modules.types";
import { checkModuleSchema, type CheckModuleForm } from "../schemas/module.schema";

type FormErrors = Partial<Record<keyof CheckModuleForm, string>>;

export function useCheckModuleForm(review: Review) {
    const [form, setForm] = useState<CheckModuleForm>({
        id: review.id,
        dates_reviewed: review.dates_reviewed,
        exam_uploaded: review.exam_uploaded,
        group_with_students: review.group_with_students,
        regular_students: review.regular_students,
        repeating_students: review.repeating_students,
        observations: review.observations ?? "",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const updateField = <K extends keyof CheckModuleForm>(
        field: K,
        value: CheckModuleForm[K]
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

    const validateForm = (): CheckModuleForm | null => {
        const result = checkModuleSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: FormErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof CheckModuleForm;
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
        validateForm,
    };
}
