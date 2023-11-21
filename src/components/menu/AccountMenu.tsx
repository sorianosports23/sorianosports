import { useContext } from "react"
import { BsJournalCheck, BsShieldLock, BsPerson, BsBoxArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { userSessionContext } from "../../context/session/UserSessionContext"
import styles from "../../css/session/account/AccountMenu.module.css"
import { RiInboxArchiveFill } from "react-icons/ri"

type TAccountMenuProps = {
  menuSelected: string
  selectMenu: (menu: string) => void
}

const AccountMenu = ({ menuSelected, selectMenu }: TAccountMenuProps) => {

  const { logout } = useContext(userSessionContext)

  const handleLogout = () => {
    logout()
    window.location.href = `${window.location.origin}/deportes`
  }

  return (
    <div className={styles.menu}>
      <nav>
        <ul>
          <li
            data-selected={menuSelected === "general"}
          >
            <button
              onClick={() => selectMenu("general")}
            >
              <BsPerson/>
              Personal
            </button>
          </li>
          <li
            data-selected={menuSelected === "inscripciones"}
          >
            <button
              onClick={() => selectMenu("inscripciones")}
            >
              <BsJournalCheck/>
              Inscripciones
            </button>
          </li>
          <li
            data-selected={menuSelected === "seguridad"}
          >
            <button
              onClick={() => selectMenu("seguridad")}
            >
              <BsShieldLock/>
              Seguridad
            </button>
          </li>
          <li
            data-selected={menuSelected === "inbox"}
          >
            <button
              onClick={() => selectMenu("inbox")}
            >
              <RiInboxArchiveFill/>
              Mensajes
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.logout}>
        <button onClick={handleLogout}>
          <BsBoxArrowLeft/>  
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default AccountMenu
