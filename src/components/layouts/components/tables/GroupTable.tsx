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


interface Props {
    modules: {
        id: number;
        numero: number;
        module: string;
        inicio: string;
        termino: string;
        profesor: string;
        estatus: string;
    }[];
    theme: DiplomaTheme;
}

export function GroupTable({ modules, theme }: Props) {
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
                {modules.map((module) => (
                    <TableRow key={module.numero}>
                        <TableCell className="font-medium">{module.numero}</TableCell>
                        <TableCell>{module.module}</TableCell>
                        <TableCell>{module.inicio}</TableCell>
                        <TableCell>{module.termino}</TableCell>
                        <TableCell>{module.profesor}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`bg-emerald-100 text-emerald-800 text-xs border-none font-semibold ${module.estatus === "Pendiente" ? "bg-yellow-100 text-yellow-800" : "bg-emerald-100 text-emerald-800"}`}>
                                {module.estatus}
                            </Badge>
                        </TableCell>
                        <TableCell className="flex gap-x-2 justify-start items-start">
                            <Button size="xs" variant="link" className={`text-xs ${theme.buttonText} font-semibold cursor-pointer hover:no-underline p-0`}>Revisar</Button>
                            <Button size="xs" variant="link" className={`text-xs ${theme.buttonText} font-semibold cursor-pointer hover:no-underline p-0`}>Editar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={12} className="text-right border-none py-2">
                        <Button className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`} size="xs">Editar grupo</Button>
                        <Button className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`} size="xs">Eliminar grupo</Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}