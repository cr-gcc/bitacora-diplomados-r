import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Props {
    courses: {
        id: number;
        diploma: string;
        group: string;
        module: string;
        title: string;
        professor: string;
        startDate: string;
        endDate: string;
        repeaters: number;
        regulars: number;
        students: number;
    }[];
}

export function ReportsTable({ courses }: Props) {
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
                    <TableHead className="text-xs text-gray-500 font-medium">A. Rec.</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">A. Reg.</TableHead>
                    <TableHead className="text-xs text-gray-500 font-medium">Total A.</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-gray-800">
                {courses.map((course, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">
                            {index + 1}
                        </TableCell>
                        <TableCell>{course.diploma}</TableCell>
                        <TableCell>{course.group}</TableCell>
                        <TableCell>{course.module}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>{course.startDate}</TableCell>
                        <TableCell>{course.endDate}</TableCell>
                        <TableCell>{course.repeaters}</TableCell>
                        <TableCell>{course.regulars}</TableCell>
                        <TableCell>{course.students}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}