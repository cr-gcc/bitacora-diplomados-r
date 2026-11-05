import { useEffect, useState } from "react";
import { professorService } from "../services/professorService";
import type { Professor } from "../types/professor.types";
import axios from "axios";

export function useProfessors() {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        async function loadProfessors() {
            try {
                setLoading(true);
                setError(null);
                const data = await professorService.getAll(controller.signal);
                setProfessors(data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                setError("No fue posible cargar los profesores.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        loadProfessors();
        return () => controller.abort();
    }, []);

    return { professors, loading, error };
}