import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EditProfessorModal } from "@/pages/professors/components/EditProfessorModal";
import type { Professor, UpdateProfessorPayload } from "../types/professor.types";

interface Props {
    professors: Professor[];
    onUpdate: (
        id: number,
        data: UpdateProfessorPayload
    ) => Promise<Professor>;
    saving: boolean;
}

export function ProfesorTable({ professors, onUpdate, saving }: Props) {
    const [search, setSearch] = useState("");
    const [selectedProfessor, setSelectedProfessor] =
        useState<Professor | null>(null);

    const filteredProfessors = professors.filter((professor) => {
        const query = search.toLowerCase().trim();
        return [
            professor.name,
            professor.lastName,
            professor.email,
            professor.user,
            professor.rfc,
        ].some((value) =>
            (value ?? "").toLowerCase().includes(query)
        );
    });

    return (
        <>
            <Table>
                <TableCaption className="caption-top mt-1.5">
                    <div className="flex justify-end gap-x-2">
                        <Input
                            type="text"
                            placeholder="Buscar"
                            className="border-gray-300 rounded-md px-2 text-xs w-48 h-6"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs text-gray-500 font-medium">#</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Nombre</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Apellidos</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Email</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">RFC</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Usuario</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Estatus</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs text-gray-800">
                    {filteredProfessors.map((professor, index) => (
                        <TableRow key={professor.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{professor.name}</TableCell>
                            <TableCell>{professor.lastName}</TableCell>
                            <TableCell>{professor.email}</TableCell>
                            <TableCell>{professor.rfc}</TableCell>
                            <TableCell>{professor.user}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`text-xs border-none font-semibold ${professor.active
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {professor.active ? "Activo" : "Inactivo"}
                                </Badge>
                            </TableCell>
                            <TableCell className="flex gap-x-2 justify-start items-start">
                                <Button size="xs" variant="link" className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0" onClick={() => setSelectedProfessor(professor)}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {filteredProfessors.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={12}
                                className="text-center py-6 text-gray-500"
                            >
                                No se encontraron profesores con estos parámetros.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {selectedProfessor && (
                <EditProfessorModal
                    key={selectedProfessor.id}
                    professor={selectedProfessor}
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) setSelectedProfessor(null);
                    }}
                    onUpdate={onUpdate}
                    saving={saving}
                />
            )}
        </>
    )
}