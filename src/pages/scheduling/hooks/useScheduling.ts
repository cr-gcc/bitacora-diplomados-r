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

    const loadSchedulings = useCallback(async () => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            setLoading(true);
            setError(null);
            const data = await schedulingService.getAll(controller.signal);
            if (!controller.signal.aborted) {
                setSchedulings(data);
            }
        } catch (error) {
            if (axios.isCancel(error) || controller.signal.aborted) {
                return;
            }
            setError("No fue posible cargar los registros");
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [])

    const createScheduling = async (
        data: CreateSchedulingPayload,
        signal?: AbortSignal
    ): Promise<Scheduling> => {
        setSaving(true);
        try {
            const scheduling = await schedulingService.create(data, signal);
            await loadSchedulings();
            return scheduling;
        } finally {
            setSaving(false);
        }
    }

    const deleteScheduling = async (
        id: number,
        signal?: AbortSignal
    ): Promise<void> => {
        setSaving(true);
        try {
            await schedulingService.delete(id, signal);
            await loadSchedulings();
        } finally {
            setSaving(false);
        }
    }

    const linkScheduling = async (
        data: LinkSchedulingPayload,
        signal?: AbortSignal
    ): Promise<void> => {
        setSaving(true);
        try {
            await schedulingService.linkScheduling(data, signal);
            await loadSchedulings();
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        void loadSchedulings();
        return () => {
            controllerRef.current?.abort();
        }
    }, [loadSchedulings]);

    return {
        schedulings,
        loading,
        saving,
        error,
        refetch: loadSchedulings,
        createScheduling,
        linkScheduling,
        deleteScheduling
    }
}