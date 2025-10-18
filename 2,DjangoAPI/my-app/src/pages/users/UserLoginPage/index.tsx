import React from "react";
import LoginForm from "../../../components/forms/LoginForm.tsx";


const UserLoginPage: React.FC = () => {
    return (
        <div className={"p-[20px] min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"}>
            <div
                style={{
                    maxWidth: 900,
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
            >
                <div className={"grid grid-cols-2"}>
                    <div className={"bg-[#1677ff] px-[60px] py-[40px]"}>
                        <span className={"text-4xl text-white"}>
                            Welcome!
                        </span>
                    </div>
                    <div className={"p-[40px]"}>
                        <div style={{ textAlign: "center", marginBottom: 24 }}>
                            <p className={"text-3xl font-bold"}>
                                Login
                            </p>
                            <p>Enter your information to login</p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;