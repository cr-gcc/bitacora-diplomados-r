import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";
import type { GroupModule, EditBasicModulePayload } from "../types/group-modules.types";
import type { Professor } from "@/pages/professors/types/professor.types";
import axios from "axios";

interface Props {
    theme: DiplomaTheme;
    open: boolean;
    module: GroupModule;
    professors: Professor[];
    saving: boolean;
    onEditModule: (data: EditBasicModulePayload) => Promise<void>;
    onOpenChange: (open: boolean) => void;
}

export function EditModuleModal({ open, onOpenChange, theme, module, professors, saving, onEditModule }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [start_date, setStartDate] = useState(module.start_date ?? "");
    const [end_date, setEndDate] = useState(module.end_date ?? "");
    const [professor_id, setProfessorId] = useState<number | null>(
        module.professor?.id ?? null
    );

    const professorItems = professors.map((professor) => ({
        value: professor.id,
        label: `${professor.last_name} ${professor.name}`,
    }));
    const form = {
        id: module.id,
        professor_id: professor_id,
        start_date: start_date,
        end_date: end_date
    }

    const handleSubmit = async () => {
        if (saving) return;
        setServerError(null);
        try {
            await onEditModule(form);
            onOpenChange(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
                setServerError("Verifica los datos. El módulo es inválido.");
                return;
            }
            setServerError("No fue posible editar la información del módulo.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/2 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>
                        Editar módulo {module.number}
                    </DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="inicio" className="text-sm text-gray-500 font-medium">Inicio</Label>
                            <Input
                                id="inicio"
                                type="date"
                                className="text-xs h-7 border-gray-300"
                                value={start_date}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="fin" className="text-sm text-gray-500 font-medium">Termino</Label>
                            <Input
                                id="fin"
                                type="date"
                                className="text-xs h-7 border-gray-300"
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full col-span-2">
                            <Label htmlFor="profesor" className="text-sm text-gray-500 font-medium">Profesor</Label>
                            <Select
                                id="profesor"
                                items={professorItems}
                                value={professor_id}
                                onValueChange={setProfessorId}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccionar profesor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {professors.map((professor) => (
                                        <SelectItem key={professor.id} value={professor.id} className="text-xs">
                                            {professor.last_name} {professor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
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
                        </Button>}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
