export interface IUserRegister {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    image?: File | null;
    recaptcha_token?: string;
}