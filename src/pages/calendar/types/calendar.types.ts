import type { GroupsDates } from "@/pages/dashboard/types/dashboard.types";

export interface CalendarEvent extends GroupsDates {
    calendar_date: Date;
}
