import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "@/auth/hooks/useAuth";
import {
    loginSchema,
    type LoginFormValues,
} from "../schemas/login.schema";

type FieldErrors = Partial<
    Record<keyof LoginFormValues, string>
>;

export function useLoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [values, setValues] = useState<LoginFormValues>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FieldErrors>({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    const setField = (
        field: keyof LoginFormValues,
        value: string
    ) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    const handleLogin = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        if (loading) return;
        setGeneralError("");
        setErrors({});

        const result = loginSchema.safeParse(values);
        if (!result.success) {
            const fieldErrors: FieldErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0];
                if (field === "email" || field === "password") {
                    fieldErrors[field] ??= issue.message;
                }
            }
            setErrors(fieldErrors);
            return;
        }
        setLoading(true);
        try {
            await login(result.data);
            const from = location.state?.from;
            const pathname = from?.pathname;
            const destination =
                typeof pathname === "string" &&
                    pathname.startsWith("/") &&
                    !pathname.startsWith("//") &&
                    pathname !== "/login"
                    ? `${pathname}${from.search ?? ""}${from.hash ?? ""}`
                    : "/";
            navigate(destination, { replace: true });
        } catch (error) {
            setGeneralError(
                error instanceof Error
                    ? error.message
                    : "No fue posible iniciar sesión"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        values,
        errors,
        generalError,
        loading,
        setField,
        handleLogin,
    };
}
