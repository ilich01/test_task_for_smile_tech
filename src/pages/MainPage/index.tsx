import { useEffect, useState } from 'react'
import UserList from '../../components/UserList/UserList'
import { User } from '../../types'
import axios from 'axios'
import s from './MainPage.module.scss'
import Filter from '../../components/Filter/Filter'
import Button from '../../components/Button/Button'

const MainPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [isSortedAscending, setIsSortedAscending] = useState(true)
    const [loading, setLoading] = useState(false)

    const sortUsers = (usersToSort: User[], order: 'asc' | 'desc') => {
        const sorted = [...usersToSort].sort((a, b) => {
            if (a.company.name < b.company.name) return order === 'asc' ? -1 : 1;
            if (a.company.name > b.company.name) return order === 'asc' ? 1 : -1;
            return 0;
        })
        setFilteredUsers(sorted)
    }

    const fetchUsers = async (count: number) => {
        setLoading(true)
        try {
            const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
            const shuffled = response.data.sort(() => 0.5 - Math.random())
            const randomUsers = shuffled.slice(0, count) 
            setUsers(randomUsers) 
            setFilteredUsers(randomUsers) 
            sortUsers(randomUsers, sortOrder)
        } catch (error) {
            console.log('Произошла ошибка', error)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        fetchUsers(5)
    }, [])

    const handleFilter = (term: string) => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase())
        )
        setFilteredUsers(filtered)
        sortUsers(filtered, sortOrder)
    }

    const handleUsersRefresh = () => {
        fetchUsers(5)
    }

    const handleSortByCompany = () => {
        const newOrder = isSortedAscending ? 'desc' : 'asc'
        setIsSortedAscending(!isSortedAscending)
        setSortOrder(newOrder)
        sortUsers(filteredUsers, newOrder)
    }

    return (
        <div className={s.conttainer}>
            <div className={s.header}>
            <h1>Список пользователей</h1>
            <div className={s.controls}>
                <Filter onFilter={handleFilter} />
            </div>
            <Button onClick={handleUsersRefresh}>Обновить пользователей</Button>
            </div>
            {loading ? (
                <p>Загрузка пользователей...</p>
            ) : (
                <UserList 
                    users={filteredUsers} 
                    onSort={handleSortByCompany} 
                    isSortedAscending={isSortedAscending} 
                />
            )}
        </div>
    )
}

export default MainPage
