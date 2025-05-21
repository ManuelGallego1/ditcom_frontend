import { UserLoginDAO } from './UserInterface';

export interface LoginDTO {
    password: string;
    username: string;
}

export interface LoginDAO {
    data: {
        token: string;
        user: UserLoginDAO;
    }
    status: string;
    message: string;
}