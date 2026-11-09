export interface Diploma {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    public_url: string | null;
}

export interface DiplomaResponse {
    data: Diploma[];
}