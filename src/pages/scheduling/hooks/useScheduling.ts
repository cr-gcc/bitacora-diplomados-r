import { useCallback, useEffect, useRef, useState } from "react";
import { schedulingService } from "../services/schedulingService";
import axios from "axios";
import type { Scheduling, CreateSchedulingPayload, LinkSchedulingPayload } from "../types/scheduling.types";

export function useScheduling() {
    const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshError, setRefreshError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const loadSchedulings = useCallback(async (silent = false) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            if (!silent) {
                setLoading(true);
                setError(null);
            } else {
                setRefreshing(true);
            }
            setRefreshError(null);
            const data = await schedulingService.getAll(controller.signal);
            if (!controller.signal.aborted) {
                setSchedulings(data);
            }
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            if (!silent) {
                setError("No fue posible cargar los registros");
            } else {
                setRefreshError("Los cambios se guardaron, pero no fue posible actualizar la programación.");
            }
        } finally {
            if (!controller.signal.aborted) {
                if (!silent) {
                    setLoading(false);
                } else {
                    setRefreshing(false);
                }
            }
        }
    }, []);

    const refreshSilent = useCallback(async () => {
        await loadSchedulings(true);
    }, [loadSchedulings]);

    const createScheduling = async (
        data: CreateSchedulingPayload,
        signal?: AbortSignal
    ): Promise<Scheduling> => {
        setSaving(true);
        let scheduling: Scheduling;
        try {
            scheduling = await schedulingService.create(data, signal);
        } finally {
            setSaving(false);
        }
        void refreshSilent();
        return scheduling;
    };

    const deleteScheduling = async (
        id: number,
        signal?: AbortSignal
    ): Promise<void> => {
        setSaving(true);
        try {
            await schedulingService.delete(id, signal);
        } finally {
            setSaving(false);
        }
        void refreshSilent();
    };

    const linkScheduling = async (
        data: LinkSchedulingPayload,
        signal?: AbortSignal
    ): Promise<void> => {
        setSaving(true);
        try {
            await schedulingService.linkScheduling(data, signal);
        } finally {
            setSaving(false);
        }
        void refreshSilent();
    };

    useEffect(() => {
        void loadSchedulings();
        return () => {
            controllerRef.current?.abort();
        };
    }, [loadSchedulings]);

    return {
        schedulings,
        loading,
        refreshing,
        saving,
        error,
        refreshError,
        refetch: refreshSilent,
        createScheduling,
        linkScheduling,
        deleteScheduling,
    };
}
