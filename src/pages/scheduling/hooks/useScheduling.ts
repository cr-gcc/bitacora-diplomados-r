import { useCallback, useEffect, useRef, useState } from "react";
import { schedulingService } from "../services/schedulingService";
import axios from "axios";
import type { Scheduling, CreateSchedulingPayload, LinkSchedulingPayload } from "../types/scheduling.types";

export function useScheduling() {
    const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const loadSchedulings = useCallback(async (silent = false) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            if (!silent) {
                setLoading(true);
                setError(null);
            }
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
                console.error("No fue posible actualizar los registros:", err);
            }
        } finally {
            if (!silent && !controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, []);

    const refreshSilent = useCallback(async () => {
        try {
            await loadSchedulings(true);
        } catch (err) {
            console.error("No fue posible actualizar los registros:", err);
        }
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
        await refreshSilent();
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
        await refreshSilent();
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
        await refreshSilent();
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
        saving,
        error,
        refetch: refreshSilent,
        createScheduling,
        linkScheduling,
        deleteScheduling,
    };
}
