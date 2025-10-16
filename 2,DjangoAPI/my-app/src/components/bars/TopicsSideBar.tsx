import { Collapse, Spin } from "antd";
import { Link } from "react-router";
import {useGetRootTopicsQuery} from "../../services/topicService.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faComments,
    faCompass,
    faChevronDown,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const { Panel } = Collapse;

const TopicsSidebar: React.FC = () => {
    // const { data: topics, isLoading, isError } = useGetTopicsQuery();
    const { data: topics, isLoading, isError } = useGetRootTopicsQuery();
    const [collapsed, setCollapsed] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-6 bg-gray-950 text-gray-200 h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isError || !topics) {
        return (
            <div className="text-gray-400 p-4 bg-gray-950 h-screen">
                Не вдалося завантажити топіки
            </div>
        );
    }

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <aside
            className={`h-screen fixed left-0 top-14 bg-gray-950 text-gray-200 flex flex-col border-r border-gray-800 overflow-y-auto px-3 py-4 transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"
            }`}
        >
            <div className="flex justify-end">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-400 hover:text-gray-200 transition"
                >
                    <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
                </button>
            </div>

            <nav className="space-y-1 mb-6">
                <Link
                    to="/"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faHouse} className="w-4 h-4 text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Home</span>}
                </Link>

                <Link
                    to="/popular"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Popular</span>}
                </Link>

                <Link
                    to="/answers"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faComments} className="w-4 h-4 text-gray-300" />
                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Answers <span className="text-orange-500 text-xs ml-1">BETA</span>
                        </span>
                    )}
                </Link>

                <Link
                    to="/explore"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faCompass} className="w-4 h-4 text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Explore</span>}
                </Link>
            </nav>

            <div className="border-t border-gray-800 mb-4"></div>

            {!collapsed && (
                <span className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold mb-2 px-3">
                    Topics
                </span>
            )}

            <div
                className={`overflow-y-auto pr-1 ${
                    collapsed ? "hidden" : ""
                } scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900`}
                style={{
                    scrollbarWidth: "thin", // для Firefox
                    scrollbarColor: "#4b5563 #1f1f1f", // thumb та track для Firefox
                }}
            >
                <Collapse
                    ghost
                    accordion={false}
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => (
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`text-xs transition-transform duration-200 ${
                                isActive ? "rotate-180 text-gray-300" : "text-gray-500"
                            }`}
                        />
                    )}
                >
                    {topics.map((topic) => (
                        <Panel
                            key={topic.id}
                            header={
                                <span className="text-gray-200 text-[13px] font-medium">
                                    {topic.name}
                                </span>
                            }
                            className="!bg-transparent !border-0 !text-gray-300 hover:!bg-[#1a1a1b] rounded-md"
                        >
                            {topic.children && topic.children.length > 0 ? (
                                <ul className="pl-2 space-y-1">
                                    {topic.children.map((child) => (
                                        <li key={child.id}>
                                            <Link
                                                to={`/topics/${child.url_slug}`}
                                                className="!text-gray-400 hover:text-gray-200 text-[13px] transition"
                                            >
                                                {child.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500 text-xs">Немає підтем</span>
                            )}
                        </Panel>
                    ))}
                </Collapse>

                <div className="mt-3 px-3">
                    <button className="text-gray-400 text-sm hover:text-gray-200 transition">
                        See more
                    </button>
                </div>
            </div>

        </aside>
    );
};

export default TopicsSidebar;
