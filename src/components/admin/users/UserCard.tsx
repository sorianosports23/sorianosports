// import { TUser } from "./UsersSearch"
import styles from "../../../css/admin/users/UserCard.module.css"
import { BsList } from "react-icons/bs"

const UserCard = ({ username, ci, permissions }: TUser) => {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div>
          <p>{username}</p>
          <span>{ci}</span>
        </div>

        <div>
          <button><BsList/></button>
        </div>
      </div>

      <div className={styles.footer}>
        {/* <span>{permissions["admin"] && "Administrador"}</span> */}
        <span>{permissions.includes("news") && "Editor de noticias"}</span>
        <span>{permissions.includes("users") && "Editor de usuarios"}</span>
      </div>
    </div>
  )
}

export default UserCard