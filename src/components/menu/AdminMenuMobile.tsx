import { useContext } from "react"
import { userSessionContext } from "../../context/session/UserSessionContext"
import styles from "../../css/header/HeaderMenuMobile.module.css"
import { BsPersonCircle, BsXLg } from "react-icons/bs"
import { Link } from "react-router-dom"
import { adminRoutes, editorRoutes } from "../../utils/adminRoutes"

type TAdminMenuMobileProps = {
  open: boolean
  close: () => void
}

const AdminMenuMobile = ({ open, close }: TAdminMenuMobileProps) => {

  const { username, logout, permissions } = useContext(userSessionContext)

  const handleLogout = () => {
    logout()
    window.location.href = `${window.location.protocol}//${window.location.host}/deportes`
  }

  return (
    <div
      style={{
        transform: `translateX(${open ? "0" : "200"}%)`
      }}
      className={styles.menu}
    >
      <div className={styles.header}>
        <h2>Administración</h2>
        <button
          onClick={close}
        >
          <BsXLg/>
        </button>
      </div>

      <div className={styles.account}>
        {
          username
          ? (
            <div className={styles.user}>
              <div className={styles.username}>
                <BsPersonCircle/>
                <Link to="/auth/perfil">
                  {username}
                </Link>
              </div>

              <div className={styles.logout}>
                <button onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          )
          : (
            <>
            <Link to="/auth/registro">Registrarse</Link>
            <Link to="/auth/login">Iniciar sesión</Link>
            </>
          )
        }
      </div>

      <div className={styles.nav}>
        <nav>
          <ul>
            {/* <li>
              <Link to="/admin/">Inicio</Link>
            </li>
            <li>
              <Link to="/admin/users">Usuarios</Link>
            </li>
            <li>
              <Link to="/admin/sports">Ciudades</Link>
            </li>
            <li>
              <Link to="/admin/events">Eventos</Link>
            </li>
            <li>
              <Link to="/admin/news">Noticias</Link>
            </li>
            <li>
              <Link to="/admin/inscriptions">Inscripciones</Link>
            </li>
            <li>
              <Link to="/admin/contact">Contacto</Link>
            </li>
            <li>
              <Link to="/admin/page">Página</Link>
            </li> */}
          <li>
            <Link to="/admin/">Inicio</Link>
          </li>
          {
            permissions.includes("admin")
            &&
            adminRoutes.map((route, i) => (
              <li key={i}>
                <Link to={`/admin/${route.url}`}>{route.name}</Link>
              </li>
            ))
          }
          {
            (permissions.includes("editor") && !permissions.includes("admin"))
            &&
            // eslint-disable-next-line sonarjs/no-identical-functions
            editorRoutes.map((route, i) => (
              <li key={i}>
                <Link to={`/admin/${route.url}`}>{route.name}</Link>
              </li>
            )) 
          }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default AdminMenuMobile
