import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { reportService } from "@pages/reports/services/reportService";
import type { ReportFilters, RowData } from "@pages/reports/types/report.types";
import axios from "axios";

export function useReports() {
    const [rows, setRows] = useState<RowData[]>([]);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);
    const downloadControllerRef = useRef<AbortController | null>(null);

    const searchReports = useCallback(async (filters: ReportFilters) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            setLoading(true);
            setError(null);
            setHasSearched(true);
            const response = await reportService.getReport(filters, controller.signal);
            if (!controller.signal.aborted) {
                setRows(response.data);
            }
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            setError("No fue posible consultar el reporte.");
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, []);

    const downloadReport = useCallback(async (filters: ReportFilters) => {
        downloadControllerRef.current?.abort();
        const controller = new AbortController();
        downloadControllerRef.current = controller;
        try {
            setDownloading(true);
            setError(null);
            const blob = await reportService.downloadReport(filters, controller.signal);
            if (controller.signal.aborted) return;

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            const currentDate = format(new Date(), "dd-MM-yyyy");
            link.href = url;
            link.download = `Reporte_${currentDate}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            if (axios.isCancel(err) || controller.signal.aborted) {
                return;
            }
            setError("No fue posible descargar el reporte.");
        } finally {
            if (!controller.signal.aborted) {
                setDownloading(false);
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
            downloadControllerRef.current?.abort();
        };
    }, []);

    return {
        rows,
        loading,
        downloading,
        error,
        hasSearched,
        searchReports,
        downloadReport,
    };
}
