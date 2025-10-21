import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { useRegisterMutation } from "../../services/userService.ts";
import { setTokens } from "../../store/authSlice.ts";
import InputField from "../inputs/InputField.tsx";
import BaseButton from "../buttons/BaseButton.tsx";
import ImageUploader from "../uploaders/ImagesUploader.tsx";
import type { IUserRegister } from "../../types/users/IUserRegister.ts";
import type { UploadFile } from "antd/es/upload/interface";

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [register, { isLoading }] = useRegisterMutation();
    const [formValues, setFormValues] = useState<IUserRegister>({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        image: null,
        recaptcha_token: undefined,
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter((x) => x !== fieldKey));
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors((state) => [...state, fieldKey]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (fileList.length === 0 || !fileList[0]?.originFileObj) {
            setImageError(true);
            return;
        }

        if (!executeRecaptcha) return;
        const token = await executeRecaptcha("register");

        const payload: IUserRegister = {
            ...formValues,
            image: fileList[0].originFileObj,
            recaptcha_token: token,
        };

        try {
            const result = await register(payload).unwrap();
            dispatch(setTokens(result));
            navigate("/");
        } catch (err: any) {
            console.error(err?.data?.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="First name"
                    name="first_name"
                    placeholder="Pedro"
                    value={formValues.first_name}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[{ rule: "required", message: "First name is required" }]}
                />

                <InputField
                    label="Last name"
                    name="last_name"
                    placeholder="Timchuk"
                    value={formValues.last_name}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[{ rule: "required", message: "Last name is required" }]}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    label="Email"
                    name="email"
                    placeholder="pedro@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[
                        { rule: "required", message: "Email is required" },
                        { rule: "regexp", value: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', message: "Email is invalid" },
                    ]}
                />
            </div>

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

            <div className="w-full text-center">
                <ImageUploader
                    fileList={fileList}
                    setFileList={setFileList}
                    imageError={imageError}
                    setImageError={setImageError}
                />
                {imageError && <p className="text-red-500 text-sm mt-1">Image is required</p>}
            </div>

            <BaseButton type="submit" className="w-full rounded-xl !bg-purple-500 dark:!bg-gray-900 text-white font-medium py-2">
                {isLoading ? "Loading..." : "Register"}
            </BaseButton>
        </form>
    );
};

export default RegisterForm;
