import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReportsTable } from "@pages/reports/components/ReportsTable";
import { useDiplomas } from "@pages/diplomas/hooks/useDiplomas";
import { useGroupsList } from "@pages/reports/hooks/useGroupsList";
import { ProgressBar } from "@/components/layouts/components/loading/ProgressBar";
import { LoadingScreen } from "@/components/layouts/components/loading/LoadingScreen";
import { useReports } from "@pages/reports/hooks/useReports";
import type { ReportFilters } from "@pages/reports/types/report.types";

export function ReportsPage() {
    const [form, setForm] = useState<ReportFilters>({});

    const { diplomas } = useDiplomas(false);
    const { groups } = useGroupsList();
    const { rows, loading, downloading, error, hasSearched, searchReports, downloadReport } = useReports();

    const diplomaItems = [
        { value: null, label: "Todos los diplomados" },
        ...diplomas.map((diploma) => ({
            value: diploma.id,
            label: diploma.title,
        })),
    ];

    const groupItems = [
        { value: null, label: "Todos los grupos" },
        ...groups.map((group) => ({
            value: group.code,
            label: group.code,
        })),
    ];

    const handleSearch = () => {
        void searchReports(form);
    };

    return (
        <>
            <div id="reports" className="flex flex-col gap-y-4 pb-12">
                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-5xl text-navy tracking-tight">
                            Reportes
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Filtra registros internos por periodo, diplomado y grupo.
                        </p>
                    </div>
                    <div className="flex items-end gap-x-4">
                        <Button
                            size="sm"
                            disabled={downloading}
                            onClick={() => void downloadReport(form)}
                            className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                        >
                            {downloading ? "Descargando..." : "Descargar"}
                        </Button>
                    </div>
                </div>
                <section className="flex flex-col bg-white w-full rounded-lg px-2 py-2.5">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        <Select
                            id="diplomas"
                            items={diplomaItems}
                            value={form.diploma_id ?? null}
                            onValueChange={(value) => {
                                setForm((prev) => ({
                                    ...prev,
                                    diploma_id: value ?? undefined,
                                }));
                            }}
                        >
                            <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                <SelectValue placeholder="Diplomado" />
                            </SelectTrigger>
                            <SelectContent>
                                {diplomaItems.map((diploma) => (
                                    <SelectItem key={diploma.value ?? "all"} value={diploma.value} className="text-xs">
                                        {diploma.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            id="code"
                            items={groupItems}
                            value={form.code ?? null}
                            onValueChange={(value) => {
                                setForm((prev) => ({
                                    ...prev,
                                    code: value ?? undefined,
                                }));
                            }}
                        >
                            <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                <SelectValue placeholder="Grupo" />
                            </SelectTrigger>
                            <SelectContent>
                                {groupItems.map((group) => (
                                    <SelectItem key={group.value ?? "all"} value={group.value} className="text-xs">
                                        {group.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            id="start_date"
                            type="date"
                            className="text-xs h-8 border-gray-300"
                            value={form.start_date ?? ""}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    start_date: e.target.value || undefined,
                                }))
                            }
                        />
                        <Input
                            id="end_date"
                            type="date"
                            className="text-xs h-8 border-gray-300"
                            value={form.end_date ?? ""}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    end_date: e.target.value || undefined,
                                }))
                            }
                        />
                    </div>
                    <div className="flex justify-end gap-x-1">
                        <Button
                            size="xs"
                            disabled={loading}
                            onClick={() => setForm({})}
                            className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                        >
                            Limpiar
                        </Button>
                        <Button
                            size="xs"
                            disabled={loading}
                            onClick={handleSearch}
                            className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                        >
                            {loading ? "Buscando..." : "Buscar"}
                        </Button>
                    </div>
                    {loading && <div className="mt-2"><ProgressBar /></div>}
                    {error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
                </section>
                {hasSearched && !loading && !error && (
                    <section className="flex flex-col bg-white w-full rounded-lg px-2 pb-1 pt-0.5">
                        <ReportsTable rows={rows} />
                    </section>
                )}
            </div>
            {downloading && <LoadingScreen message="Descargando reporte..." />}
        </>
    )
}
