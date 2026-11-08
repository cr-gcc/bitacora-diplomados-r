export type GroupStatus = "Active" | "Finished";
//Group
export interface Group {
    id: number;
    diplomaId: number;
    code: number;
    status: GroupStatus;
}
//Modules
export interface Module {
    id: number;
    diplomaId: number;
    number: number;
    name: string;
}
//Module beloning to a group
export interface GroupModule {
    id: number;
    groupId: number;
    moduleId: number;
    professorId: number | null;
    startDate: string | null;
    endDate: string | null;
    regularStudentsCount: number;
    repeatingStudentsCount: number;
    totalStudentsCount: number;
}
//Group with all its modules
export interface GroupWithModules extends Group {
    groupModules: GroupModule[];
}
//Payload for creating a group
export interface CreateGroupPayload {
    diplomaId: number;
    code: number;
}
//Response for API GET
export interface GroupsResponse {
    data: GroupWithModules[];
}
//Response for API GET single group
export interface GroupResponse {
    data: GroupWithModules;
}