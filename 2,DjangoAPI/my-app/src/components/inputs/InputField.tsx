import React, {useEffect, useState} from "react";
import {type FormFieldRule, validate} from "../../utils/validations";

interface InputFieldProps {
    name: string;
    label: string;
    otherStyles?: string;
    type?: "text" | "email" | "password";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rules?: FormFieldRule[],
    onValidationChange?: (isValid: boolean, key: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   otherStyles,
                                                   name,
                                                   label,
                                                   type = "text",
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                   rules,
                                                   onValidationChange,
                                               }) => {

    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(()=>{
        if(value)
            validateField(value)
    }, [rules]);

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange)
            onChange(e);
        validateField(e.target.value);
    }

    const validateField =(value:string) =>{
        const error: string | undefined = validate(value, rules);
        if (onValidationChange) {
            onValidationChange(!error, name);
        }
        setErrorMessage(error)
    }

    return (
        <div className={`w-full mb-5 ${otherStyles}`}>
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={isPasswordField && showPassword ? "text" : type}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={onTextChange}
                />

                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.624-7a9.978 9.978 0 012.228-3.357m3.174-2.2A9.959 9.959 0 0112 5c4.478 0 8.268 2.943 9.624 7a9.978 9.978 0 01-2.228 3.357M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .513-.123.996-.341 1.42M6.1 6.1A9.956 9.956 0 002 12c1.356 4.057 5.146 7 9.624 7a9.956 9.956 0 005.9-1.9M15.88 15.88A3 3 0 0012 15c-1.657 0-3-1.343-3-3 0-.513.123-.996.341-1.42"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {errorMessage && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400"
                     role="alert">
                    <span className="font-medium">{errorMessage}</span>
                </div>
            )}
        </div>
    );
};

export default InputField;