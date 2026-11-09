import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";
import type { GroupModule } from "../types/group-modules.types";

interface Props {
    theme: DiplomaTheme;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    module: GroupModule;
}

export function CheckModuleModal({ open, onOpenChange, theme, module }: Props) {
    console.log(module);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>
                        Verificar módulo {module.number}
                    </DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <p className="text-center">Verificar lista</p>
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`} size="xs">Guardar</Button>
                    <DialogClose render={<Button variant="outline" className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`} size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
