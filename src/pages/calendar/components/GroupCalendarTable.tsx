import { useNavigate } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { diplomaThemes, defaultDiplomaTheme } from "@/config/diplomas/diplomaThemes";
import type { GroupsDates } from "@/pages/dashboard/types/dashboard.types";
import { formatShortDate } from "@/lib/utils";

interface Props {
    groupsDates: GroupsDates[];
}

export function GroupCalendarTable({ groupsDates }: Props) {
    const navigate = useNavigate();

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
                {groupsDates.map((group, index) => {
                    const theme = diplomaThemes[group.slug ?? ""] ?? defaultDiplomaTheme;
                    return (
                        <TableRow key={index} className={theme.textColor}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{group.diploma}</TableCell>
                            <TableCell>{group.code}</TableCell>
                            <TableCell>{group.number}</TableCell>
                            <TableCell>{group.name}</TableCell>
                            <TableCell>{group.professor}</TableCell>
                            <TableCell>{formatShortDate(group.start_date)}</TableCell>
                            <TableCell>{formatShortDate(group.end_date)}</TableCell>
                            <TableCell className="flex gap-x-2 justify-start items-start">
                                <Button
                                    size="xs"
                                    variant="link"
                                    className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0"
                                    onClick={() => navigate(`/diplomados/${group.slug}?grupo=${group.code}`)}
                                >
                                    Ver
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}