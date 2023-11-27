import { BsSearch } from "react-icons/bs"
import styles from "../../../css/admin/users/UsersSearch.module.css"
import { useState, FormEvent } from "react"

type TUsersSearchProps = {
  searchUser: (user: string | number, type: "users" | "ci") => void
  type: "users" | "ci"
}

const UsersSearch = ({ searchUser, type }: TUsersSearchProps) => {
  
  const [user, setUser] = useState(type === "users" ? "" : 0)

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    console.log(user)

    searchUser(user, type)
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <div className={styles.icon}>
          <BsSearch/>
        </div>

        <div className={styles.input}>
          <input 
            type="text" 
            placeholder={`Buscar ${type === "users" ? "usuario" : "cedula"}`}
            value={user}
            onChange={(ev) => setUser(ev.target.value)}  
          />
        </div>

        <div className={styles.btn}>
          <button type="submit">Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default UsersSearch