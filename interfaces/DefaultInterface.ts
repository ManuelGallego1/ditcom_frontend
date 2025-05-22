export interface DefaultInterfaceResponse<T = any> {
    data: T | null;
    status: number;
    message: string | null;
    errors: Record<string, string[]> | null;
}

export interface PaginatedData<T = any> {
    current_page: number | null;
    next_page_url: string | null;
    path: string | null;
    per_page: number | null;
    prev_page_url: string | null;
    to: number | null;
    total: number | null;
    data: T[];
}
