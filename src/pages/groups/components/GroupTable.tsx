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
                    const isReviewed = Boolean(
                        module.review?.dates_reviewed && module.review?.exam_uploaded && module.review?.group_with_students
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
                                <div className="flex flex-col gap-y-2">
                                    <Badge
                                        variant="outline"
                                        className={`text-xs border-none ${isScheduled
                                            ? "bg-sky-100 text-sky-800"
                                            : "bg-amber-100 text-amber-800"
                                            }`}
                                    >
                                        <span className="font-semibold">Grupo:</span> {isScheduled ? "Programado" : "Pendiente"}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs border-none ${isReviewed
                                            ? "bg-sky-100 text-sky-800"
                                            : "bg-amber-100 text-amber-800"
                                            }`}
                                    >
                                        <span className="font-semibold">Revisión:</span> {isReviewed ? "Programado" : "Pendiente"}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-y-1">
                                    <Button
                                        size="xs"
                                        variant="link"
                                        className={`text-xs ${theme.textColor} font-semibold cursor-pointer hover:no-underline p-0`}
                                        onClick={() => onOpenModal({ type: "edit-module", module })}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="link"
                                        className={`text-xs ${theme.textColor} font-semibold cursor-pointer hover:no-underline p-0`}
                                        onClick={() => onOpenModal({ type: "check-module", module_number: module.number, review: module.review })}
                                    >
                                        Revisar
                                    </Button>
                                </div>
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
                            onClick={() => onOpenModal({ type: "update-group", group })}
                        >
                            Actualizar grupo
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