import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LinkModal } from "@components/layouts/components/modals/scheduling/LinkModal";

interface Props {
    scheduling: {
        id: number;
        diplomado: string;
        modulo: string;
        profesor: string;
        inicio: string;
        termino: string;
    }[];
}

export function SchedulingTable({ scheduling }: Props) {
    const [openLink, setOpenLink] = useState(false);
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
                        <TableHead className="text-xs text-gray-500 font-medium">Diplomado</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Modulo</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Profesor</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Inicio</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Termino</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs text-gray-800">
                    {scheduling.map((scheduling, index) => (
                        <TableRow key={scheduling.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{scheduling.diplomado}</TableCell>
                            <TableCell>{scheduling.modulo}</TableCell>
                            <TableCell>{scheduling.profesor}</TableCell>
                            <TableCell>{scheduling.inicio}</TableCell>
                            <TableCell>{scheduling.termino}</TableCell>
                            <TableCell className="flex gap-x-2 justify-start items-start">
                                <Button size="xs" variant="link" className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0" onClick={() => setOpenLink(true)}>
                                    Vincular
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            <LinkModal open={openLink} onOpenChange={setOpenLink} />
        </>
    )
}