import React from "react";
import ImageUploader from "../../../components/ImageUploader";

const RegisterForm: React.FC = () => {
    return (
        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
            </div>

            <div>
                <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                        <label className="text-xs font-semibold px-1">First name</label>
                        <input
                            type="text"
                            className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="John"
                        />
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                        <label className="text-xs font-semibold px-1">Last name</label>
                        <input
                            type="text"
                            className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Smith"
                        />
                    </div>
                </div>

                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <label className="text-xs font-semibold px-1">Email</label>
                        <input
                            type="email"
                            className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="johnsmith@example.com"
                        />
                    </div>
                </div>

                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <label className="text-xs font-semibold px-1">Password</label>
                        <input
                            type="password"
                            className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="********"
                        />
                    </div>
                </div>

                <ImageUploader />

                <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                            REGISTER NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserRegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-4xl">
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                        <h2 className="text-white font-bold text-2xl">Welcome!</h2>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default UserRegisterPage;