export interface User {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    [key: string]: any; // Allow extensibility
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}
