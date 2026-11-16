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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddSchedulingForm } from "../hooks/useAddSchedulingForm";
import type { Diploma } from "@/pages/diplomas/types/diploma.types";
import type { Module } from "@/pages/groups/types/group-modules.types";
import type { Professor } from "@/pages/professors/types/professor.types";
import type { Scheduling, CreateSchedulingPayload } from "../types/scheduling.types";
import axios from "axios";

interface Props {
    open: boolean;
    diplomas: Diploma[];
    modules: Module[];
    professors: Professor[];
    saving: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (data: CreateSchedulingPayload) => Promise<Scheduling>;
}

export function AddSchedulingModal({ open, onOpenChange, diplomas, modules, professors, saving, onCreate }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);
    const {
        form,
        errors,
        updateField,
        validateForm,
        resetForm
    } = useAddSchedulingForm();

    const diplomaItems = diplomas.map((diploma) => ({
        value: diploma.id,
        label: diploma.title
    }));
    const moduleItems = modules.filter((m) => m.diploma_id === form.diploma_id)
        .map((m) => ({
            value: m.id,
            label: `${m.number}. ${m.name}`,
        }));
    const professorItems = professors.map((professors) => ({
        value: professors.id,
        label: `${professors.last_name} ${professors.name}`,
    }));

    const handleClose = (nextOpen: boolean) => {
        if (!nextOpen && saving) return;
        if (!nextOpen) {
            resetForm();
            setServerError(null);
        }
        onOpenChange(nextOpen);
    };

    const handleSave = async () => {
        if (saving) return;
        const validatedData = validateForm();
        if (!validatedData) return;
        setServerError(null);
        try {
            await onCreate(validatedData);
            resetForm();
            onOpenChange(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setServerError(error.response?.data?.error || "Error al guardar la programación");
            } else {
                setServerError("Error al guardar la programación");
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-full sm:w-1/2 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl px-1 text-navy">Agregar Programación</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[90vh] overflow-y-auto px-1 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col col-span-2 gap-1 w-full">
                            <Label htmlFor="diploma" className="text-sm text-gray-500 font-medium">Diplomado</Label>
                            <Select
                                id="diploma"
                                items={diplomaItems}
                                value={form.diploma_id}
                                onValueChange={(value) => {
                                    updateField('diploma_id', Number(value));
                                }}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccione un diplomado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {diplomaItems.map((diploma) => (
                                        <SelectItem key={diploma.value} value={diploma.value} className="text-xs">{diploma.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.diploma_id && <p className="text-red-500 text-xs">{errors.diploma_id}</p>}
                        </div>
                        <div className="flex flex-col col-span-2 gap-1 w-full">
                            <Label htmlFor="module" className="text-sm text-gray-500 font-medium">Módulo</Label>
                            <Select
                                id="module"
                                items={moduleItems}
                                value={form.module_id}
                                onValueChange={(value) => updateField('module_id', Number(value))}
                                disabled={!form.diploma_id}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccione un módulo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {moduleItems.map((module) => (
                                        <SelectItem key={module.value} value={module.value} className="text-xs">{module.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.module_id && <p className="text-red-500 text-xs">{errors.module_id}</p>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="start_date" className="text-sm text-gray-500 font-medium">Inicio</Label>
                            <Input
                                id="start_date"
                                type="date"
                                className="text-xs h-7 border-gray-300"
                                value={form.start_date}
                                onChange={(e) => updateField('start_date', e.target.value)}
                            />
                            {errors.start_date && <p className="text-red-500 text-xs">{errors.start_date}</p>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="end_date" className="text-sm text-gray-500 font-medium">Termino</Label>
                            <Input
                                id="end_date"
                                type="date"
                                className="text-xs h-7 border-gray-300"
                                value={form.end_date}
                                onChange={(e) => updateField('end_date', e.target.value)}
                            />
                            {errors.end_date && <p className="text-red-500 text-xs">{errors.end_date}</p>}
                        </div>
                        <div className="flex flex-col col-span-2 gap-1 w-full">
                            <Label htmlFor="professor" className="text-sm text-gray-500 font-medium">Profesor</Label>
                            <Select
                                id="professor"
                                items={professorItems}
                                value={form.professor_id}
                                onValueChange={(value) => updateField('professor_id', Number(value))}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccione un profesor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {professorItems.map((professor) => (
                                        <SelectItem key={professor.value} value={professor.value} className="text-xs">{professor.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.professor_id && <p className="text-red-500 text-xs">{errors.professor_id}</p>}
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
                            variant="outline"
                            disabled={saving}
                            className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer">
                            Salir
                        </Button>}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
