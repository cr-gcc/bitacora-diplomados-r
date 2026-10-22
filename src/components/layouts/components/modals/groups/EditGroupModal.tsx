import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ProgressBar } from "@components/layouts/components/loading/ProgressBar";
import type { DiplomaTheme } from "@components/layouts/types/navigation/diploma.types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    theme: DiplomaTheme;
}

export function EditGroupModal({ open, onOpenChange, theme }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>Editar Grupo</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <Input className="h-7" placeholder="Ejemplo 9401" />
                </div>
                <div>
                    <ProgressBar />
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`} size="xs">Guardar</Button>
                    <DialogClose render={<Button variant="outline" className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`} size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
