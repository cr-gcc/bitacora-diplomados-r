export { cn } from "cn"
import { format, isValid, parseISO } from "date-fns"
import { es } from "date-fns/locale"

/**
 * Crea una fecha en la que el mes se especifica de forma natural (base 1):
 * 1 = Enero, 2 = Febrero, ..., 10 = Octubre, 11 = Noviembre, 12 = Diciembre
 */
export function createDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day)
}

export const crearFecha = createDate

/**
 * Formatea un rango de fechas en español:
 * - Mismo mes y año: "19 al 25 de octubre de 2026"
 * - Diferente mes, mismo año: "28 de septiembre al 4 de octubre de 2026"
 * - Diferente año: "7 de diciembre del 2026 al 28 de enero de 2027"
 */
export function formatDateRange(start: Date, end: Date): string {
    const startDay = start.getDate()
    const endDay = end.getDate()
    const startMonth = format(start, "MMMM", { locale: es })
    const endMonth = format(end, "MMMM", { locale: es })
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()

    if (startYear === endYear) {
        if (start.getMonth() === end.getMonth()) {
            return `${startDay} al ${endDay} de ${endMonth} de ${endYear}`
        }
        return `${startDay} de ${startMonth} al ${endDay} de ${endMonth} de ${endYear}`
    }

    return `${startDay} de ${startMonth} del ${startYear} al ${endDay} de ${endMonth} de ${endYear}`
}

export const formatWeekRange = formatDateRange

/**
 * Formatea una fecha (string ISO o Date) al formato "23-Nov-2026".
 * Si es nula o inválida, retorna el fallback ("-" por defecto).
 */
export function formatShortDate(
    dateInput: string | Date | null | undefined,
    fallback = "-"
): string {
    if (!dateInput) return fallback
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput
    if (!isValid(date)) return fallback

    const day = format(date, "dd")
    const month = format(date, "MMM", { locale: es }).replace(".", "")
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
    const year = format(date, "yyyy")

    return `${day}-${capitalizedMonth}-${year}`
}


