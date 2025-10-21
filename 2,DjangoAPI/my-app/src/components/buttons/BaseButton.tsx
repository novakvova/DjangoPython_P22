import React from "react";

interface BaseButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    id?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
                                                   children,
                                                   onClick,
                                                   className,
                                                   type = "button",
                                                   disabled = false,
                                                   id
                                               }) => {
    return (
        <button
            id={id}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`bg-white text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 
                       dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-white
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};

export default BaseButton;
