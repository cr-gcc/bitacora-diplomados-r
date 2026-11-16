export interface Scheduling {
    id: number;
    diploma_id: number;
    module_id: number;
    start_date: string;
    end_date: string;
    professor_id?: number;
}

export interface SchedulingResponse {
    data: Scheduling[];
}

export type CreateSchedulingPayload = Omit<Scheduling, "id">;