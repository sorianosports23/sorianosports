import { useContext, useState, KeyboardEvent } from "react"
import { BsChevronDown, BsList } from "react-icons/bs"
import { RxSlash } from "react-icons/rx"
import { Link, useNavigate } from "react-router-dom"
import { userSessionContext } from "../../context/session/UserSessionContext"
import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/admin/header/Header.module.css"
import AdminMenuMobile from "./AdminMenuMobile"
import { adminRoutes, editorRoutes } from "../../utils/adminRoutes"

const AdminMenu = () => {

  const { username, logout, permissions } = useContext(userSessionContext)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const [menuMobile, setMenuMobile] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const handleCloseProfileMenu = (ev: KeyboardEvent) => {
    if (profileMenuOpen && ev.key === "Escape") {
      setProfileMenuOpen(false)
    }
  }

  return (
    <>
    <header className={styles.header}>
      <div className={styles.div}>
        <div className={styles.title}>
          <div className={styles.title_icon}>
            <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="logo" />
          </div>
          <span><RxSlash/></span>
          <h1>Administración</h1>
        </div>

        <div 
          className={styles.user} 
          data-open={profileMenuOpen}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          onPointerLeave={() => setProfileMenuOpen(false)}
          role="button"
          onKeyDown={handleCloseProfileMenu}
          tabIndex={0}
        >
          <button>{username} <BsChevronDown/></button>

          <ul className={styles.user_dropdown}>
            <li><button onClick={() => navigate("/")}>Volver al Inicio</button></li>
            <li><button onClick={() => handleLogout()}>Cerrar sesión</button></li>
          </ul>
        </div>

        <button
          className={styles.btn_mobile}
          onClick={() => setMenuMobile(prev => !prev)}
        >
          <BsList/>
        </button>
          
      </div>

      <div className={styles.nav}>
        <nav>
          <Link to="/admin/">Inicio</Link>
          {
            permissions.includes("admin")
            &&
            adminRoutes.map((route, i) => (
              <Link to={`/admin/${route.url}`} key={i}>{route.name}</Link>
            ))
          }
          {
            (permissions.includes("editor") && !permissions.includes("admin"))
            &&
            editorRoutes.map((route, i) => (
              <Link to={`/admin/${route.url}`} key={i}>{route.name}</Link>
            )) 
          }
        </nav>
      </div>
    </header>

    <AdminMenuMobile
      open={menuMobile}
      close={() => setMenuMobile(false)}
    />
    </>
  )
}

export default AdminMenu
