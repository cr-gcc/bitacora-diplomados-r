import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import type { Evento } from "@/components/layouts/components/modals/calendar/CalendarEventsModal";

interface Props {
    groups: Evento[];
}

export function GroupCalendarTable({ groups }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-xs text-gray-500 font-medium">#</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Diplomado</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Grupo</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Módulo</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Título</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Profesor</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Inicio</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Termino</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-gray-800">
                {groups.map((group, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{group.diploma}</TableCell>
                        <TableCell>{group.groupNum}</TableCell>
                        <TableCell>{group.module}</TableCell>
                        <TableCell>{group.title}</TableCell>
                        <TableCell>{group.professor}</TableCell>
                        <TableCell>{group.start}</TableCell>
                        <TableCell>{group.end}</TableCell>
                        <TableCell className="flex gap-x-2 justify-start items-start">
                            <Button size="xs" variant="link" className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0">Ver</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}