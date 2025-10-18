import { Spin } from "antd";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faComments,
    faCompass,
    // faChevronDown,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {useGetRootTopicsQuery} from "../../services/topicService.ts";
import TopicSideBarRow from "./TopicSideBarRow.tsx";

// const { Panel } = Collapse;

const TopicsSidebar: React.FC = () => {
    const { data: topics, isLoading, isError } = useGetRootTopicsQuery();
    const [collapsed, setCollapsed] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isError || !topics) {
        return (
            <div className="text-gray-600 dark:text-gray-400 p-4 bg-white dark:bg-gray-900 h-screen">
                Не вдалося завантажити топіки
            </div>
        );
    }

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <aside
            className={`h-screen left-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-800 overflow-y-auto px-3 py-4 transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"}`}
        >
            <div className="flex justify-end">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
                >
                    <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
                </button>
            </div>

            <nav className="space-y-1 mb-6">
                <Link
                    to="/"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <FontAwesomeIcon icon={faHouse} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Home</span>}
                </Link>

                <Link
                    to="/popular"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Popular</span>}
                </Link>

                <Link
                    to="/answers"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <FontAwesomeIcon icon={faComments} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Answers <span className="text-orange-500 dark:text-orange-400 text-xs ml-1">BETA</span>
                        </span>
                    )}
                </Link>

                <Link
                    to="/explore"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <FontAwesomeIcon icon={faCompass} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Explore</span>}
                </Link>
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 mb-4"></div>

            {!collapsed && (
                <span className="uppercase text-[11px] tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2 px-3">
                    Topics
                </span>
            )}

            <div className="max-h-[400px] custom-scroll">
                <div id="accordion-open">
                    {topics.map((topic) => (
                        <TopicSideBarRow key={topic.id} topic={topic} />
                    ))}
                </div>

                <div className="mt-3 px-3">
                    <button className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition">
                        See more
                    </button>
                </div>
            </div>

        </aside>
    );
};

export default TopicsSidebar;
