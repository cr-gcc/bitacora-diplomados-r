import { Users, UserX, FolderX } from "lucide-react"
import { startOfWeek, endOfWeek, format } from "date-fns"
import { GroupCalendarTable } from "@/components/layouts/components/tables/GroupCalendarTable";

type Evento = {
    id: number;
    diploma: string;
    groupNum: string;
    module: string;
    title: string;
    professor: string;
    fecha: Date;
    start: string;
    end: string;
};

export function DashboardPage() {

    const eventos: Evento[] = [
        {
            id: 1,
            diploma: "Finanzas",
            groupNum: "9601",
            module: "1",
            title: "Fundamentos",
            professor: "Profesor 1",
            fecha: new Date(2026, 9, 24), // 24 de Octubre de 2026
            start: "24/09/2026",
            end: "25/10/2026",
        },
        {
            id: 2,
            diploma: "Finanzas",
            groupNum: "9602",
            module: "1",
            title: "Fundamentos",
            professor: "Profesor 1",
            fecha: new Date(2026, 9, 24), // 24 de Octubre de 2026
            start: "24/09/2026",
            end: "25/10/2026",
        },
        {
            id: 3,
            diploma: "Comercio Electrónico",
            groupNum: "9601",
            module: "2",
            title: "Ventas Digitales",
            professor: "José Antonio Gómez Rodríguez",
            fecha: new Date(2026, 9, 28), // 28 de Octubre de 2026
            start: "28/09/2026",
            end: "29/10/2026",
        },
    ]
    const stats = [
        {
            title: "Grupos Totales",
            value: "24",
            description: "Grupos registrados en plataforma",
            icon: Users,
        },
        {
            title: "Grupos sin Profesor",
            value: "3",
            description: "Pendientes de asignación docente",
            icon: UserX,
        },
        {
            title: "Registros sin Grupo",
            value: "8",
            description: "Pendientes por asignar a un grupo",
            icon: FolderX,
        },
    ]

    // Fecha inicial (Lunes 00:00:00) y final (Domingo 23:59:59.999) de la semana actual
    const currentWeekInitDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekEndDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    return (
        <div id="dashboard" className="flex flex-col gap-y-4 pb-12">
            <div>
                <h1 className="text-5xl text-navy tracking-tight">
                    Dashboard
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Seguimiento de diplomados, grupos y programación académica.
                </p>
            </div>
            <section className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div
                                key={stat.title}
                                className="bg-white rounded-xl border border-gray-200 px-6 pt-3 pb-4 shadow-xs flex flex-col justify-between gap-y-4 hover:border-gray-300 hover:shadow-sm transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {stat.title}
                                    </span>
                                    <div className="size-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-navy">
                                        <Icon className="size-5" />
                                    </div>
                                </div>

                                <div>
                                    <div className="text-4xl font-bold text-navy tracking-tight">
                                        {stat.value}
                                    </div>
                                    <p className="mt-1.5 text-xs text-gray-500">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-white rounded-xl border border-gray-200 px-6 pt-3 pb-4 shadow-xs">
                    <h3 className="text-base font-semibold text-navy mb-2">
                        Inicio cursos {format(currentWeekInitDate, "dd/MM/yyyy")} - {format(currentWeekEndDate, "dd/MM/yyyy")}
                    </h3>
                    <GroupCalendarTable groups={eventos} />
                </div>
            </section>
        </div>
    )
}