import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { CalendarEventsModal, type Evento } from "@/components/layouts/components/modals/calendar/CalendarEventsModal"
import { isSameDay } from "date-fns"
import { es } from "date-fns/locale"

export function GroupsCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedEvents, setSelectedEvents] = useState<Evento[]>([])
    const [openModal, setOpenModal] = useState(false)

    // Lista de cursos / módulos programados (puedes traerlos de tu backend o estado)
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

    // Manejador al hacer clic en un día del calendario
    const handleSelect = (date: Date | undefined) => {
        if (!date) return

        // 1. Filtrar los eventos programados que coincidan con la fecha seleccionada
        const eventosEncontrados = eventos.filter((evento) => isSameDay(evento.fecha, date))

        // 2. Si hay eventos, guardamos los datos y abrimos el modal
        if (eventosEncontrados.length > 0) {
            setSelectedEvents(eventosEncontrados)
            setOpenModal(true)
        }

        // 3. Deseleccionar automáticamente para que no se quede marcado como seleccionado
        setSelectedDate(undefined)

        // 4. Quitar foco para eliminar el anillo de selección
        if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
    }

    const handleOpenChange = (open: boolean) => {
        setOpenModal(open)
        if (!open) {
            setSelectedDate(undefined)
            setSelectedEvents([])
        }
    }

    return (
        <>
            <Calendar
                mode="single"
                locale={es}
                selected={selectedDate}
                onSelect={handleSelect}
                // 1. Deshabilitar los días que no tengan eventos (no clickeables)
                disabled={(date) => !eventos.some((e) => isSameDay(e.fecha, date))}
                className="w-full bg-white p-6 rounded-lg border border-gray-200"
                classNames={{
                    root: "w-full",
                    months: "relative w-full flex flex-col gap-4",
                    nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between z-10 px-2",
                    button_previous: "size-8 p-0 text-navy border border-gray-200 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-xs",
                    button_next: "size-8 p-0 text-navy border border-gray-200 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-xs",
                    month: "w-full gap-y-4",
                    month_caption: "flex h-8 w-full items-center justify-center",
                    caption_label: "capitalize text-lg font-semibold text-navy",
                    month_grid: "w-full border-collapse",
                    weekdays: "flex w-full",
                    weekday: "flex-1 text-center capitalize text-xs font-semibold text-gray-600",
                    week: "flex w-full mt-2 gap-1",
                    day: "flex-1 p-0 text-center relative aspect-auto h-12",
                    // 2. Estilos para los botones: sin hover gris, legibles pero no clickeables en días deshabilitados
                    day_button: "w-full h-12 aspect-auto text-sm disabled:cursor-default disabled:opacity-100 disabled:text-gray-500 hover:bg-transparent hover:text-inherit focus:outline-none focus:ring-0 focus-visible:ring-0",
                    // 3. Día en turno (hoy): siempre lleva bg-gold con texto blanco (incluso en hover)
                    today: "bg-gold text-white rounded-md [&_button]:bg-gold [&_button]:text-white [&_button]:font-bold [&_button:hover]:bg-gold [&_button:hover]:text-white [&_button]:disabled:text-white [&_button]:disabled:opacity-100 [&_button[data-selected-single=true]]:bg-gold [&_button[data-selected-single=true]]:text-white",
                    disabled: "text-gray-400 pointer-events-none opacity-100",
                }}
                // 4. Modifiers: destacar los días con curso
                modifiers={{
                    tieneCurso: (date) => eventos.some((e) => isSameDay(e.fecha, date)),
                }}
                // 5. ModifiersClassNames: navy constante sin gris en hover y cursor pointer sólo en los días con curso
                modifiersClassNames={{
                    tieneCurso: "rounded-md [&_button]:bg-navy [&_button]:text-white [&_button]:font-bold [&_button:hover]:bg-navy [&_button:hover]:text-white [&_button[data-selected-single=true]]:bg-navy [&_button]:cursor-pointer [&_button]:focus:outline-none [&_button]:focus:ring-0 [&_button]:focus-visible:ring-0",
                }}
            />
            <CalendarEventsModal open={openModal} onOpenChange={handleOpenChange} events={selectedEvents} />
        </>
    )
}