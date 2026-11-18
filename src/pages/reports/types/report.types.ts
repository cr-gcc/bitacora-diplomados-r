export interface RowData {
    id: string;
    diploma: string;
    slug: string;
    code: string;
    number: number;
    name: string;
    professor: string
    start_date: string;
    end_date: string;
    regular_students: number;
    repeating_students: number;
    total_students: number;
}

export interface ReportResponse {
    data: RowData[];
}

export interface ReportFilters {
    diploma_id?: number;
    code?: string;
    start_date?: string;
    end_date?: string;
}