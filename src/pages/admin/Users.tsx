import { useEffect, useState, useContext, useCallback } from "react"
import UsersSearch from "../../components/admin/users/UsersSearch"
import Admin from "./Admin"
import UserCard from "../../components/admin/users/UserCard"
import styles from "../../css/admin/users/Users.module.css"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminGetUsers from "../../api/admin/getUsers"

type TPaginationProps = {
  maxPages: number
  selectPage: (page: number) => void
}

const Pagination = ({ maxPages, selectPage }: TPaginationProps) => {
  return (
    <div className={styles.pagination}>
      {
        new Array(maxPages).fill("").map((_, i) => (
          <button 
            className={styles.pagination_btn}
            onClick={() => selectPage(i+1)}
          >
            {i+1}
          </button>
        ))
      }
    </div>
  )
}

const Users = () => {

  const { token } = useContext(userSessionContext)

  const [users, setUsers] = useState<Array<TUser>>([])
  const [maxPages, setMaxPages] = useState(0)
  const [actualPage, setActualPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    console.log(users)
  }, [users])

  const handleGetUsers = useCallback(async (page: number) => {
    const usersFromApi = await apiAdminGetUsers({token, pag: page})
    setUsers(usersFromApi.data)
    setMaxPages(usersFromApi.pagination.totalPages)
    setTotalUsers(usersFromApi.pagination.maxUsers)
    console.log("API Ready")
    console.log(usersFromApi)
  }, [token])

  useEffect(() => {
    if (token) handleGetUsers(1)
  }, [token, handleGetUsers])

  return (
    <Admin route_title="Usuarios">
      <UsersSearch setUsers={setUsers} type="users"/>
      <UsersSearch setUsers={setUsers} type="ci"/>

      <div className={styles.res}>
        {/* <UserCard
          username="efr"
          ci={55599655}
          permissions={{
            admin: true,
            news: true,
            users: true
          }}
        /> */}
        {/* {
          users.map((user, i) => (
            <UserCard
              key={i}
              {...user}
            />
          ))
        } */}
        <div>Mostrando {totalUsers} usuarios</div>
        <div>
          {
            users.map((user, i) => (
              <UserCard
                key={i}
                {...user}
              />
            ))
          }
        </div>
        <Pagination maxPages={maxPages} selectPage={handleGetUsers}/>
      </div>
    </Admin>
  )
}

export default Users
