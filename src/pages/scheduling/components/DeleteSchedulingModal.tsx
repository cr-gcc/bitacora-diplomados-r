import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface Props {
    open: boolean;
    saving: boolean;
    scheduling_id: number;
    onDelete: (scheduling_id: number) => Promise<void>;
    onOpenChange: (open: boolean) => void;
}

export function DeleteSchedulingModal({ open, onOpenChange, scheduling_id, saving, onDelete }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);

    const handleClose = (nextOpen: boolean) => {
        if (!nextOpen && saving) return;
        onOpenChange(nextOpen);
    };

    const handleSubmit = async () => {
        setServerError(null);
        if (saving) return;
        try {
            await onDelete(scheduling_id);
            onOpenChange(false);
        } catch (error) {
            setServerError("Error al eliminar la programación");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl text-navy">
                        Eliminar programación
                    </DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <p>¿Desea eliminar esta programación de forma permanente?</p>
                    {serverError && (
                        <span className="text-red-500 text-xs">{serverError}</span>
                    )}
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button
                        size="xs"
                        disabled={saving}
                        className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        onClick={handleSubmit}
                    >
                        {saving ? "Eliminando..." : "Eliminar"}
                    </Button>
                    <DialogClose render={
                        <Button
                            size="xs"
                            variant="outline"
                            disabled={saving}
                            className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        >
                            Cancelar
                        </Button>}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
