import { useState } from "react"
import UsersSearch, { TUser } from "../../components/admin/users/UsersSearch"
import Admin from "./Admin"
import UserCard from "../../components/admin/users/UserCard"
import styles from "../../css/admin/users/Users.module.css"

const Users = () => {

  const [users, setUsers] = useState<Array<TUser>>([])

  return (
    <Admin route_title="Usuarios">
      <UsersSearch setUsers={setUsers} type="users"/>
      <UsersSearch setUsers={setUsers} type="ci"/>

      <div className={styles.res}>
        <UserCard
          username="efr"
          ci={55599655}
          permissions={{
            admin: true,
            news: true,
            users: true
          }}
        />
      </div>
    </Admin>
  )
}

export default Users
