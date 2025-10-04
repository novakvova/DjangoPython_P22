import type {IUserItem} from "../../types/users/IUserItem";
import {useGetUsersQuery} from "../../services/userService";

const UsersListPage = () => {
    const {data: users} = useGetUsersQuery();

    const contentUsers = users?.map((user: IUserItem) => {
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
export default UsersListPage;