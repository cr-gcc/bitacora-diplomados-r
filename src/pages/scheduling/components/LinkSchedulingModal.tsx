import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressBar } from "@/components/layouts/components/loading/ProgressBar";
import { useGroupsByDiploma } from "../hooks/useGroupsByDiploma";
import type { Scheduling, LinkSchedulingPayload } from "../types/scheduling.types";
import axios from "axios";

interface Props {
    open: boolean;
    scheduling: Scheduling;
    saving: boolean;
    onOpenChange: (open: boolean) => void;
    onLink: (data: LinkSchedulingPayload) => Promise<void>;
}

export function LinkSchedulingModal({ open, scheduling, saving, onOpenChange, onLink }: Props) {
    const [groupId, setGroupId] = useState<number | null>(null);
    const [fieldError, setFieldError] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const { groups, loading, error } = useGroupsByDiploma(scheduling.diploma_id, open);

    const groupItems = groups.map((group) => ({
        value: group.id,
        label: group.code,
    }));

    const form: LinkSchedulingPayload = {
        id: scheduling.id,
        group_id: groupId as number,
    };

    const handleClose = (nextOpen: boolean) => {
        if (!nextOpen && saving) return;
        if (!nextOpen) {
            setGroupId(null);
            setFieldError(null);
            setServerError(null);
        }
        onOpenChange(nextOpen);
    };

    const handleSave = async () => {
        if (saving) return;
        if (!groupId) {
            setFieldError("Grupo es requerido");
            return;
        }
        setFieldError(null);
        setServerError(null);
        try {
            await onLink(form);
            setGroupId(null);
            onOpenChange(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setServerError(
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Error al guardar la programación"
                );
            } else {
                setServerError("Error al guardar la programación");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl text-navy">Vincular</DialogTitle>
                    <DialogDescription className="text-xs text-gray-500">
                        Asigna un grupo para vincularlo a este registro.
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mt-1">
                    <div className="flex flex-col col-span-2 gap-1 w-full mb-2">
                        <Select
                            id="grupo"
                            items={groupItems}
                            value={groupId}
                            onValueChange={(value) => {
                                setGroupId(value);
                                setFieldError(null);
                            }}
                        >
                            <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                <SelectValue placeholder="Seleccionar grupo" />
                            </SelectTrigger>
                            <SelectContent>
                                {groupItems.map((group) => (
                                    <SelectItem key={group.value} value={group.value} className="text-xs">
                                        {group.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {fieldError && <p className="text-red-500 text-xs">{fieldError}</p>}
                    </div>
                    <div className="text-justify">
                        {loading && <ProgressBar />}
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        {serverError && <p className="text-xs text-red-500">{serverError}</p>}
                    </div>
                </div>
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
                            className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        >
                            Salir
                        </Button>
                    } />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
