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
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";

interface Props {
    theme: DiplomaTheme;
    open: boolean;
    code: string;
    group_id: number;
    saving: boolean;
    onDelete: (group_id: number) => Promise<void>;
    onOpenChange: (open: boolean) => void;
}

export function DeleteGroupModal({ open, onOpenChange, theme, code, group_id, saving, onDelete }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setServerError(null);
        if (saving) return;
        try {
            await onDelete(group_id);
            onOpenChange(false);
        } catch (error) {
            setServerError(error as string);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>
                        Eliminar grupo {code}
                    </DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <p>¿Desea eliminar este grupo de forma permanente?</p>
                    {serverError && (
                        <span className="text-red-500 text-xs">{serverError}</span>
                    )}
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button
                        size="xs"
                        disabled={saving}
                        className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                        onClick={handleSubmit}
                    >
                        {saving ? "Eliminando..." : "Eliminar"}
                    </Button>
                    <DialogClose render={
                        <Button
                            size="xs"
                            variant="outline"
                            disabled={saving}
                            className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                        >
                            Salir
                        </Button>}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
