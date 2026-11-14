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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";
import type { GroupStatus, UpdateGroupStatusPayload } from "../types/group-modules.types";
import { GROUP_STATUS_OPTIONS } from "../config/groupStatus";

interface Props {
    theme: DiplomaTheme;
    open: boolean;
    code: string;
    group_id: number;
    status: GroupStatus | string;
    saving: boolean;
    onUpdateStatus: (data: UpdateGroupStatusPayload) => Promise<void>;
    onOpenChange: (open: boolean) => void;
}

export function UpdateGroupModal({ open, onOpenChange, theme, group_id, code, onUpdateStatus, saving, status: initialStatus }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [status, setStatus] = useState<GroupStatus | null>(
        GROUP_STATUS_OPTIONS.some((option) => option.value === initialStatus)
            ? (initialStatus as GroupStatus)
            : null
    );

    const handleSubmit = async () => {
        setServerError(null);
        if (saving) return;
        try {
            if (!status) {
                setServerError("Debe seleccionar un estado");
                return;
            }
            await onUpdateStatus({ id: group_id, status });
            onOpenChange(false);
        } catch (error) {
            setServerError("Error al actualizar el grupo");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className={`text-xl ${theme.textColor}`}>
                        Actualizar grupo {code}
                    </DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <Select
                        id="status"
                        items={GROUP_STATUS_OPTIONS}
                        value={status}
                        onValueChange={setStatus}
                    >
                        <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {GROUP_STATUS_OPTIONS.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    className="text-xs"
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                        {saving ? "Actualizando..." : "Actualizar"}
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
