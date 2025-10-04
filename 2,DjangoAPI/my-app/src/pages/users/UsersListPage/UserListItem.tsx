import type {IUserItem} from "../../../types/users/IUserItem";

interface Props {
    user: IUserItem;
}

const UserListItem: ReactFC<Props> = ({user}) => {
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
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
        </>
    )
}

export default UserListItem;