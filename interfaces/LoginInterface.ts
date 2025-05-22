import { UserDAO } from './UserInterface';

export interface LoginDTO {
    password: string;
    username: string;
}

export interface LoginDAO {
    data: {
        token: string;
        user: UserDAO;
    }
    status: string;
    message: string;
}