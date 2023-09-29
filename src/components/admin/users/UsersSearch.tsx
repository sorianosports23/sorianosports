import { FormEvent, useState } from "react"
import { BsSearch } from "react-icons/bs"
import styles from "../../../css/admin/users/UsersSearch.module.css"

// type TUser = {
//   username: string
//   ci: number
//   permissions: {
//     admin: boolean
//     news: boolean
//     users: boolean
//   }
// }

type TUsersSearchProps = {
  setUsers: (users: Array<TUser>) => void
  type: "users" | "ci"
}

const UsersSearch = ({ setUsers, type }: TUsersSearchProps) => {
  
  const [user, setUser] = useState("")

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    console.log(user)
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

// export type { TUser }
export default UsersSearch