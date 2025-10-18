import React, { useState } from "react";
import type { IParentTopic } from "../../types/topics/IParentTopic";
import { Link } from "react-router";

interface Props {
    topic: IParentTopic;
}

const TopicSideBarRow: React.FC<Props> = ({ topic }) => {
    const { name } = topic;
    const [isCollapse, setIsCollapse] = useState(false);

    const toggleCollapse = () => {
        setIsCollapse(!isCollapse);
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-2 transition-all duration-300">
            <button
                type="button"
                onClick={toggleCollapse}
                className={`flex items-center justify-between w-full p-4 font-medium text-gray-800 dark:text-gray-200 
        bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 
        transition-all duration-300 focus:outline-none text-left`}
            >
                <span className="flex-1">
                    {name}
                </span>

                <svg
                    className={`w-4 h-4 text-gray-600 dark:text-gray-300 transform transition-transform duration-300 flex-shrink-0 ${
                        isCollapse ? "" : "rotate-180"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5L5 1 1 5"
                    />
                </svg>
            </button>

            <div
                className={`overflow-hidden transition-[max-height] duration-400 ease-in-out ${
                    isCollapse ? "max-h-96" : "max-h-0"
                }`}
            >
                <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                    {topic.children && topic.children.length > 0 ? (
                        <ul className="space-y-2">
                            {topic.children.map((child) => (
                                <li key={child.id}>
                                    <Link
                                        to={`/topics/${child.url_slug}`}
                                        className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 transition-all duration-200 text-left"
                                    >
                                        {child.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm text-left block">
                          Немає підтем
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopicSideBarRow;