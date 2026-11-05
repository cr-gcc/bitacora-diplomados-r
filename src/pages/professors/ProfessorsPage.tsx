import { useState } from "react";
import { useProfessors } from "./hooks/useProfessors";
import { ProfesorTable } from "@/pages/professors/components/ProfesorTable"
import { AddProfessorModal } from "@/pages/professors/components/AddProfessorModal"
import { Button } from "@/components/ui/button"

export function ProfessorsPage() {
    const [openAdd, setOpenAdd] = useState(false);
    const { professors, loading, error } = useProfessors();
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
                <section className="flex flex-col bg-white w-full rounded-lg px-2 pb-1 pt-0.5">
                    {
                        loading ? (
                            <p>Cargando profesores...</p>
                        ) : error ? (
                            <p className="text-red-600">{error}</p>
                        ) : (
                            <ProfesorTable professors={professors} />
                        )
                    }
                </section>
            </div>
            <AddProfessorModal open={openAdd} onOpenChange={setOpenAdd} />
        </>
    )
}