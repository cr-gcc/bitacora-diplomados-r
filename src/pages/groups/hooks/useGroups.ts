import { useState, useCallback, useEffect, useRef } from "react";
import { groupServices } from "@pages/groups/services/groupService";
import axios from "axios";
import type { DiplomaWithGroups, CreateGroupPayload, UpdateGroupStatusPayload } from "@pages/groups/types/group-modules.types";

export function useGroups(slug: string | undefined) {
    const [diploma, setDiploma] = useState<DiplomaWithGroups | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const loadGroups = useCallback(async (silent = false) => {
        if (!slug) return;
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            if (!silent) {
                setLoading(true);
                setError(null);
            }
            const response = await groupServices.getGroupsByDiploma(slug, controller.signal);
            if (!controller.signal.aborted) {
                setDiploma(response.data);
            }
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            if (!silent) {
                setError("No fue posible cargar los grupos.");
            } else {
                console.error("No fue posible actualizar los grupos:", err);
            }
        } finally {
            if (!silent && !controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [slug]);

    const refreshSilent = useCallback(async () => {
        try {
            await loadGroups(true);
        } catch (err) {
            console.error("No fue posible actualizar los grupos:", err);
        }
    }, [loadGroups]);

    const createGroup = async (data: CreateGroupPayload): Promise<void> => {
        setSaving(true);
        try {
            await groupServices.createGroup(data);
        } finally {
            setSaving(false);
        }
        await refreshSilent();
    };

    const updateGroupStatus = async (data: UpdateGroupStatusPayload): Promise<void> => {
        setSaving(true);
        try {
            await groupServices.updateGroupStatus(data);
        } finally {
            setSaving(false);
        }
        await refreshSilent();
    };

    const deleteGroup = async (id: number): Promise<void> => {
        setSaving(true);
        try {
            await groupServices.deleteGroup(id);
        } finally {
            setSaving(false);
        }
        await refreshSilent();
    };

    useEffect(() => {
        void loadGroups();
        return () => {
            controllerRef.current?.abort();
        };
    }, [loadGroups]);

    return {
        groups: diploma?.groups ?? [],
        refetch: refreshSilent,
        diploma,
        loading,
        saving,
        error,
        createGroup,
        updateGroupStatus,
        deleteGroup,
    };
}
