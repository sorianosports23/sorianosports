// import { TUser } from "./UsersSearch"
import { useState } from "react"
import styles from "../../../css/admin/users/UserCard.module.css"
import { BsPenFill, BsThreeDots, BsTrashFill } from "react-icons/bs"
import entryStyles from "../../../css/admin/page/Entry.module.css"

interface IUserCardProps extends TUser {
  handleEditUser: () => void
  handleDeleteUser: () => void
}

const UserCard = ({ username, ci, permissions, handleDeleteUser, handleEditUser }: IUserCardProps) => {

  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div>
          <p>{username}</p>
          <span>{ci}</span>
        </div>

        <div className={entryStyles.dropdown}>
          <button onClick={() => setShowDropdown(!showDropdown)}><BsThreeDots/></button>

          <ul style={{display: showDropdown ? "flex" : "none"}}
            onPointerLeave={() => setShowDropdown(false)}
          >
            <li>
              <button
                onClick={handleEditUser}
              >
                <BsPenFill/> Editar
              </button>
            </li>
            <li>
              <button
                onClick={handleDeleteUser}
              >
                <BsTrashFill/> Borrar
              </button>
            </li>
          </ul>
        </div>       
      </div>

      <div className={styles.footer}>
        <span>{permissions.includes("admin") && "Administrador"}</span>
        <span>{permissions.includes("editor") && "Editor"}</span>
      </div>
    </div>
  )
}

export default UserCard