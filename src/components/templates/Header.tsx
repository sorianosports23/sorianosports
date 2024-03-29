import { Link } from "react-router-dom"
import { BsSearch, BsFillChatSquareDotsFill, BsChevronDown, BsFillHouseFill, BsCalendarDateFill, BsList, BsPersonFillUp, BsNewspaper } from "react-icons/bs"
import styles from "../../css/header/Header.module.css"
import { ChangeEvent, MutableRefObject, useRef, useState, useContext } from "react"
import SearchBar from "../header/SearchBar"
import assetsFolder from "../../utils/publicfolder"
import HeaderMobile from "./HeaderMenuMobile"
import { userSessionContext } from "../../context/session/UserSessionContext"

const stylesName = {
  link_header2: `${styles.link} ${styles["link-header2"]}`
}

const useSearch = () => {
  
  const [value, setValue] = useState("")

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return {
    value,
    onChange,
    placeholder: "¿Qué estas buscando?"
  }
}

const Header = () => {
  const search = useSearch()

  const [menuMobileOpen, setMenuMobileOpen] = useState(false)

  const { username, logout, permissions } = useContext(userSessionContext)

  const [activitiesDropdown, setActivitiesDropDown] = useState(false)
  const [aboutDropdown, setAboutDropDown] = useState(false)
  const [searchBarHover, setSearchBarHover] = useState(false)
  const [searchBarTabletHover, setSearchBarTabletHover] = useState(false)
  
  const activitiesDropdownUL = useRef<HTMLUListElement>(null) as MutableRefObject<HTMLUListElement>

  const handleLogout = () => {
    logout()
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href
  }
  
  return (
    <header className={styles.header}>
      <div className={styles["header-top"]}>
        <Link to="/" className={styles.logo}>
          <img src={assetsFolder + "/img/logo_deportes.svg"} alt="page-logo" />
        </Link>

        <div 
          className={styles["search-bar"]} 
          onPointerEnter={() => setSearchBarHover(true)} 
          onPointerLeave={() => setSearchBarHover(false)}
        >
          <div>
            <input {...search} />
            <button className={styles["search-bar__icon"]}>
              <BsSearch/>
            </button>

            <SearchBar search={search.value} searchHover={searchBarHover}/>

          </div>
        </div>

        <div className={styles["user-info"]}>
          {/* eslint-disable-next-line sonarjs/no-duplicate-string */ }
          <Link to="/faq" className={`${styles.link} ${styles["link-header"]}`}>
            <BsFillChatSquareDotsFill/>
            Ayuda
          </Link>


          {
            username 
              ? (
                <div className={styles.user}>
                  <button><p>{username}</p> <BsChevronDown/></button>

                  <ul>
                    <li><Link to="/auth/perfil" tabIndex={aboutDropdown ? 0 : -1}>Perfil</Link></li>
                    {
                      (permissions.includes("admin") || permissions.includes("editor"))
                      &&
                      <li><Link to="/admin">Administración</Link></li>
                    }
                    <li>
                      <button
                        onClick={handleLogout} tabIndex={aboutDropdown ? 0 : -1}
                      >Cerrar sesión</button>
                    </li>
                  </ul>
                </div>
              )
              : (
                <>


                <Link to="/auth/login" className={`${styles.link} ${styles["link-header"]}`}>
                  <BsPersonFillUp/>
                  Iniciar sesión
                </Link>
                </>
              )
          }

          <button className={styles.menu_mobile}
            onClick={() => setMenuMobileOpen(true)}
          >
            <BsList/>
          </button>
        </div>
      </div>

      <div className={styles.header_searchbar_tablet}>
        <div
          onPointerEnter={() => setSearchBarTabletHover(true)} 
          onPointerLeave={() => setSearchBarTabletHover(false)}
        >
          <input {...search} />
          <button className={styles["search-bar__icon"]}>
            <BsSearch/>
          </button>

          <SearchBar search={search.value} searchHover={searchBarTabletHover}/>

        </div>
      </div>

      <div className={styles["header-bottom"]}>
        <nav className={styles["header-nav"]}>
          <Link to="/" className={stylesName.link_header2}>
            <BsFillHouseFill/>
            Inicio
          </Link>
          <button
            onClick={() => setActivitiesDropDown(prev => !prev)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown /> 
              Actividades
            </p>

            <ul className={styles["activities-list"]}
              ref={activitiesDropdownUL}
            >
              <li>
                <Link to="/actividades/ciudades" tabIndex={activitiesDropdown ? 0 : -1}>
                  Ciudades
                </Link>
              </li>
              <li>
                <Link to="/actividades/deportes" tabIndex={activitiesDropdown ? 0 : -1}>
                  Deportes
                </Link>
              </li>
            </ul>
          </button>
          <Link to="/eventos" className={stylesName.link_header2}>
            <BsCalendarDateFill/>
            Eventos
          </Link>
          <Link to="/noticias" className={stylesName.link_header2}>
            <BsNewspaper/>
            Noticias
          </Link>
          <button
            onClick={() => setAboutDropDown(prev => !prev)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown/> 
              Institución
            </p>

            <ul className={styles["activities-list"]}>
              <li>
                <Link to="/acerca/misionvision" tabIndex={aboutDropdown ? 0 : -1}>
                  Misión y Visión
                </Link>
              </li>

              <li>
                <Link to="/acerca/directiva" tabIndex={aboutDropdown ? 0 : -1}>Equipo</Link>
              </li>
              
              <li>
                <Link to="/acerca/contacto" tabIndex={aboutDropdown ? 0 : -1}>Contacto</Link>
              </li>
            </ul>
          </button>
        </nav>
      </div>

      <HeaderMobile 
        open={menuMobileOpen}
        closeMenu={() => setMenuMobileOpen(false)}
      />
    </header>
  )
}

export default Header
