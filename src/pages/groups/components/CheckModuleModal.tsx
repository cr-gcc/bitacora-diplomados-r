import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";
import type { Review, CheckModulePayload } from "../types/group-modules.types";
import { useCheckModuleForm } from "../hooks/useCheckModuleForm";
import axios from "axios";

interface Props {
    theme: DiplomaTheme;
    open: boolean;
    module_number: number;
    review: Review;
    saving: boolean;
    onCheckModule: (data: CheckModulePayload) => Promise<void>;
    onOpenChange: (open: boolean) => void;
}

export function CheckModuleModal({ open, onOpenChange, theme, module_number, review, saving, onCheckModule }: Props) {
    const { form, errors, updateField, validateForm } = useCheckModuleForm(review);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (saving) return;
        const validatedData = validateForm();
        if (!validatedData) return;
        setServerError(null);
        try {
            await onCheckModule(validatedData);
            onOpenChange(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
                setServerError("Verifica los datos. La revisión es inválida.");
                return;
            }
            setServerError("No fue posible guardar la revisión del módulo.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-xl px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>
                        Revisión módulo {module_number}
                    </DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[90vh] overflow-y-auto mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="" className="text-sm text-gray-500 font-medium">Revisión de fechas</Label>
                            <Switch
                                checked={form.dates_reviewed}
                                onCheckedChange={(checked) => updateField("dates_reviewed", checked)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="" className="text-sm text-gray-500 font-medium">Resolución de examen</Label>
                            <Switch
                                checked={form.exam_uploaded}
                                onCheckedChange={(checked) => updateField("exam_uploaded", checked)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="" className="text-sm text-gray-500 font-medium">Alumnos con grupo</Label>
                            <Switch
                                checked={form.group_with_students}
                                onCheckedChange={(checked) => updateField("group_with_students", checked)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="regular-students" className="text-sm text-gray-500 font-medium">Regulares</Label>
                            <Input
                                id="regular-students"
                                type="number"
                                className="text-xs h-7 border-gray-300"
                                value={form.regular_students}
                                onChange={(e) => updateField("regular_students", Number(e.target.value))}
                            />
                            {errors.regular_students && (
                                <p className="text-red-500 text-xs">{errors.regular_students}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="repeating-students" className="text-sm text-gray-500 font-medium">Recursadores</Label>
                            <Input
                                id="repeating-students"
                                type="number"
                                className="text-xs h-7 border-gray-300"
                                value={form.repeating_students}
                                onChange={(e) => updateField("repeating_students", Number(e.target.value))}
                            />
                            {errors.repeating_students && (
                                <p className="text-red-500 text-xs">{errors.repeating_students}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="total-students" className="text-sm text-gray-500 font-medium">Total</Label>
                            <Input
                                id="total-students"
                                type="number"
                                disabled
                                className="text-xs h-7 border-gray-300"
                                value={form.regular_students + form.repeating_students}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full md:col-span-3">
                            <Label htmlFor="observations" className="text-sm text-gray-500 font-medium">Observaciones</Label>
                            <Textarea
                                id="observations"
                                className="text-xs border-gray-300"
                                value={form.observations ?? ""}
                                onChange={(e) => updateField("observations", e.target.value)}
                            />
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
                        </Button>
                    } />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
