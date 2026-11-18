import { useEffect, useState } from "react";
import { reportService } from "../services/reportService";
import type { Group } from "@pages/groups/types/group-modules.types";
import axios from "axios";

export function useGroupsList() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const loadGroups = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await reportService.getOnlyGroups(controller.signal);
                setGroups(Array.isArray(response) ? response : response.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError("No fue posible cargar los grupos.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        void loadGroups();
        return () => controller.abort();
    }, []);

    return { groups, loading, error };
}
