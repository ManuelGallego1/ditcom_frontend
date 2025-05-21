export interface DefaultInterfaceResponse<T = any> {
    data: T | null;
    status: number;
    message: string | null;
    error: string | null;
}