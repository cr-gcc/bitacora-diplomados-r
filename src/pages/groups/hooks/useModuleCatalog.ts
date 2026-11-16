import { useEffect, useState } from "react";
import { moduleService } from "@pages/groups/services/moduleService";
import type { Module } from "@pages/groups/types/group-modules.types";
import axios from "axios";

export function useModuleCatalog() {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const loadModules = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await moduleService.getModules(controller.signal);
                setModules(data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError("No fue posible cargar los módulos.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        void loadModules();
        return () => controller.abort();
    }, []);

    return { modules, loading, error };
}
