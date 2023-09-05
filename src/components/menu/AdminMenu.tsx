import { useContext } from "react"
import { BsBoxArrowRight, BsChevronDown } from "react-icons/bs"
import { RxSlash } from "react-icons/rx"
import { Link } from "react-router-dom"
import { userSessionContext } from "../../context/session/UserSessionContext"
import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/admin/header/Header.module.css"

const AdminMenu = () => {

  const { username } = useContext(userSessionContext)

  return (
    <header className={styles.header}>
      <div className={styles.div}>
        <div className={styles.title}>
          <div className={styles.title_icon}>
            <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="logo" />
          </div>
          <span><RxSlash/></span>
          <h1>Admin</h1>
        </div>

        <div className={styles.user}>
          <button>{username} <BsChevronDown/></button>
        </div>
      </div>

      <div className={styles.nav}>
        <nav>
          <Link to="admin">Inicio</Link>
          <Link to="admin">Usuarios</Link>
          <Link to="admin">Deportes</Link>
          <Link to="admin">Eventos</Link>
          <Link to="admin">Base de datos</Link>
          <Link to="admin">Noticias</Link>
        </nav>
      </div>
    </header>
  )
}

export default AdminMenu
