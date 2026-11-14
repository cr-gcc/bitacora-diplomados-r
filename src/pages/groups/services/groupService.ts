import { api } from "@/services/api/axios";
import type * as GroupModulesTypes from "../types/group-modules.types";

export const groupServices = {
    //All groups
    getGroups: async (signal?: AbortSignal) => {
        const response = await api.get<GroupModulesTypes.GroupsResponse>(
            "/api/v1/groups",
            { signal }
        );
        return response.data;
    },

    //Create a group with its modules
    createGroup: async (
        data: GroupModulesTypes.CreateGroupPayload,
        signal?: AbortSignal
    ) => {
        const response = await api.post<GroupModulesTypes.GroupResponse>(
            "/api/v1/groups",
            data,
            { signal }
        );
        return response.data;
    },

    // Groups by diploma
    getGroupsByDiploma: async (
        slug: string,
        signal?: AbortSignal
    ) => {
        const response = await api.get<GroupModulesTypes.DiplomaGroupsResponse>(
            `/api/v1/diplomas/${slug}`,
            { signal }
        );
        return response.data;
    },

    //Update a group status
    updateGroupStatus: async (
        data: GroupModulesTypes.UpdateGroupStatusPayload,
        signal?: AbortSignal
    ) => {
        const response = await api.patch<GroupModulesTypes.GroupResponse>(
            `/api/v1/groups/${data.id}`,
            data,
            { signal }
        );
        return response.data;
    },

    //Delete a group
    deleteGroup: async (
        id: number,
        signal?: AbortSignal
    ) => {
        const response = await api.delete<GroupModulesTypes.GroupResponse>(
            `/api/v1/groups/${id}`,
            { signal }
        );
        return response.data;
    },
};