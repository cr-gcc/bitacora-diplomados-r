import { useState } from "react"
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
import type { CreateGroupPayload } from "../types/group-modules.types";
import axios from "axios";

interface Props {
    theme: DiplomaTheme;
    open: boolean;
    diploma_id: number;
    saving: boolean;
    onCreate: (data: CreateGroupPayload) => Promise<void>;
    onOpenChange: (open: boolean) => void;
}

export function CreateGroupModal({ open, onOpenChange, theme, diploma_id, onCreate, saving }: Props) {
    const [code, setCode] = useState("");
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (saving) return;
        const parsedCode = Number(code.trim());
        if (!code.trim() || !Number.isInteger(parsedCode)) {
            setServerError("Introduce un número de grupo válido.");
            return;
        }
        setServerError(null);
        try {
            await onCreate({ diploma_id, code: parsedCode });
            onOpenChange(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
                setServerError("Verifica los datos. El grupo es inválido o ya está registrado.");
                return;
            }
            setServerError("No fue posible crear el grupo.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>Crear Grupo</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <Input
                        className="h-7"
                        placeholder="Ejemplo 9401"
                        inputMode="numeric"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
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
                        {saving ? "Guardando..." : "Guardar"}
                    </Button>
                    <DialogClose render={
                        <Button
                            size="xs"
                            variant="outline"
                            disabled={saving}
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
