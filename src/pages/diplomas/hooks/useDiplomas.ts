import { useEffect, useState } from "react";
import { diplomaService } from "../services/diplomaService";
import type { Diploma } from "../types/diploma.types";
import axios from "axios";

export function useDiplomas() {
    const [diplomas, setDiplomas] = useState<Diploma[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const loadDiplomas = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await diplomaService.getAll(
                    controller.signal
                );
                setDiplomas(data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                setError("No fue posible cargar los diplomados.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        loadDiplomas();
        return () => controller.abort();
    }, []);

    return { diplomas, loading, error };
}