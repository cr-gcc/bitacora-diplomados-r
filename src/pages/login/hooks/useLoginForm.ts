import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/auth/hooks/useAuth";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import axios from "axios";

type FieldErrors = Partial<Record<keyof LoginFormValues, string>>;

interface LaravelError {
    message: string;
    errors?: Record<string, string[]>;
}

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

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
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
        } catch (error: unknown) {
            if (axios.isAxiosError<LaravelError>(error)) {
                const status = error.response?.status;
                const data = error.response?.data;
                if (status === 422) {
                    const fieldErrors: FieldErrors = {};
                    if (data?.errors?.email?.[0]) {
                        fieldErrors.email = data.errors.email[0];
                    }
                    if (data?.errors?.password?.[0]) {
                        fieldErrors.password = data.errors.password[0];
                    }
                    setErrors(fieldErrors);
                    if (Object.keys(fieldErrors).length === 0) {
                        setGeneralError(data?.message ?? "Credenciales incorrectas.");
                    }
                } else if (status === 419) {
                    setGeneralError("La sesión expiró. Intenta nuevamente.");
                } else if (status === 401) {
                    setGeneralError("Correo o contraseña incorrectos.");
                } else if (!error.response) {
                    setGeneralError("No se pudo conectar con el servidor.");
                } else {
                    setGeneralError("Ocurrió un error al iniciar sesión.");
                }
            } else {
                setGeneralError("No fue posible iniciar sesión.");
            }
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