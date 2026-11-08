import { api } from "@/services/api/axios";
import type * as GroupTypes from "../types/group-modules.types";

export const groupServices = {
    //All groups
    getGroups: async () => {
        const response = await api.get<GroupTypes.GroupsResponse>("/api/v1/groups");
        return response.data;
    },
    //Create a group with its modules
    createGroup: async (data: GroupTypes.CreateGroupPayload) => {
        const response = await api.post<GroupTypes.GroupResponse>("/api/v1/groups", data);
        return response.data;
    },
    // Groups by diploma
    getGroupsByDiploma: async (slug: string) => {
        const response = await api.get<GroupTypes.GroupsResponse>(`/api/v1/diplomas/${slug}`);
        return response.data;
    },

};