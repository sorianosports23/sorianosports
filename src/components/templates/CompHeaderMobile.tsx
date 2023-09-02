import { useState, useContext } from "react"
import { BsXLg, BsFillHouseFill, BsChevronRight, BsCalendarDateFill, BsChatSquareDotsFill, BsPersonCircle } from "react-icons/bs"
import styles from "../../css/header/CompHeaderMobile.module.css"
import { Link } from "react-router-dom"
import { userSessionContext } from "../../context/session/UserSessionContext"

type THeaderMobileProps = {
  open: boolean,
  closeMenu: () => void
}

const CompHeaderMobile = ({ open, closeMenu }: THeaderMobileProps) => {
  
  const { username, logout } = useContext(userSessionContext)

  const [activitiesOpen, setActivitiesOpen] = useState(false)
  const [institutionOpen, setInstitutionOpen] = useState(false)
  
  const handleLogout = () => {
    logout()
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href
  }

  return (
    <div className={styles.menu}
      style={{
        transform: `
          translateX(${open ? "0" : "200"}%)
        `,
        // display: open ? "block" : "none"
      }}
    >
      <div className={styles.header}>
        <h2>Menu</h2>
        <button
          onClick={() => closeMenu()}
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
            <li>
              <Link to="/">
                <BsFillHouseFill/>
                Inicio
              </Link>
            </li>
            <li className={styles.link_dropdown}
              style={{
                height: activitiesOpen ? "8rem" : "2rem"
              }}
            >
              <button
                style={{
                  height: activitiesOpen ? "8rem" : "2rem"
                }}
                onClick={() => setActivitiesOpen(!activitiesOpen)}
              >
                <p>
                  <BsChevronRight
                    style={{
                      transform: `rotate(${activitiesOpen ? 90 : 0}deg)`
                    }}
                  />
                  Actividades
                </p>

                <ul>
                  <li>
                    <Link to="/actividades/ciudades">
                      Ciudades
                    </Link>
                  </li>
                  <li>
                    <Link to="/actividades/deportes">
                      Deportes
                    </Link>
                  </li>
                  <li>
                    <Link to="/actividades/escuelas">
                      Escuelas
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
            <li>
              <Link to="/eventos">
                <BsCalendarDateFill/>
                Eventos
              </Link>
            </li>
            <li className={styles.link_dropdown}
              style={{
                height: institutionOpen ? "10rem" : "2rem"
              }}
            >
              <button
                style={{
                  height: institutionOpen ? "10rem" : "2rem"
                }}
                onClick={() => setInstitutionOpen(!institutionOpen)}
              >
                <p>
                  <BsChevronRight
                    style={{
                      transform: `rotate(${institutionOpen ? "90" : "0"}deg)`
                    }}
                  />
                  Institución
                </p>

                <ul>
                  <li>
                    <Link to="/">Nosotros</Link>
                  </li>
                  <li>
                    <Link to="/">Contacto</Link>
                  </li>
                  <li>
                    <Link to="/">Misión</Link>
                  </li>
                  <li>
                    <Link to="/">Visión</Link>
                  </li>
                </ul>
              </button>
            </li>
            <li>
              <Link to="/">
                <BsChatSquareDotsFill/>
                Ayuda
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default CompHeaderMobile
