export interface Scheduling {
    id: number;
    diploma_id: number;
    module_id: number;
    start_date: string;
    end_date: string;
    professor_id?: number;
    diploma?: {
        id: number;
        title: string;
        slug?: string;
    };
    module?: {
        id: number;
        number: number;
        name: string;
    };
    professor?: {
        id: number;
        name: string;
        last_name: string;
    } | null;
}

export interface SchedulingResponse {
    data: Scheduling[];
}

export type CreateSchedulingPayload = Omit<
    Scheduling,
    "id" | "diploma" | "module" | "professor"
>;