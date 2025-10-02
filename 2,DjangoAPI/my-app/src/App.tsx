import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import type {IUserItem} from "./types/users/IUserItem";

function App() {

    const [users, setUsers] = useState<Array<IUserItem>>([]);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        try {
            const result =
                await axios<IUserItem[]>('http://127.0.0.1:4099/api/users/');
            setUsers(result.data);
            // console.log("--Load data--", result);
        } catch (error) {
            console.error("--Problem--", error);
        }
    }
    // console.log("---GET USERS--", users);

    const contentUsers = users.map((user: IUserItem) => {
        return (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.id}
                </th>
                <td className="px-6 py-4">
                    {user.last_name} {user.first_name}
                </td>
                <td className="px-6 py-4">
                    {user.email}
                </td>
                <td className="px-6 py-4">

                </td>
            </tr>
        );
    });

    return (
        <>
            <h1 className={"text-3xl font-bold text-center"}>Користувачі</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Full name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {contentUsers}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
