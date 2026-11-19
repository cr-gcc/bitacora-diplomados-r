import { useCallback, useEffect, useRef, useState } from "react";
import { parseISO } from "date-fns";
import axios from "axios";
import { calendarService } from "../services/calendarService";
import type { CalendarEvent } from "../types/calendar.types";

export function useCalendar(currentMonth: Date) {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;

    const loadEvents = useCallback(async () => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            setLoading(true);
            setError(null);
            const data = await calendarService.getEventsByMonth(year, month, controller.signal);
            if (!controller.signal.aborted) {
                setEvents(
                    data.map((item) => ({
                        ...item,
                        calendar_date: parseISO(item.start_date),
                    }))
                );
            }
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            setError("No fue posible cargar los cursos programados.");
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [year, month]);

    useEffect(() => {
        void loadEvents();
        return () => {
            controllerRef.current?.abort();
        };
    }, [loadEvents]);

    return {
        events,
        loading,
        error,
        refetch: loadEvents,
    };
}
