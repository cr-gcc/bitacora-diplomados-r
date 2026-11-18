import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { ProgressBar } from "@/components/layouts/components/loading/ProgressBar";
import { AddSchedulingModal } from "@/pages/scheduling/components/AddSchedulingModal";
import { SchedulingTable } from "@/pages/scheduling/components/SchedulingTable";
import { useDiplomas } from "@/pages/diplomas/hooks/useDiplomas";
import { useModuleCatalog } from "@/pages/groups/hooks/useModuleCatalog";
import { useProfessors } from "@/pages/professors/hooks/useProfessors";
import { useScheduling } from "@/pages/scheduling/hooks/useScheduling";

export function SchedulingPage() {
    const [openAdd, setOpenAdd] = useState(false);
    const { diplomas } = useDiplomas();
    const { modules } = useModuleCatalog();
    const { professors } = useProfessors();
    const {
        schedulings,
        loading,
        saving,
        error,
        createScheduling,
        linkScheduling,
        deleteScheduling
    } = useScheduling();

    return (
        <>
            <div id="scheduling" className="flex flex-col gap-y-4 pb-12">
                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-5xl text-navy tracking-tight">
                            Programación
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Registra módulos y fechas incluso antes de conocer el grupo.
                        </p>
                    </div>
                    <div className="flex items-end gap-x-4">
                        <Button
                            size="sm"
                            onClick={() => setOpenAdd(true)}
                            className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                        >
                            Agregar programación
                        </Button>
                    </div>
                </div>
                {
                    loading ? (
                        <ProgressBar />
                    ) : error ? (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    ) : schedulings.length === 0 ? (
                        <p role="alert" className="text-center py-3 text-sm text-gray-500">
                            No hay programación registrada.
                        </p>
                    ) : (
                        <>
                            <Alert className="w-full border-none bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                                <AlertTitle className="text-sm">Los registros sin grupo se conservan de forma provisional. Cuando se vincule con un grupo, el registro aparecerá en la bitácora del grupo.</AlertTitle>
                            </Alert>
                            <section className="flex flex-col bg-white w-full rounded-lg px-2 pb-1 pt-0.5">
                                <SchedulingTable
                                    schedulings={schedulings}
                                    saving={saving}
                                    onLink={linkScheduling}
                                    onDelete={deleteScheduling}
                                />
                            </section>
                        </>
                    )
                }
            </div>
            <AddSchedulingModal
                open={openAdd}
                diplomas={diplomas}
                modules={modules}
                professors={professors}
                saving={saving}
                onOpenChange={setOpenAdd}
                onCreate={createScheduling}
            />
        </>
    )
}   