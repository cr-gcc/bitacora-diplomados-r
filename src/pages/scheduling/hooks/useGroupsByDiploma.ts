import { useEffect, useState } from "react";
import { groupServices } from "../../groups/services/groupService";
import type { Group } from "@/pages/groups/types/group-modules.types";
import axios from "axios";

export function useGroupsByDiploma(diplomaId: number | null, enabled = true) {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !diplomaId) {
            setGroups([]);
            return;
        }
        const controller = new AbortController();
        const loadGroups = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await groupServices.getGroupsBasicByDiplomaId(diplomaId, controller.signal);
                if (response.length === 0) {
                    setError("No se encontraron grupos para este diplomado. Por favor agregue un grupo para continuar.");
                    return;
                }
                setGroups(response);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError("No fue posible cargar los grupos de este diplomado.");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };
        void loadGroups();
        return () => controller.abort();
    }, [diplomaId, enabled]);

    return { groups, loading, error };
}