import { useCallback, useState } from "react";
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
import { LinkSchedulingModal } from "@/pages/scheduling/components/LinkSchedulingModal";
import { DeleteSchedulingModal } from "@/pages/scheduling/components/DeleteSchedulingModal";
import { diplomaThemes, defaultDiplomaTheme } from "@/config/diplomas/diplomaThemes";
import { useTableSearch } from "@/hooks/useTableSearch";
import type { Scheduling, LinkSchedulingPayload } from "../types/scheduling.types";
import { formatShortDate } from "@/lib/utils";

interface Props {
    schedulings: Scheduling[];
    saving: boolean;
    onLink: (data: LinkSchedulingPayload) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export function SchedulingTable({ schedulings, saving, onLink, onDelete }: Props) {
    const [selectedScheduling, setSelectedScheduling] = useState<Scheduling | null>(null);
    const [deleteScheduling, setDeleteScheduling] = useState<Scheduling | null>(null);

    const getSearchableFields = useCallback(
        (scheduling: Scheduling) => [
            scheduling.diploma?.title,
            scheduling.module?.number,
            scheduling.module?.name,
            `${scheduling.professor?.name ?? ""} ${scheduling.professor?.last_name ?? ""}`,
            formatShortDate(scheduling.start_date),
            formatShortDate(scheduling.end_date),
        ],
        []
    );

    const { search, setSearch, filteredItems: filteredSchedulings } = useTableSearch(
        schedulings,
        getSearchableFields
    );

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
                            onChange={(e) => setSearch(e.target.value)}
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
                    {filteredSchedulings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                No se encontraron coincidencias.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredSchedulings.map((scheduling, index) => {
                            const theme = diplomaThemes[scheduling.diploma?.slug ?? ""] ?? defaultDiplomaTheme;
                            return (
                                <TableRow key={scheduling.id} className={theme.textColor}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{scheduling.diploma?.title}</TableCell>
                                    <TableCell>{scheduling.module?.number}</TableCell>
                                    <TableCell>{scheduling.professor?.name} {scheduling.professor?.last_name}</TableCell>
                                    <TableCell>{formatShortDate(scheduling.start_date)}</TableCell>
                                    <TableCell>{formatShortDate(scheduling.end_date)}</TableCell>
                                    <TableCell className="flex flex-col">
                                        <Button
                                            size="xs"
                                            variant="link"
                                            className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0"
                                            onClick={() => setSelectedScheduling(scheduling)}
                                        >
                                            Vincular
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="link"
                                            className="text-xs text-navy font-semibold cursor-pointer hover:no-underline p-0"
                                            onClick={() => setDeleteScheduling(scheduling)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table >
            {selectedScheduling && (
                <LinkSchedulingModal
                    open={true}
                    scheduling={selectedScheduling}
                    saving={saving}
                    onOpenChange={(open) => !open && setSelectedScheduling(null)}
                    onLink={onLink}
                />
            )}
            {deleteScheduling && (
                <DeleteSchedulingModal
                    open={true}
                    scheduling_id={deleteScheduling.id}
                    saving={saving}
                    onOpenChange={(open) => !open && setDeleteScheduling(null)}
                    onDelete={onDelete}
                />
            )}
        </>
    )
}