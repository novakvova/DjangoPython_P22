import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useGoogleLogin } from "@react-oauth/google";

import { useLoginMutation, useLoginByGoogleMutation } from "../../services/userService.ts";
import { setTokens } from "../../store/authSlice.ts";
import InputField from "../inputs/InputField.tsx";
import BaseButton from "../buttons/BaseButton.tsx";
import type { ILoginRequest } from "../../types/users/ILoginRequest.ts";
import type { IGoogleLoginRequest } from "../../types/users/IGoogleLoginRequest.ts";

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [login, { isLoading, error: loginError }] = useLoginMutation();
    const [loginByGoogle, { isLoading: isGoogleLoading }] = useLoginByGoogleMutation();

    const [formValues, setFormValues] = useState<ILoginRequest>({
        username: "",
        password: "",
    });

    // console.log("Redux Error: ", loginError);

    const [errors, setErrors] = useState<string[]>([]);

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const model: IGoogleLoginRequest = { token: tokenResponse.access_token };
                const result = await loginByGoogle(model).unwrap();
                dispatch(setTokens(result));
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        },
    });

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter((x) => x !== fieldKey));
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors((state) => [...state, fieldKey]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!executeRecaptcha) return;

        const token = await executeRecaptcha("login");
        const payload: ILoginRequest = { ...formValues, recaptcha_token: token };

        // console.log(payload);

        try {
            const result = await login(payload).unwrap();
            dispatch(setTokens(result));
            navigate("/");
        } catch (err: any) {
            // console.log("Is a problem");
            console.error(err?.data?.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {loginError && (
                <>
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <span className="font-medium">Дані вказано не вірно</span>
                    </div>
                </>
            )}
            <InputField
                label="Username"
                name="username"
                placeholder="pedro"
                value={formValues.username}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Username is required" }]}
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="********"
                value={formValues.password}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Password is required" }]}
            />

            <Link
                to="/forgot-password"
                className="block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
                Forgot password?
            </Link>

            <BaseButton
                type="submit"
                className="w-full rounded-xl !bg-purple-500 dark:!bg-gray-900 text-white font-medium py-2"
            >
                {isLoading ? "Loading..." : "Login"}
            </BaseButton>

            <BaseButton
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    loginUseGoogle();
                }}
                className="w-full rounded-xl font-medium py-2"
            >
                {isGoogleLoading ? "Loading..." : "Login with Google"}
            </BaseButton>
        </form>
    );
};

export default LoginForm;
