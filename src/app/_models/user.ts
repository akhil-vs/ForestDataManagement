import { Role } from "./role";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    token?: string;
}

export interface newUser {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: string
}