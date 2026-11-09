export type GroupStatus = "active" | "finished";

// Group
export interface Group {
    id: number;
    diploma_id: number;
    code: string;
    status: GroupStatus | string;
}

// Modules
export interface Module {
    id: number;
    diploma_id: number;
    number: number;
    name: string;
}

// Module belonging to a group
export interface GroupModule {
    id: number;
    group_id?: number;
    module_id: number;
    professor_id?: number | null;
    number: number;
    name: string;
    start_date: string | null;
    end_date: string | null;
    regular_students: number;
    repeating_students: number;
    total_students: number;
    professor: {
        id: number;
        name: string;
        last_name: string;
    } | null;
}

// Group with all its modules
export interface GroupWithModules extends Group {
    modules: GroupModule[];
}

// Diploma with its groups and modules
export interface DiplomaWithGroups {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    public_url: string | null;
    groups: GroupWithModules[];
}

// Payload for creating a group
export interface CreateGroupPayload {
    diploma_id: number;
    code: number;
}

// Response for API GET groups
export interface GroupsResponse {
    data: GroupWithModules[];
}

// Response for API GET diploma with groups
export interface DiplomaGroupsResponse {
    data: DiplomaWithGroups;
}

// Response for API GET single group
export interface GroupResponse {
    data: GroupWithModules;
}
