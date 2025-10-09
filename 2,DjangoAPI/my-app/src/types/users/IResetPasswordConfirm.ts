export interface IResetPasswordConfirm {
    uid: string;
    token: string;
    new_password: string;
    confirm_password: string;
}