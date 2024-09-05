import React from 'react'
import { User } from '../../types'
import s from './UserList.module.scss'
import sortIcon from "../../styles/images/svg/sortIcon.svg"
interface UserListProps {
    users: User[]
    onSort: () => void
    isSortedAscending: boolean
}
const UserList: React.FC<UserListProps> = ({users, onSort, isSortedAscending }) => {
    if (users.length === 0) {
        return <p className={s.noUsers}>Нет пользователей для отображения.</p>;
      }
  return (
    <div className={s.tableContainer}>
    <table className={s.userTable}>
        <thead>
            <tr>
                <th>ФИО</th>
                <th>Email</th>
                <th>Адресс</th>
                <th onClick={onSort} className={s.sortable}>
                            Компания <img src={sortIcon} alt="" />
                        </th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td className={s.email}>{user.email}</td>
                    <td>
                        <span className={s.address}>Улица </span> 
                        <span className={s.addressStreet}>{user.address.street} </span>
                        <span className={s.address}> индекс </span>
                        <span className={s.addressZipcode}>{user.address.zipcode}</span>
                    </td>
                    <td>{user.company.name}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default UserList
