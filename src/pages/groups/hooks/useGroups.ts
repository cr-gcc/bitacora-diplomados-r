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

    const loadGroups = useCallback(async () => {
        if (!slug) return;
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            setLoading(true);
            setError(null);
            const response = await groupServices.getGroupsByDiploma(slug, controller.signal);
            if (!controller.signal.aborted) {
                setDiploma(response.data);
            }
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            setError("No fue posible cargar los grupos.");
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [slug]);

    const createGroup = async (data: CreateGroupPayload): Promise<void> => {
        setSaving(true);
        try {
            await groupServices.createGroup(data);
            await loadGroups();
        } finally {
            setSaving(false);
        }
    };

    const updateGroupStatus = async (data: UpdateGroupStatusPayload) => {
        setSaving(true);
        try {
            await groupServices.updateGroupStatus(data);
            await loadGroups();
        } finally {
            setSaving(false);
        }
    };

    const deleteGroup = async (id: number) => {
        setSaving(true);
        try {
            await groupServices.deleteGroup(id);
            await loadGroups();
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        void loadGroups();
        return () => {
            controllerRef.current?.abort();
        };
    }, [loadGroups]);

    return {
        groups: diploma?.groups ?? [],
        refetch: loadGroups,
        diploma,
        loading,
        saving,
        error,
        createGroup,
        updateGroupStatus,
        deleteGroup,
    };
}
