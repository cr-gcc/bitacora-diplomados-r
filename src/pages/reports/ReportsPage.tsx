import { useState } from "react";
import { GroupCalendarTable } from "@/components/layouts/components/tables/GroupCalendarTable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Evento = {
    id: number;
    diploma: string;
    groupNum: string;
    module: string;
    title: string;
    professor: string;
    fecha: Date;
    start: string;
    end: string;
};

export function ReportsPage() {
    const [diplomas, setDiplomas] = useState('');
    const [groupNum, setGroupNum] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const eventos: Evento[] = [
        {
            id: 1,
            diploma: "Finanzas",
            groupNum: "9601",
            module: "1",
            title: "Fundamentos",
            professor: "Profesor 1",
            fecha: new Date(2026, 9, 24), // 24 de Octubre de 2026
            start: "24/09/2026",
            end: "25/10/2026",
        },
        {
            id: 2,
            diploma: "Finanzas",
            groupNum: "9602",
            module: "1",
            title: "Fundamentos",
            professor: "Profesor 1",
            fecha: new Date(2026, 9, 24), // 24 de Octubre de 2026
            start: "24/09/2026",
            end: "25/10/2026",
        },
        {
            id: 3,
            diploma: "Comercio Electrónico",
            groupNum: "9601",
            module: "2",
            title: "Ventas Digitales",
            professor: "José Antonio Gómez Rodríguez",
            fecha: new Date(2026, 9, 28), // 28 de Octubre de 2026
            start: "28/09/2026",
            end: "29/10/2026",
        },
    ]
    return (
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
                        onClick={() => alert("HOLA")}
                        className="bg-gold text-xs text-white hover:bg-gold/90 hover:text-white cursor-pointer"
                    >
                        Exportar Excel
                    </Button>
                </div>
            </div>
            <section className="flex flex-col bg-white w-full rounded-lg px-2 py-2.5">
                <div className="grid grid-cols-4 gap-2">
                    <Select
                        id="diplomas"
                        value={diplomas}
                        onValueChange={setDiplomas}
                    >
                        <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                            <SelectValue placeholder="Diplomado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Activo" className="text-xs">Activo</SelectItem>
                            <SelectItem value="Inactivo" className="text-xs">Inactivo</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        id="groupNum"
                        value={groupNum}
                        onValueChange={setGroupNum}
                    >
                        <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                            <SelectValue placeholder="Grupo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Activo" className="text-xs">Activo</SelectItem>
                            <SelectItem value="Inactivo" className="text-xs">Inactivo</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        id="start"
                        type="date"
                        className="text-xs h-8 border-gray-300"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                    <Input
                        id="end"
                        type="date"
                        className="text-xs h-8 border-gray-300"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
            </section>
            <section className="flex flex-col bg-white w-full rounded-lg px-2 pb-1 pt-0.5">
                <GroupCalendarTable groups={eventos} />
            </section>
        </div>
    )
}