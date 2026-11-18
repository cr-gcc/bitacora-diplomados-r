import { useState } from "react";
import { useProfessors } from "@/pages/professors/hooks/useProfessors";
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { ProgressBar } from "@/components/layouts/components/loading/ProgressBar";
import { ProfesorTable } from "@/pages/professors/components/ProfesorTable"
import { AddProfessorModal } from "@/pages/professors/components/AddProfessorModal"

export function ProfessorsPage() {
    const [openAdd, setOpenAdd] = useState(false);
    const {
        professors,
        loading,
        refreshing,
        saving,
        error,
        refreshError,
        refetch,
        createProfessor,
        updateProfessor,
    } = useProfessors();

    return (
        <>
            <div id="professors" className="flex flex-col gap-y-4 pb-12">
                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-5xl text-navy tracking-tight">
                            Profesores
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Selecciona el profesor para consultar su información.
                        </p>
                    </div>
                    <div className="flex items-end gap-x-4">
                        <Button
                            size="sm"
                            onClick={() => setOpenAdd(true)}
                            className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                        >
                            Agregar profesor
                        </Button>
                    </div>
                </div>
                {refreshError && (
                    <Alert className="w-full border-none bg-amber-50 text-amber-900 flex items-center justify-between gap-2">
                        <AlertTitle className="text-sm">{refreshError}</AlertTitle>
                        <Button
                            size="xs"
                            variant="outline"
                            disabled={refreshing}
                            onClick={() => void refetch()}
                            className="text-xs border-amber-300 text-amber-900 hover:bg-amber-100 cursor-pointer"
                        >
                            {refreshing ? "Actualizando..." : "Reintentar"}
                        </Button>
                    </Alert>
                )}
                <section className="flex flex-col bg-white w-full rounded-lg px-2 pb-1 pt-0.5">
                    {
                        loading ? (
                            <ProgressBar />
                        ) : error ? (
                            <p role="alert" className="text-sm text-red-600">
                                {error}
                            </p>
                        ) : professors.length === 0 ? (
                            <p role="alert" className="text-center py-3 text-sm text-gray-500">
                                No hay profesores registrados.
                            </p>
                        ) : (
                            <ProfesorTable
                                professors={professors}
                                onUpdate={updateProfessor}
                                saving={saving}
                            />
                        )
                    }
                </section>
            </div>
            <AddProfessorModal
                open={openAdd}
                onOpenChange={setOpenAdd}
                onCreate={createProfessor}
                saving={saving}
            />
        </>
    )
}