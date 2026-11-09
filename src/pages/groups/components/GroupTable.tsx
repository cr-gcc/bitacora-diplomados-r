import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";
import type { Group, GroupModule } from "@/pages/groups/types/group-modules.types";
import { formatShortDate } from "@/lib/utils";
import type { GroupModalState } from "../types/group-modal.types";

interface Props {
    theme: DiplomaTheme;
    group: Group;
    modules: GroupModule[];
    onOpenModal: (modal: Exclude<GroupModalState, null>) => void;
}

export function GroupTable({ theme, group, modules, onOpenModal }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-xs text-gray-500 font-medium">#</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Módulo</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Inicio</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Termino</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Profesor</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Estatus</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-gray-800">
                {modules?.map((module) => {
                    const isScheduled = Boolean(
                        module.professor && module.start_date && module.end_date
                    );
                    return (
                        <TableRow key={module.id}>
                            <TableCell className="font-medium">{module.number}</TableCell>
                            <TableCell>{module.name}</TableCell>
                            <TableCell>{formatShortDate(module.start_date)}</TableCell>
                            <TableCell>{formatShortDate(module.end_date)}</TableCell>
                            <TableCell>
                                {module.professor
                                    ? `${module.professor.name} ${module.professor.last_name}`
                                    : "Sin asignar"}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`text-xs border-none font-semibold ${isScheduled
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-yellow-100 text-yellow-800"
                                        }`}
                                >
                                    {isScheduled ? "Programado" : "Pendiente"}
                                </Badge>
                            </TableCell>
                            <TableCell className="flex gap-x-2 justify-start items-start">
                                <Button
                                    size="xs"
                                    variant="link"
                                    className={`text-xs ${theme.textColor} font-semibold cursor-pointer hover:no-underline p-0`}
                                    onClick={() => onOpenModal({ type: "check-module", module })}
                                >
                                    Revisar
                                </Button>
                                <Button
                                    size="xs"
                                    variant="link"
                                    className={`text-xs ${theme.textColor} font-semibold cursor-pointer hover:no-underline p-0`}
                                    onClick={() => onOpenModal({ type: "edit-module", module })}
                                >
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={12} className="text-right border-none py-2">
                        <Button
                            size="xs"
                            className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                            onClick={() => onOpenModal({ type: "edit-group", group })}
                        >
                            Editar grupo
                        </Button>
                        <Button
                            size="xs"
                            className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                            onClick={() => onOpenModal({ type: "delete-group", group })}
                        >
                            Eliminar grupo
                        </Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}