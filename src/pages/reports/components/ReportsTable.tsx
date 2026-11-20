import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { diplomaThemes, defaultDiplomaTheme } from "@/config/diplomas/diplomaThemes";
import { formatShortDate, truncateText } from "@/lib/utils";
import type { RowData } from "@/pages/reports/types/report.types";

interface Props {
    rows: RowData[];
}

export function ReportsTable({ rows }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-xs text-gray-500 font-medium">#</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Diplomado</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Grupo</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Módulo</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Nombre</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Profesor</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Inicio</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Termino</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">A. Rec.</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">A. Reg.</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Total A.</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-gray-800">
                {rows.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={12} className="text-center py-4 text-gray-500">
                            No se encontraron registros para los filtros seleccionados.
                        </TableCell>
                    </TableRow>
                ) : (
                    rows.map((row, index) => {
                        const theme = diplomaThemes[row.slug] || defaultDiplomaTheme;
                        return (
                            <TableRow key={row.id} className={theme.textColor}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{row.diploma}</TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.number}</TableCell>
                                <TableCell title={row.name}>{truncateText(row.name)}</TableCell>
                                <TableCell>{row.professor}</TableCell>
                                <TableCell>{formatShortDate(row.start_date)}</TableCell>
                                <TableCell>{formatShortDate(row.end_date)}</TableCell>
                                <TableCell>{row.repeating_students}</TableCell>
                                <TableCell>{row.regular_students}</TableCell>
                                <TableCell>{row.total_students}</TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    )
}
