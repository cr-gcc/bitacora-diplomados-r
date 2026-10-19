import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ProgressBar } from "@components/layouts/components/loading/ProgressBar";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CheckModuleModal({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl text-pink-950">Verificar Módulo</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <p className="text-center">¿Desea verificar este módulo de forma permanente?</p>
                </div>
                <div>
                    <ProgressBar />
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button className="bg-pink-950 text-xs text-white hover:bg-pink-950/90 hover:text-white cursor-pointer" size="xs">Guardar</Button>
                    <DialogClose render={<Button variant="outline" className="bg-pink-950 text-xs text-white hover:bg-pink-950/90 hover:text-white cursor-pointer" size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
