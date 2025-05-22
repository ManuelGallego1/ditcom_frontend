export interface DefaultInterfaceResponse<T = any> {
    data: T | null;
    status: number;
    message: string | null;
    errors: Record<string, string[]> | null;
    current_page: number | null;
    next_page_url: string | null;
    path: string | null;
    per_page: number | null;
    prev_page_url: string | null;
    last_page: number | null;
    to: number | null;
    total: number | null;
}