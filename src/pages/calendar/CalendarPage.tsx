import { GroupsCalendar } from "@/components/layouts/GroupsCalendar"

export function CalendarPage() {

    return (
        <div id="calendar" className="flex flex-col gap-y-4 pb-12">
            <div>
                <h1 className="text-5xl text-navy tracking-tight">
                    Calendario
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Selecciona una fecha para consultar los cursos programados.
                </p>
            </div>
            <GroupsCalendar />
        </div>
    )
}