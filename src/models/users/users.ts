export type UserAccount = {
    id: string;
    githubId?: string;
    creationDate?: number;
    lastUpdate?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    z?: string;
    street: string;
    addressNumber?: string;
    location: string;
}

export type UserChangePassword = {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}

export type UserPost = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export type UserEdit = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export type UserDelete = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
}


/* AUTH  */
export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    lastUpdate?: number;
    creationDate?: number;

}
export const initLoginForm: UserLogin = {
    email: '',
    password: '',
}

export const initRegisterForm: UserRegister = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    creationDate: 0,
    lastUpdate: 0,
}


export const initUserChangePassword: UserChangePassword = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
}