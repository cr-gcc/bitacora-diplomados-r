import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddSchedulingModal } from "@/components/layouts/components/modals/scheduling/AddSchedulingModal";
import { SchedulingTable } from "@/components/layouts/components/tables/SchedulingTable";
import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"

export function SchedulingPage() {
    const [openScheduling, setOpenScheduling] = useState(false);

    const scheduling = [
        {
            id: 1,
            diplomado: "Finanzas",
            modulo: "1",
            profesor: "Profesor 1",
            inicio: "2022-01-01",
            termino: "2022-01-01",
        },
        {
            id: 2,
            diplomado: "TICS",
            modulo: "2",
            profesor: "Profesor 2",
            inicio: "2022-02-01",
            termino: "2022-02-01",
        },
        {
            id: 3,
            diplomado: "Comercio Eletrónico",
            modulo: "3",
            profesor: "Profesor 3",
            inicio: "2022-03-01",
            termino: "2022-03-01",
        },
    ];

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
                            onClick={() => setOpenScheduling(true)}
                            className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                        >
                            Agregar programación
                        </Button>
                    </div>
                </div>
                <Alert className="w-full border-none bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                    <AlertTitle className="text-sm">Los registros sin grupo se conservan de forma provisional. La vinculación posterior no debe duplicar el módulo del grupo.</AlertTitle>
                </Alert>
                <section className="flex flex-col bg-white w-full rounded-lg px-2 pb-1 pt-0.5">
                    <SchedulingTable scheduling={scheduling} />
                </section>
            </div>
            <AddSchedulingModal open={openScheduling} onOpenChange={setOpenScheduling} />
        </>
    )
}   