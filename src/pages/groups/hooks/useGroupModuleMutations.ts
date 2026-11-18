import { useState } from "react";
import { moduleService } from "@pages/groups/services/moduleService";
import type { EditBasicModulePayload, CheckModulePayload } from "../types/group-modules.types";

export function useGroupModuleMutations(onSuccess?: () => Promise<void>) {
    const [saving, setSaving] = useState(false);

    const runOnSuccess = async () => {
        try {
            await onSuccess?.();
        } catch (err) {
            console.error("El cambio se guardó, pero falló la recarga:", err);
        }
    };

    const editModule = async (data: EditBasicModulePayload): Promise<void> => {
        setSaving(true);
        try {
            await moduleService.editBasicModule(data);
        } finally {
            setSaving(false);
        }
        void runOnSuccess();
    };

    const checkModule = async (data: CheckModulePayload): Promise<void> => {
        setSaving(true);
        try {
            await moduleService.checkModule(data);
        } finally {
            setSaving(false);
        }
        void runOnSuccess();
    };

    return {
        editModule,
        checkModule,
        saving,
    };
}
