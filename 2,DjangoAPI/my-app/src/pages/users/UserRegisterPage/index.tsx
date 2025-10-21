import React from "react";
import RegisterForm from "../../../components/forms/RegisterForm";

const UserRegisterPage: React.FC = () => {
    return (
        <div className="p-5 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-[900px] w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-800">
                <div className="grid md:grid-cols-2">
                    <div className="bg-purple-600 p-10 hidden md:flex flex-col justify-center">
                        <h2 className="text-white text-3xl font-semibold mb-4">Welcome!</h2>
                        <p className="text-white text-lg">
                            Sign up to have fun.
                        </p>
                    </div>

                    <div className="p-6 md:p-10 flex flex-col justify-center">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-semibold mb-1">Register</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Enter your information to register
                            </p>
                        </div>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegisterPage;
