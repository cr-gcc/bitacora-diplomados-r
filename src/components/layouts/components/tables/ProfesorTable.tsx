import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EditProfessorModal } from "@/components/layouts/components/modals/professors/EditProfessorModal";


interface Props {
    professors: {
        id: number;
        profesor: string;
        email: string;
        rfc: string;
        usuario: string;
        password: string;
        estatus: string;
    }[];
}

export function ProfesorTable({ professors }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Table>
                <TableCaption className="caption-top mt-1.5">
                    <div className="flex justify-end gap-x-2">
                        <Input
                            type="text"
                            placeholder="Buscar"
                            className="border-gray-300 rounded-md px-2 text-xs w-48 h-6"
                        />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs text-gray-500 font-medium">#</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Profesor</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Email</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">RFC</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Usuario</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Contraseña</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Estatus</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs text-gray-800">
                    {professors.map((profesor, index) => (
                        <TableRow key={profesor.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{profesor.profesor}</TableCell>
                            <TableCell>{profesor.email}</TableCell>
                            <TableCell>{profesor.rfc}</TableCell>
                            <TableCell>{profesor.usuario}</TableCell>
                            <TableCell>{profesor.password}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`bg-emerald-100 text-emerald-800 text-xs border-none font-semibold ${profesor.estatus === "Inactivo" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
                                    {profesor.estatus}
                                </Badge>
                            </TableCell>
                            <TableCell className="flex gap-x-2 justify-start items-start">
                                <Button size="xs" variant="link" className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0" onClick={() => setOpen(true)}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EditProfessorModal open={open} onOpenChange={setOpen} />
        </>
    )
}