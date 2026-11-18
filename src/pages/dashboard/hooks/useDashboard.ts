import { useCallback, useEffect, useRef, useState } from "react";
import { StickyNotes, FolderCheck, FolderX, Link2Off, type LucideIcon } from "lucide-react";
import { dashboardService } from "../services/dashboardService";
import axios from "axios";
import type { StatCard, GroupsDates } from "@/pages/dashboard/types/dashboard.types";

const STAT_CARD_CONFIG: Record<string, { title: string; description: string; icon: LucideIcon }> = {
    active_groups: {
        title: "Grupos activos",
        description: "Grupos registrados en plataforma con algún módulo activo o programado.",
        icon: StickyNotes,
    },
    active_modules: {
        title: "Módulos activos",
        description: "Módulos con grupo, que cuentan con información completa.",
        icon: FolderCheck,
    },
    pending_modules: {
        title: "Módulos pendientes",
        description: "Módulos con grupo, sin información o programación completa.",
        icon: FolderX,
    },
    schedule_modules: {
        title: "Registros sin Grupo",
        description: "Programación de módulos sin grupo.",
        icon: Link2Off,
    },
};

export function useDashboard() {
    const [cardStats, setCardStats] = useState<StatCard[]>([]);
    const [groupsDates, setGroupsDates] = useState<GroupsDates[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const loadDashboard = useCallback(async () => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            setLoading(true);
            setError(null);
            const [stats, currentGroups] = await Promise.all([
                dashboardService.getDashboardStats(controller.signal),
                dashboardService.getCurrentGroups(controller.signal),
            ]);
            if (!controller.signal.aborted) {
                const mappedCards: StatCard[] = stats.map((stat) => {
                    const config = STAT_CARD_CONFIG[stat.category];
                    return {
                        title: config?.title ?? stat.category,
                        value: stat.total,
                        description: config?.description ?? "",
                        icon: config?.icon ?? StickyNotes,
                    };
                });
                setCardStats(mappedCards);
                setGroupsDates(currentGroups);
            }
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            setError("No fue posible cargar la información del dashboard.");
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        void loadDashboard();
        return () => {
            controllerRef.current?.abort();
        };
    }, [loadDashboard]);

    return {
        cardStats,
        groupsDates,
        loading,
        error,
        refetch: loadDashboard,
    };
}
