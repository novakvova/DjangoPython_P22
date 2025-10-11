export interface ILoginRequest {
    username: string;
    password: string;
    recaptcha_token?: string;
}