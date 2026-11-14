import { api } from "@/services/api/axios";
import type * as GroupModulesTypes from "../types/group-modules.types";

export const moduleService = {
    //Update Basic Module
    editBasicModule: async (
        data: GroupModulesTypes.EditBasicModulePayload,
        signal?: AbortSignal
    ) => {
        const response = await api.patch<GroupModulesTypes.Module>(
            `/api/v1/group-modules/${data.id}`,
            data,
            { signal }
        );
        return response.data;
    },

    //Check Module Review
    checkModule: async (
        data: GroupModulesTypes.CheckModulePayload,
        signal?: AbortSignal
    ) => {
        const response = await api.patch<GroupModulesTypes.Review>(
            `/api/v1/module-review/${data.id}`,
            data,
            { signal }
        );
        return response.data;
    }
};