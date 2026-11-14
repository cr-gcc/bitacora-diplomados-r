import { useState } from "react";
import { moduleService } from "@pages/groups/services/moduleService";
import type { EditBasicModulePayload, CheckModulePayload } from "../types/group-modules.types";

export function useModules(onSuccess?: () => Promise<void>) {
    const [saving, setSaving] = useState(false);

    const editModule = async (data: EditBasicModulePayload): Promise<void> => {
        setSaving(true);
        try {
            await moduleService.editBasicModule(data);
            await onSuccess?.();
        } finally {
            setSaving(false);
        }
    };

    const checkModule = async (data: CheckModulePayload): Promise<void> => {
        setSaving(true);
        try {
            await moduleService.checkModule(data);
            await onSuccess?.();
        } finally {
            setSaving(false);
        }
    };

    return {
        editModule,
        checkModule,
        saving
    };
}