import { useEffect, useState, useContext } from "react"
import UsersSearch from "../../components/admin/users/UsersSearch"
import Admin from "./Admin"
import UserCard from "../../components/admin/users/UserCard"
import styles from "../../css/admin/users/Users.module.css"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminGetUsers from "../../api/admin/getUsers"

const Users = () => {

  const { token } = useContext(userSessionContext)

  const [users, setUsers] = useState<Array<TUser>>([])

  useEffect(() => {
    (async () => {
      const usersApi = await apiAdminGetUsers({token, pag: 1})
      setUsers(usersApi.data)
      console.log("API Ready")
      console.log(usersApi)
    })()
  }, [token])

  useEffect(() => {
    console.log(users)
  }, [users])

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
        {
          users.map((user, i) => (
            <UserCard
              key={i}
              {...user}
            />
          ))
        }
      </div>
    </Admin>
  )
}

export default Users
