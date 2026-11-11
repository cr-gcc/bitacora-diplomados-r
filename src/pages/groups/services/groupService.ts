import { api } from "@/services/api/axios";
import type * as GroupTypes from "../types/group-modules.types";

export const groupServices = {
    //All groups
    getGroups: async (signal?: AbortSignal) => {
        const response = await api.get<GroupTypes.GroupsResponse>(
            "/api/v1/groups",
            { signal }
        );
        return response.data;
    },
    //Create a group with its modules
    createGroup: async (
        data: GroupTypes.CreateGroupPayload,
        signal?: AbortSignal
    ) => {
        const response = await api.post<GroupTypes.GroupResponse>(
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
        const response = await api.get<GroupTypes.DiplomaGroupsResponse>(
            `/api/v1/diplomas/${slug}`,
            { signal }
        );
        return response.data;
    },
    //Update a group status
    updateGroupStatus: async (
        data: GroupTypes.UpdateGroupStatusPayload,
        signal?: AbortSignal
    ) => {
        const response = await api.patch<GroupTypes.GroupResponse>(
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
        const response = await api.delete<GroupTypes.GroupResponse>(
            `/api/v1/groups/${id}`,
            { signal }
        );
        return response.data;
    },
};