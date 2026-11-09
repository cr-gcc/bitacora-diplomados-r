import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    theme: DiplomaTheme;
}

export function CreateGroupModal({ open, onOpenChange, theme }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>Crear Grupo</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <Input className="h-7" placeholder="Ejemplo 9401" />
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button
                        size="xs"
                        className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                    >
                        Guardar
                    </Button>
                    <DialogClose render={
                        <Button
                            size="xs"
                            variant="outline"
                            className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                        >
                            Salir
                        </Button>
                    } />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
