import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GroupCalendarTable } from "../../tables/GroupCalendarTable";

export interface Evento {
    id: number;
    diploma: string;
    groupNum: string;
    module: string;
    title: string;
    professor: string;
    fecha: Date;
    start: string;
    end: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    events: Evento[];
}

export function CalendarEventsModal({ open, onOpenChange, events }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-5/6 sm:max-w-none px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl text-navy">Cursos</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <GroupCalendarTable groups={events} />
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <DialogClose render={<Button variant="outline" className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer" size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}