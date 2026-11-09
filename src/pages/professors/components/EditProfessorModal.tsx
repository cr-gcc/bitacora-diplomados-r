import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Professor, UpdateProfessorPayload } from "../types/professor.types";
import { useEditProfessorForm } from "../hooks/useEditProfessorForm";
import axios from "axios";

interface Props {
    professor: Professor;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: (
        id: number,
        data: UpdateProfessorPayload
    ) => Promise<Professor>;
    saving: boolean;
}

export function EditProfessorModal({ professor, open, onOpenChange, onUpdate, saving }: Props) {
    const {
        form,
        errors,
        updateField,
        validateForm,
    } = useEditProfessorForm(professor);

    const [serverError, setServerError] = useState<string | null>(null);

    const handleSave = async () => {
        if (saving) return;
        const validatedData = validateForm();
        if (!validatedData) return;
        setServerError(null);
        try {
            await onUpdate(professor.id, validatedData);
            onOpenChange(false);
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 422
            ) {
                setServerError(
                    "Verifica los datos. Algún campo es inválido o ya está registrado."
                );
                return;
            }
            setServerError(
                "No fue posible actualizar al profesor."
            );
        }
    };

    const handleClose = (nextOpen: boolean) => {
        if (!nextOpen && saving) return;
        if (!nextOpen) {
            setServerError(null);
        }
        onOpenChange(nextOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-full sm:w-1/2 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl px-1 text-navy">Editar Profesor</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[90vh] overflow-y-auto px-1 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="name" className="text-sm text-gray-500 font-medium">Nombre</Label>
                            <Input
                                id="name"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">{errors.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="last_name" className="text-sm text-gray-500 font-medium">Apellidos</Label>
                            <Input
                                id="last_name"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.last_name}
                                onChange={(e) => updateField("last_name", e.target.value)}
                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-xs">{errors.last_name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="email" className="text-sm text-gray-500 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="rfc" className="text-sm text-gray-500 font-medium">RFC</Label>
                            <Input
                                id="rfc"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.rfc}
                                onChange={(e) => updateField("rfc", e.target.value)}
                            />
                            {errors.rfc && (
                                <p className="text-red-500 text-xs">{errors.rfc}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="user" className="text-sm text-gray-500 font-medium">Usuario</Label>
                            <Input
                                id="user"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.user}
                                onChange={(e) => updateField("user", e.target.value)}
                            />
                            {errors.user && (
                                <p className="text-red-500 text-xs">{errors.user}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="status" className="text-sm text-gray-500 font-medium">Estatus</Label>
                            <Select
                                id="status"
                                items={[
                                    { label: "Activo", value: true },
                                    { label: "Inactivo", value: false },
                                ]}
                                value={form.active}
                                onValueChange={(value) => {
                                    if (value !== null) {
                                        updateField("active", value);
                                    }
                                }}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300 data-[size=sm]:h-7" size="sm">
                                    <SelectValue placeholder="Seleccionar estatus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={true} className="text-xs">Activo</SelectItem>
                                    <SelectItem value={false} className="text-xs">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                {serverError && (
                    <div className="mb-2">
                        <span className="text-red-500 text-xs">{serverError}</span>
                    </div>
                )}
                <DialogFooter className="w-full gap-x-1">
                    <Button
                        size="xs"
                        disabled={saving}
                        className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        onClick={handleSave}
                    >
                        {saving ? "Guardando..." : "Guardar"}
                    </Button>
                    <DialogClose render={
                        <Button
                            size="xs"
                            disabled={saving}
                            variant="outline"
                            className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        >
                            Salir
                        </Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
