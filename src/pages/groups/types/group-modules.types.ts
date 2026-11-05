type Status = "Active" | "Finished";

export interface Group {
    id: number;
    diplomaId: number;
    code: number;
    status: Status;
}

export interface GroupsResponse {
    data: Group[];
}

export interface Module {
    id: number;
    diplomaId: number;
    number: number;
    name: string;
}

export interface GroupModules {
    id: number;
    group: Group;
    modules: Module[];
    professorId: number;
    startDate: string;
    endDate: string;
    regularStudentsCount: number;
    repeatingStudentsCount: number;
    totalStudentsCount: number;
}

export interface GroupModulesResponse {
    data: GroupModules[];
}