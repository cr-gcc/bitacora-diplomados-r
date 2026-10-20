import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
}

export function GroupTable({ modules }: Props) {
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
                            <Button size="xs" variant="link" className="text-xs text-pink-950 font-semibold cursor-pointer hover:no-underline p-0">Revisar</Button>
                            <Button size="xs" variant="link" className="text-xs text-pink-950 font-semibold cursor-pointer hover:no-underline p-0">Editar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={12} className="text-right border-none py-2">
                        <Button className="bg-pink-950 text-xs text-white hover:bg-pink-950/90 hover:text-white cursor-pointer" size="xs">Editar grupo</Button>
                        <Button className="bg-pink-950 text-xs text-white hover:bg-pink-950/90 hover:text-white cursor-pointer" size="xs">Eliminar grupo</Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}